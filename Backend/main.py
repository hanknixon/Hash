import asyncio
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
import json, re
from datetime import datetime

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


class QuizRequest(BaseModel):
    topic_id: str
    difficulty: str
    question_count: int
    student_year: int


class QuizUploadRequest(BaseModel):
    teacher_id: str
    subject_id: str
    topic_id: str
    difficulty: str
    questions: List[dict]
    time_limit: int
    due_date: str
    student_year: int


def extract_json(response_text):
    match = re.search(r'```json\n(.*?)\n```', response_text, re.DOTALL)
    if match:
        clean_json = match.group(1)  # Extract JSON content
    else:
        clean_json = response_text  # Use raw response if no markdown

    try:
        return json.loads(clean_json)  # Convert to Python dictionary
    except json.JSONDecodeError as e:
        print("JSON parsing error:", e)
        return None


@app.post("/api/generate-quiz")
async def generate_quiz(request: QuizRequest):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        print(f"📌 Received topic_id: {request.topic_id}, student_year: {request.student_year}")

        #  Step 1: Retrieve Topic Name
        cursor.execute("""
            SELECT t.topic_id, t.topic_name, m.module_name, s.subject_name 
            FROM topics t
            JOIN modules m ON t.module_id = m.module_id
            JOIN student_subjectslist s ON m.subject_id = s.subject_id
            WHERE t.topic_id = %s
        """, (request.topic_id,))

        topic_info = cursor.fetchone()
        print(f"Topic Query Result: {topic_info}")

        if not topic_info:
            raise HTTPException(status_code=404, detail="Topic not found")

        topic_name = topic_info["topic_name"]  # Ensure it's a string

        #  Step 2: Generate Quiz Using AI
        gen_ai = GenAI()
        prompt_generator = Prompt()

        quiz_prompt = prompt_generator.generate_quiz(
            number_of_questions=request.question_count,
            number_of_options=4,
            topics=topic_name,
            levels=request.difficulty,
            beginner=request.question_count // 3,
            intermediate=request.question_count // 3,
            hard=request.question_count // 3
        )

        print(f"Generated Quiz Prompt: {quiz_prompt}")  # ✅ Log prompt before sending to AI

        response = gen_ai.gen_ai_model(quiz_prompt)
        print(f"Raw AI Response: {response}")  # ✅ Log AI response

        if not response:
            raise HTTPException(status_code=500, detail="Failed to generate quiz")

        # ✅ Step 3: Parse AI Response
        quiz_data = extract_json(response)
        print(f"Parsed Quiz Data: {quiz_data}")  # ✅ Log parsed JSON

        if not quiz_data:
            raise HTTPException(status_code=500, detail="Invalid quiz format")

        return {"quiz": quiz_data}

    except Exception as e:
        print("Error generating quiz:", e)
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()
        conn.close()


