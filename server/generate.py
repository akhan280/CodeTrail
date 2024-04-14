import os
from fastapi import FastAPI
from typing import Union
from pydantic import BaseModel
from models import gemini_generation, claude_generation
from prompts import generateCommentsPrompt, generateMermaidCodePrompt

app = FastAPI()


class GenerateModel(BaseModel):
    provider: str
    model: str
    prompt: str

class CodeGenModel(GenerateModel):
    image: str
    img_format: str

# Generates api response from gemini
@app.post("/api/graph/generate")
def generation(body: GenerateModel):

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
    elif (model_family == 'anthropic'):
        prompt_generator = claude_generation


    # 3) First pass prompt modulation: add comments
    try: 
        response = prompt_generator(model, generateCommentsPrompt() + prompt)
        
        
    except Exception as e: 
        print(str(e))
        return 500

    print('Created Commented Code')
    print(response.text)

    # 4) Second pass prompt modulation: create mermaid code
    try:
        response = prompt_generator(model, generateMermaidCodePrompt() + prompt)
   
    except Exception as e:
        print(str(e))
        return 500


    return {response.text}





@app.post("/api/code/generate")
def code_generation(body: CodeGenModel):

    # TODO: Perform auth check
 
    model_family = body.provider
    model = body.model
    prompt = body.prompt
    image = body.image
    img_format = body.img_format

    image_data = [image, img_format]

    response = None 
    prompt_generator = None


    if (model_family == 'gemini'):  
        prompt_generator = gemini_generation
    elif (model_family == 'anthropic'):
        prompt_generator = claude_generation


    # 3) First pass creates code that's extremely well commented, complete, and documented
    try: 
        response = prompt_generator(model, 'todo: implement new prompt' + prompt, image_data)
  
    except Exception as e: 
        print(str(e))
        return 500
    

    print('Created Code')
    print(response.text)

    # 4) Second pass prompt modulation: create mermaid code
    try:
        response = prompt_generator(model, mermaidCodeSystemPrompt() + image_data)
   
    except Exception as e:
        print(str(e))
        return 500


    return {response.text}


