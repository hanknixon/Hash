from fastapi import FastAPI, HTTPException, UploadFile, File
from pydantic import BaseModel
import psycopg2
from psycopg2.extras import RealDictCursor
from fastapi.middleware.cors import CORSMiddleware
from configparser import ConfigParser
from typing import List, Optional
import uuid
from gen_ai.deepseek import GenAI
from model.syllabus_parser import ProcessSyllabus
from prompts.prompt import Prompt
import os
import json

# Load database config
config = ConfigParser()
config.read("config.ini")

db_config = {
    "host": config.get("database", "HOST"),
    "port": config.get("database", "PORT"),
    "user": config.get("database", "USER"),
    "password": config.get("database", "PASSWORD"),
    "dbname": config.get("database", "DATABASE"),
}

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Connect to PostgreSQL
def get_db_connection():
    try:
        conn = psycopg2.connect(**db_config, cursor_factory=RealDictCursor)
        return conn
    except Exception as e:
        print("Database connection error:", e)
        raise HTTPException(status_code=500, detail="Database connection error")


# Existing login models and endpoints...
class LoginRequest(BaseModel):
    email: str
    password: str


class Topic(BaseModel):
    topic_name: str


class Module(BaseModel):
    module_no: int
    module_name: str
    topics: List[Topic]


class SyllabusUpload(BaseModel):
    subject_name: str
    modules: List[Module]


@app.post("/login")
async def login(user: LoginRequest):
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    try:

        teacher_query = "SELECT teacher_id, teacher_name, email_id FROM teacher_details WHERE email_id = %s AND password = %s"
        cursor.execute(teacher_query, (user.email, user.password))
        teacher = cursor.fetchone()

        print("🔍 DEBUG: Teacher Query Result:", teacher)

        if teacher:
            return {
                "message": "Login successful",
                "role": "teacher",
                "teacher_id": teacher.get("teacher_id"),
                "email": teacher.get("email_id"),
                "name": teacher.get("teacher_name"),
            }

        raise HTTPException(status_code=401, detail="Invalid email or password")

    except Exception as e:
        print("Database query error:", e)
        raise HTTPException(status_code=500, detail="Internal server error")

    finally:
        cursor.close()
        conn.close()


# New endpoints for quiz assignment
@app.get("/api/subjects/{teacher_id}")
async def get_teacher_subjects(teacher_id: str):  # Ensure it's treated as a string
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        query = """
        SELECT s.subject_id, s.subject_name 
        FROM student_subjectslist s 
        JOIN teacher_subjects ts ON s.subject_id = ts.subject_id 
        WHERE ts.teacher_id = %s
        """
        cursor.execute(query, (teacher_id,))  # Ensure it's passed as a string
        subjects = cursor.fetchall()

        return {"subjects": subjects}

    except Exception as e:
        print("Database query error:", e)
        raise HTTPException(status_code=500, detail="Internal server error")

    finally:
        cursor.close()
        conn.close()


@app.get("/api/modules/{subject_id}")
async def get_modules_by_subject(subject_id: str):
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)  # Ensure dictionary output

    try:
        print("Received subject_id:", subject_id)

        query = """
        SELECT module_id, module_name
        FROM modules
        WHERE subject_id = %s
        """
        cursor.execute(query, (subject_id,))
        modules = cursor.fetchall()

        print("Modules fetched:", modules)

        if not modules:
            raise HTTPException(status_code=404, detail="No modules found for this subject")

        # Ensure "Module X:" is not duplicated
        return {
            "modules": [
                {
                    "module_id": m["module_id"],
                    "module_name": m["module_name"]
                    if m["module_name"].startswith("Module")  # If already formatted, keep it
                    else f"Module {index + 1}: {m['module_name']}"
                }
                for index, m in enumerate(modules)
            ]
        }

    except Exception as e:
        print("Database query error:", e)
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

    finally:
        cursor.close()
        conn.close()


@app.get("/api/topics/{module_id}")
async def get_module_topics(module_id: str):
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    try:
        print(f"Fetching topics for module_id: {module_id}")
        query = "SELECT topic_id, topic_name FROM topics WHERE module_id = %s"
        cursor.execute(query, (module_id,))

        topics = cursor.fetchall()
        print(f"Raw fetched topics: {topics}")

        if not topics:
            print(f"No topics found for module_id: {module_id}")
            return {"topics": []}

        # Convert RealDictRow to list of dictionaries
        topics_list = [dict(row) for row in topics]

        return {"topics": topics_list}

    except Exception as e:
        print(f"Database query error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()
        conn.close()


@app.get("/student/{email}")
async def get_student(email: str):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        query = "SELECT full_name FROM student_details WHERE LOWER(email_id) = LOWER(%s)"
        cursor.execute(query, (email,))
        student = cursor.fetchone()

        if student:
            return {"name": student["full_name"]}
        else:
            raise HTTPException(status_code=404, detail="Student not found")

    except Exception as e:
        print("Database query error:", e)
        raise HTTPException(status_code=500, detail="Internal server error")

    finally:
        cursor.close()
        conn.close()


@app.post("/upload-syllabus/")
async def upload_syllabus(file: UploadFile = File(...)):
    """
    Upload a syllabus PDF, extract text, and return structured JSON data.
    """
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    try:
        # Save the uploaded PDF
        with open(file_path, "wb") as buffer:
            buffer.write(await file.read())

        # Extract text from the PDF
        process_syllabus = ProcessSyllabus()
        syllabus_text = process_syllabus.syllabus_parser(file_path)

        if not syllabus_text:
            raise HTTPException(status_code=400, detail="Failed to extract syllabus text.")

        # Format the syllabus text into a structured prompt
        prompt_generator = Prompt()
        syllabus_prompt = prompt_generator.parse_syllabus()
        formatted_prompt = syllabus_prompt.format(syllabus_text=syllabus_text)

        # Use GenAI to generate a structured syllabus
        gen_ai = GenAI()
        response = gen_ai.gen_ai_model(formatted_prompt)

        if not response:
            raise HTTPException(status_code=500, detail="AI model did not return a valid response.")

        # Clean and parse JSON response
        cleaned_response = response.strip()
        syllabus_json = json.loads(cleaned_response)

        return {"message": "Syllabus processed successfully", "syllabus": syllabus_json}

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="AI response is not a valid JSON.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing syllabus: {str(e)}")


