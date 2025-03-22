import fitz  # PyMuPDF
import os


class ProcessSyllabus:
    def syllabus_parser(self, pdf_path):
        """
        Parses text from the given PDF syllabus file.

        :param pdf_path: Path to the uploaded syllabus PDF file
        :return: Extracted text from the syllabus
        """
        try:
            if not os.path.exists(pdf_path):
                print(f"Error: File '{pdf_path}' not found.")
                return None

            print(f"Extracting text from: {pdf_path}")
            syllabus_text = ""

            # Open the PDF file
            with fitz.open(pdf_path) as doc:
                for page in doc:
                    syllabus_text += page.get_text("text") + "\n"

            if not syllabus_text.strip():
                print("Warning: No text extracted from the PDF.")
                return None

            return syllabus_text

        except Exception as e:
            print(f"An error occurred while parsing the syllabus: {str(e)}")
            return None