# Quiz upload endpoint
@app.post("/api/upload-quiz")
async def upload_quiz(request: QuizUploadRequest):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Generate quiz ID
        quiz_id = str(uuid.uuid4())

        # ✅ Modify INSERT query to include `student_year`
        cursor.execute("""
            INSERT INTO generated_quiz (
                quiz_id, subject_id, topic_name, no_of_questions, 
                difficulty, teacher_id, student_year, start_date, end_date, status
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING quiz_id
        """, (
            quiz_id,
            request.subject_id,
            request.topic_id,
            len(request.questions),
            request.difficulty,
            request.teacher_id,
            request.student_year,  # ✅ New column
            datetime.now(),
            request.due_date,
            "active"  # ✅ Default status
        ))

        # Insert questions
        for question in request.questions:
            question_id = str(uuid.uuid4())
            cursor.execute("""
                INSERT INTO quiz_questions (
                    question_id, quiz_id, question_text, 
                    option_1, option_2, option_3, option_4, correct_answer
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                question_id,
                quiz_id,
                question['question'],
                question['options'][0],
                question['options'][1],
                question['options'][2],
                question['options'][3],
                question['correct_answer']
            ))

        conn.commit()
        return {"message": "Quiz uploaded successfully", "quiz_id": quiz_id}

    except Exception as e:
        conn.rollback()
        print("Error uploading quiz:", e)
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()


@app.post("/login")
async def login(user: LoginRequest):
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    try:
        # First try teacher login
        teacher_query = "SELECT teacher_id, teacher_name, email_id FROM teacher_details WHERE email_id = %s AND password = %s"
        cursor.execute(teacher_query, (user.email, user.password))
        teacher = cursor.fetchone()

        if teacher:
            return {
                "message": "Login successful",
                "role": "teacher",
                "teacher_id": teacher.get("teacher_id"),
                "email": teacher.get("email_id"),
                "name": teacher.get("teacher_name"),
            }

        # Then try student login
        student_query = "SELECT student_id, student_name, email_id FROM student_details WHERE email_id = %s AND password = %s"
        cursor.execute(student_query, (user.email, user.password))
        student = cursor.fetchone()

        if student:
            return {
                "message": "Login successful",
                "role": "student",
                "student_id": student.get("student_id"),
                "email": student.get("email_id"),
                "name": student.get("student_name"),
            }

        # Finally try admin login
        admin_query = "SELECT admin_id, admin_name, email_id FROM admin_details WHERE email_id = %s AND password = %s"
        cursor.execute(admin_query, (user.email, user.password))
        admin = cursor.fetchone()

        if admin:
            return {
                "message": "Login successful",
                "role": "admin",
                "admin_id": admin.get("admin_id"),
                "email": admin.get("email_id"),
                "name": admin.get("admin_name"),
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
        cleaned_content = raw_content.replace("```json\n", "").replace("\n```", "").strip()

        # ✅ Convert JSON string into a dictionary
        try:
            parsed_data = json.loads(cleaned_content)
            print("📌 Parsed Data Before Sending:", json.dumps(parsed_data, indent=2))
            return {"parsed_data": parsed_data}  # ✅ Return structured JSON
        except json.JSONDecodeError:
            raise HTTPException(status_code=500, detail="AI response is not valid JSON.")

    except Exception as e:
        print("Error parsing syllabus:", e)
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/syllabus/upload")
async def upload_syllabus(data: dict):
    try:
        # Extract data from request
        subject_name = data.get("subject_name")
        teacher_id = data.get("teacher_id")
        student_year = data.get("student_year", "1")  # Default to 1 if not provided
        modules = data.get("modules", [])

        if not all([subject_name, teacher_id, modules]):
            raise HTTPException(status_code=400, detail="Missing required fields")

        # Convert student_year to integer
        try:
            student_year = int(student_year)
        except (ValueError, TypeError):
            student_year = 1  # Default to 1 if conversion fails

        conn = get_db_connection()
        cursor = conn.cursor()

        try:
            # Check if subject exists
            cursor.execute(
                "SELECT subject_id FROM student_subjectslist WHERE subject_name = %s",
                (subject_name,)
            )
            subject = cursor.fetchone()

            if subject:
                subject_id = subject[0]
            else:
                # Insert new subject
                subject_id = str(uuid.uuid4())
                cursor.execute("""
                    INSERT INTO student_subjectslist (subject_id, subject_name, teacher_id, student_year)
                    VALUES (%s, %s, %s, %s)
                """, (subject_id, subject_name, teacher_id, student_year))

            # Check if teacher is already assigned
            cursor.execute(
                "SELECT * FROM teacher_subjects WHERE teacher_id = %s AND subject_id = %s",
                (teacher_id, subject_id)
            )
            if not cursor.fetchone():
                cursor.execute("""
                    INSERT INTO teacher_subjects (teacher_id, subject_id)
                    VALUES (%s, %s)
                """, (teacher_id, subject_id))

            # Insert syllabus
            syllabus_id = str(uuid.uuid4())
            cursor.execute("""
                INSERT INTO syllabus (syllabus_id, subject_id, subject_name, subject_status, progress)
                VALUES (%s, %s, %s, %s, %s)
            """, (syllabus_id, subject_id, subject_name, False, 0))

            # Insert modules and topics
            for module in modules:
                module_id = str(uuid.uuid4())
                cursor.execute("""
                    INSERT INTO modules (module_id, subject_id, syllabus_id, module_no, module_name)
                    VALUES (%s, %s, %s, %s, %s)
                """, (module_id, subject_id, syllabus_id, module["module_no"], module["module_name"]))

                # Insert topics
                for topic in module["topics"]:
                    topic_id = str(uuid.uuid4())
                    cursor.execute("""
                        INSERT INTO topics (topic_id, module_id, topic_name, topic_status)
                        VALUES (%s, %s, %s, %s)
                    """, (topic_id, module_id, topic["topic_name"], False))

            conn.commit()
            return {"message": "Syllabus uploaded successfully", "syllabus_id": syllabus_id}

        except Exception as e:
            conn.rollback()
            raise HTTPException(status_code=500, detail=str(e))
        finally:
            cursor.close()
            conn.close()

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
