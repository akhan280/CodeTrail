
from dotenv import load_dotenv
import os
import google.generativeai as genai
import pprint

def gemini_generation(model, prompt):

    genai.configure(api_key=os.environ['gemini_api_key'])
    model = genai.GenerativeModel(model)

    response = model.generate_content(prompt)

    # From google docs, how to print out available models

    return response


def OAI_generation():
    raise Exception('Not implemented yet')


def claude_generation():
    raise Exception('Not implemented yet')