@app.post("/api/syllabus/parse")
async def parse_syllabus(file: UploadFile = File(...)):
    try:
        # Save uploaded file temporarily
        contents = await file.read()
        with open("temp_syllabus.pdf", "wb") as f:
            f.write(contents)

        # Parse syllabus text from PDF
        process_syllabus = ProcessSyllabus()
        syllabus_text = process_syllabus.syllabus_parser("temp_syllabus.pdf")

        if not syllabus_text:
            raise HTTPException(status_code=400, detail="Failed to extract syllabus text.")

        # Generate prompt
        prompt_generator = Prompt()
        syllabus_prompt = prompt_generator.parse_syllabus()
        formatted_syllabus = syllabus_prompt.format(syllabus_text=syllabus_text)

        # ✅ Import GenAI only when needed
        from gen_ai.deepseek import GenAI
        gen_ai = GenAI()

        # Send formatted syllabus to AI model
        response = gen_ai.gen_ai_model(formatted_syllabus)

        # ✅ Check if response is a string
        if isinstance(response, str):
            raw_content = response  # Directly assign if it's already a string
        else:
            try:
                raw_content = response.choices[0].message.content
            except AttributeError:
                raise HTTPException(status_code=500, detail="Invalid AI response format")

        # ✅ Remove ```json``` markers if they exist
        cleaned_content = raw_content.strip("```json").strip("```")

        # ✅ Convert JSON string into a dictionary
        try:
            parsed_data = json.loads(cleaned_content)
            return {"parsed_data": parsed_data}  # ✅ Return structured JSON
        except json.JSONDecodeError:
            raise HTTPException(status_code=500, detail="AI response is not valid JSON.")

    except Exception as e:
        print("Error parsing syllabus:", e)
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/syllabus/upload")
async def upload_syllabus(data: dict):
    import json
    print("📥 Received Data:", json.dumps(data, indent=2))  # Debugging log
    conn = get_db_connection()
    cursor = conn.cursor()

    if "subject_name" not in data:
        raise HTTPException(status_code=400, detail="Missing 'subject_name' in request")

    if "modules" not in data:
        raise HTTPException(status_code=400, detail="Missing 'modules' in request")

    if "teacher_id" not in data:
        raise HTTPException(status_code=400, detail="Missing 'teacher_id' in request")

    try:
        subject_name = data["subject_name"]
        teacher_id = data["teacher_id"]

        # 🔹 Check if subject exists
        cursor.execute("SELECT subject_id FROM student_subjectslist WHERE subject_name = %s", (subject_name,))
        subject = cursor.fetchone()

        if subject:
            subject_id = subject[0]  # Use existing subject_id
        else:
            # 🔹 Insert new subject
            subject_id = str(uuid.uuid4())
            cursor.execute("""
                INSERT INTO student_subjectslist (subject_id, subject_name)
                VALUES (%s, %s)
            """, (subject_id, subject_name))

        # 🔹 Check if the teacher is already assigned
        cursor.execute("SELECT * FROM teacher_subjects WHERE teacher_id = %s AND subject_id = %s",
                       (teacher_id, subject_id))
        teacher_subject_exists = cursor.fetchone()

        if not teacher_subject_exists:
            # 🔹 Assign teacher to subject
            cursor.execute("""
                INSERT INTO teacher_subjects (teacher_id, subject_id)
                VALUES (%s, %s)
            """, (teacher_id, subject_id))

        # 🔹 Insert syllabus
        syllabus_id = str(uuid.uuid4())
        cursor.execute("""
            INSERT INTO syllabus (syllabus_id, subject_id, subject_name, subject_status, progress)
            VALUES (%s, %s, %s, %s, %s)
        """, (syllabus_id, subject_id, subject_name, False, 0))

        # 🔹 Insert modules
        for module in data["modules"]:
            module_id = str(uuid.uuid4())
            cursor.execute("""
                INSERT INTO modules (module_id, subject_id, syllabus_id, module_no, module_name)
                VALUES (%s, %s, %s, %s, %s)
            """, (module_id, subject_id, syllabus_id, module["module_no"], module["module_name"]))

            # 🔹 Insert topics
            for topic in module["topics"]:
                topic_id = str(uuid.uuid4())
                cursor.execute("""
                    INSERT INTO topics (topic_id, module_id, topic_name, topic_status)
                    VALUES (%s, %s, %s, %s)
                """, (topic_id, module_id, topic["topic_name"], False))

        # 🔹 Commit transaction
        conn.commit()

        return {"message": "Syllabus uploaded successfully", "syllabus_id": syllabus_id}

    except Exception as e:
        conn.rollback()
        print("Database error:", e)
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()
        conn.close()
