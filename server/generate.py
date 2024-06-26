import os
from fastapi import FastAPI
from fastapi.responses import PlainTextResponse, StreamingResponse
from typing import Union
from pydantic import BaseModel
from models import gemini_generation, claude_generation
from prompts import generateComments, generateMermaidCode, generateCodeFromImage#, generateMermaidMetadata
import json


app = FastAPI()

class GenerateModel(BaseModel):
    provider: str
    model: str
    prompt: str
    cache_file: str

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
    cache_file = body.cache_file

    if cache_file in next(os.walk('../data/'))[1]:
        with open(f'../data/{cache_file}/payload.json', 'r') as f:
            return json.load(f)

    response = None 
    prompt_generator = None

    # print(model_family, model, prompt)

    if (model_family == 'gemini'):  
        prompt_generator = gemini_generation
    elif (model_family == 'anthropic'):
        prompt_generator = claude_generation


    # 3) First pass prompt modulation: add comments
    try: 
        response = prompt_generator(model, generateComments() + prompt, [])
        
        
    except Exception as e: 
        print(str(e))
        return 500

    print('[Gernerate] Created Commented Code')

    # 4) Second pass prompt modulation: create mermaid code
    try:
        response = prompt_generator(model, generateMermaidCode() + prompt, [])
   
    except Exception as e:
        print(str(e))
        return 500

    print('[Generate] Completed Mermaid Code and Metadata.')
    
    # # 5) Final pass metadata creation
    # try:
    #     metadata = prompt_generator(model, generateMermaidMetadata() + response.text, [])
    # except Exception as e:
    #     print(str(e))
    #     return {"error": str(e)}, 500
    
    # return {"mermaid": response.text, "metadata": metadata.text}
    return response.text


@app.post("/api/code/generate-code")
def code_generation(body: CodeGenModel):
    print('[Code Generation] Starting')
    # TODO: Perform auth check
    model_family = body.provider
    model = body.model
    prompt = body.prompt
    image = body.image
    img_format = body.img_format
    cache_file = body.cache_file
    
    if cache_file in next(os.walk('../data/'))[1]:
        with open(f'../data/{cache_file}/payload.json', 'r') as f:
            return json.load(f)

    response = None
    prompt_generator = None
    
    if model_family == 'gemini':
        prompt_generator = gemini_generation
    elif model_family == 'anthropic':
        prompt_generator = claude_generation
    
    image_data = [image, img_format] if image and img_format else []
    
    # 3) First pass creates code that's extremely well commented, complete, and documented
    try:
        response = prompt_generator(model, generateCodeFromImage() + prompt, image_data)
    except Exception as e:
        print(str(e))
        return 500
    
    print('[Code Generation] Completed Code Generation')
    
    # 4) Second pass prompt modulation: create mermaid code
    try:
        response = prompt_generator(model, generateMermaidCode() + response.text, [])
    except Exception as e:
        print(str(e))
        return 500
 
    print('[Code Generation] Completed Mermaid Code')
    
    # # 5) Final pass metadata creation
    # try:
    #     metadata = prompt_generator(model, generateMermaidMetadata() + response.text, [])
    # except Exception as e:
    #     print(str(e))
    #     return {"error": str(e)}, 500
    
    return response