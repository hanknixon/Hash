class Prompt:
    def __init__(self):
        self.syllabus_prompt = '''<user>
            Extract the syllabus from the given the syllabus text:

            {syllabus_text}

            Return it in the following formatted JSON Structure:
            <JSON>
                {{
                "Subject": "Extract Subject name from the pdf",
                "StudentYear": "Extract the first digit from any subject code that contains numbers (e.g., 'ITT203' → 2). If no number is found, return 1",
                "Syllabus": [
                {{
                "module": "Extract module heading",
                "subject": "Make a headline for the module based on the topics and subtopics",
                "topic": ["Extract the topic names from the syllabus and store it as a list"]
                }}
                ]
             }}
        </JSON>
        </user>'''

        self.quiz_prompt = '''<user>
        Generate a quiz with {number_of_questions} questions, each with {number_of_options} answer options,
        covering the following topics: {topics}, at {levels} difficulty level.

        Return the quiz in the following JSON format:
        <JSON>
            {{
                "quiz_title": "Quiz on {topics}",
                "difficulty": "{levels}",
                "questions": [
                    {{
                        "question": "A clear, concise question about {topics}",
                        "options": ["Four distinct answer options"],
                        "correct_answer": "Index of the correct answer (0-3)",
                        "explanation": "Brief explanation of why this is the correct answer"
                    }}
                ]
            }}
            <instructions>
                - Generate {beginner} beginner level questions
                - Generate {intermediate} intermediate level questions
                - Generate {hard} hard level questions
                - Ensure questions are relevant to the topic
                - Make options clear and unambiguous
                - Include a mix of conceptual and practical questions
                - Avoid repetitive or similar questions
                - Keep questions concise and focused
            </instructions>
        </JSON>
        </user>'''

    def parse_syllabus(self):
        return self.syllabus_prompt

    def generate_quiz(self, number_of_questions, number_of_options, topics, levels, beginner, intermediate, hard):
        return self.quiz_prompt.format(
            number_of_questions=number_of_questions,
            number_of_options=number_of_options,
            topics=topics,
            levels=levels,
            beginner=beginner,
            intermediate=intermediate,
            hard=hard
        )