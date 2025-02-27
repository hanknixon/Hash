from openai import OpenAI
from config.config_parser import Config
from prompts.prompt import Prompt
from model.syllabus_parser import ProcessSyllabus

config = Config()
api_data = config.load_config()

api_key = api_data["API_CONFIG"]["API_KEY"]
base_url = api_data["API_CONFIG"]["BASE_URL"]
model = api_data["API_CONFIG"]["MODEL"]

print("Starting the script...") #Checking whether the program is actually running


class GenAI:
    def gen_ai_model(self, prompt):
        print("Inside gen_ai_model function")  # Checking if we are in gen_ai_model
        self.client = OpenAI(api_key=api_key, base_url=base_url)

        try:
            print("Making API request...")  #Verifying about API Request
            response = self.client.chat.completions.create(
                model=model,
                messages=[
                    {"role": "system",
                     "content": "You are a helpful assistant for creating quiz and parsing syllabus based on the selected topics, Always return the parsed syllabus in JSON format"},
                    {"role": "user", "content": prompt}
                ],
                stream=False
            )
            print("API request successful!")  #API Request Verification - 2
            print("Raw API Response:", response)  #Check logs, Tokens ettc

            return response.choices[0].message.content
        except Exception as e:
            print("API call failed with error:", str(e))
            return None


print("Creating GenAI instance...")  #Instance of GenAI
gen_ai = GenAI()

prompt_generator = Prompt()
syllabus_prompt = prompt_generator.parse_syllabus()

print("Fetching syllabus from ProcessSyllabus...")  # Verifying whether the syllabus is going through
process_syllabus = ProcessSyllabus()
syllabus_text = process_syllabus.syllabus_parser()

if syllabus_text:
    prompt_text = syllabus_prompt.format(syllabus_text=syllabus_text)

    print("Calling gen_ai_model function with syllabus...")  #GEN AI Model called using prompt
    response = gen_ai.gen_ai_model(prompt_text)

    if response:
        try:
            import json
            syllabus_json = json.loads(response)  #Convert response to JSON
            print("Formatted Syllabus (JSON):\n", json.dumps(syllabus_json, indent=4))
        except json.JSONDecodeError:
            print("AI Response is NOT valid JSON:\n", response)
    else:
        print("No response received.")

