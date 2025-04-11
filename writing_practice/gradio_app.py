import gradio as gr
import requests
import random
import logging
from openai import OpenAI
import os
import dotenv
import yaml

dotenv.load_dotenv()


def load_prompts():
    """Load prompts from YAML file"""
    with open('prompts.yaml', 'r', encoding='utf-8') as f:
        return yaml.safe_load(f)

# Setup logging
logger = logging.getLogger('language_app')
logger.setLevel(logging.DEBUG)
fh = logging.FileHandler('gradio_app.log')
fh.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
fh.setFormatter(formatter)
logger.addHandler(fh)

class LanguageLearningApp:
    def __init__(self):
        self.client = OpenAI()
        self.vocabulary = None
        self.current_word = None
        self.current_sentence = None
        self.study_session_id = os.getenv('SESSION_ID', '1')
        logger.debug(f"Using session_id: {self.study_session_id}")
        self.load_vocabulary()

    def load_vocabulary(self):
        """Fetch vocabulary from API using group_id"""
        try:
            group_id = os.getenv('GROUP_ID', '1')
            url = f"http://localhost:5000/api/groups/{group_id}/words/raw"
            logger.debug(f"Fetching vocabulary from: {url}")
            
            response = requests.get(url)
            if response.status_code == 200:
                self.vocabulary = response.json()
                logger.info(f"Loaded {len(self.vocabulary.get('words', []))} words")
            else:
                logger.error(f"Failed to load vocabulary. Status code: {response.status_code}")
                self.vocabulary = {"words": []}
        except Exception as e:
            logger.error(f"Error loading vocabulary: {str(e)}")
            self.vocabulary = {"words": []}

    def get_random_word(self):
        """Get a random word from vocabulary"""
        logger.debug("Getting random word")
        
        if not self.vocabulary or not self.vocabulary.get('words'):
            return "", "", "", "Please make sure vocabulary is loaded properly."
            
        self.current_word = random.choice(self.vocabulary['words'])
        sentence = self.generate_sentence(self.current_word)
        
        return (
            f"Word: {self.current_word.get('english', '')}",
            sentence,
            "Upload your translation image to check"
        )
    
    def generate_sentence(self, word):
        """Generate a sentence using the provided word"""
        prompts = load_prompts()
        sentence = prompts['sentence_generation']['user'].format(word=word.get('english', ''))
        return sentence

    def grade_submission(self, image):
        """Process image submission and grade it using OCR and LLM"""
        try:
            transcription = self.transcribe_image(image)
            result = self.grade_transcription(transcription)
            return transcription, result
        except Exception as e:
            logger.error(f"Error in grade_submission: {str(e)}")
            return "Error processing submission", "Error: " + str(e)

    def transcribe_image(self, image):
        """Use OCR to transcribe the handwritten text in the image"""
        # This is a placeholder for the OCR method to transcribe the image input
        return "Transcribed Text"

    def grade_transcription(self, transcription):
        """Grade the transcription against the target sentence"""
        correct = transcription.strip() == self.current_sentence.strip()
        return "Correct!" if correct else "Incorrect!"

def create_ui():
    app = LanguageLearningApp()
    
    with gr.Blocks(title="Language Learning App") as interface:
        gr.Markdown("# Language Learning Practice")
        
        with gr.Row():
            with gr.Column():
                generate_btn = gr.Button("Generate Sentence", variant="primary")
                word_output = gr.Textbox(label="Word", interactive=False)
                sentence_output = gr.Textbox(label="Sentence", interactive=False)
                instruction_output = gr.Textbox(label="Instructions", interactive=False)
            
            with gr.Column():
                image_input = gr.Image(label="Upload your translation image", type="filepath")
                submit_btn = gr.Button("Submit for Review", variant="secondary")
                
                transcription_output = gr.Textbox(label="Transcription", interactive=False)
                grade_output = gr.Textbox(label="Grading Result", interactive=False)

        # Event handlers
        generate_btn.click(fn=app.get_random_word, outputs=[word_output, sentence_output, instruction_output])
        submit_btn.click(fn=app.grade_submission, inputs=image_input, outputs=[transcription_output, grade_output])

    return interface

if __name__ == "__main__":
    interface = create_ui()
    interface.launch(server_name="0.0.0.0", server_port=8081)
