import json
from openai import OpenAI
from config.config_parser import Config
from prompts.prompt import Prompt
from model.syllabus_parser import ProcessSyllabus

# Load API Configuration
config = Config()
api_data = config.load_config()

api_key = api_data["API_CONFIG"]["API_KEY"]
base_url = api_data["API_CONFIG"]["BASE_URL"]
model = api_data["API_CONFIG"]["MODEL"]

print("Starting the script...")  # Checking if the script is running


class GenAI:
    def __init__(self):
        """Initialize OpenAI client with API credentials."""
        self.client = OpenAI(api_key=api_key, base_url=base_url)

    def gen_ai_model(self, prompt):
        """Send the prompt to the AI model and return the response."""
        print("Inside gen_ai_model function")  # Debugging
        try:
            print("Making API request...")  # Debugging API request
            response = self.client.chat.completions.create(
                model=model,
                messages=[
                    {"role": "system",
                     "content": "You are a helpful assistant for creating quizzes and parsing syllabus based on topics. Always return JSON-formatted responses."},
                    {"role": "user", "content": prompt}
                ],
                stream=False
            )
            print("API request successful!")  # API verification
            print("Raw API Response:", response)  # Debugging API response

            return response.choices[0].message.content
        except Exception as e:
            print("API call failed with error:", str(e))
            return None


# Create GenAI instance
print("Creating GenAI instance...")
gen_ai = GenAI()

# Initialize Prompt Generator
prompt_generator = Prompt()
syllabus_prompt = prompt_generator.parse_syllabus()

# Define the syllabus PDF file path
pdf_path = "uploads/syllabus.pdf"  # Ensure the uploaded file exists

print("Fetching syllabus from ProcessSyllabus...")  # Debugging
process_syllabus = ProcessSyllabus()
syllabus_text = process_syllabus.syllabus_parser(pdf_path)

if syllabus_text:
    prompt_text = syllabus_prompt.format(syllabus_text=syllabus_text)

    print("Calling gen_ai_model function with syllabus...")  # Debugging
    response = gen_ai.gen_ai_model(prompt_text)

    if response:
        try:
            cleaned_response = response.strip()
            syllabus_json = json.loads(cleaned_response)  # Convert response to JSON
            print("Formatted Syllabus (JSON):\n", json.dumps(syllabus_json, indent=4))
        except json.JSONDecodeError:
            print("AI Response is NOT valid JSON:\n", response)
    else:
        print("No response received.")
else:
    print("Failed to extract syllabus text from PDF.")
