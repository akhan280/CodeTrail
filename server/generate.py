import os
from fastapi import FastAPI
from typing import Union
from pydantic import BaseModel
from models import gemini_generation
from utils import commentSystemPrompt, mermaidCodeSystemPrompt

app = FastAPI()


class Body(BaseModel):
    provider: str
    model: str
    prompt: str


# Generates api response from gemini
@app.post("/generate")
def generation(body: Body):

    # TODO: Perform auth check
    # 2) Process request based on model in body
    model_family = body.provider
    model = body.model
    prompt = body.prompt

    response = None 
    prompt_generator = None

    # print(model_family, model, prompt)

    if (model_family == 'gemini'):  
        prompt_generator = gemini_generation

    # 3) First pass prompt modulation: add comments
    try: 
        response = prompt_generator(model, commentSystemPrompt() + prompt)
        
        
    except Exception as e: 
        print(str(e))
        return 500

    print('Created Commented Code')
    print(response.text)

    # 4) Second pass prompt modulation: create mermaid code
    try:
        response = prompt_generator(model, mermaidCodeSystemPrompt() + prompt)
   
    except Exception as e:
        print(str(e))
        return 500


    return {response.text}