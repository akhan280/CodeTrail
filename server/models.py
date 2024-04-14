from dotenv import load_dotenv
import os
import google.generativeai as genai
import pprint

import anthropic
import base64
import httpx

# gemini image data acquisition
import requests
from io import BytesIO
from PIL import Image


def gemini_generation(model, prompt, image_data):
    print('[GEMINI] Generating Response')
    genai.configure(api_key=os.environ['gemini_api_key'])
    
    print('[GEMINI] Image Data:', image_data)
    if image_data and len(image_data) >= 2:
        model = genai.GenerativeModel('gemini-pro-vision')
        print('[GEMINI] Creating image response')
        image_url = image_data[0]
        img = Image.open(BytesIO(requests.get(image_url).content))
        response = model.generate_content([prompt, img])
    else:
        print('[GEMINI] Generating w/no Image')
        model = genai.GenerativeModel(model)
        response = model.generate_content(prompt)
    
    return response

def OAI_generation():
    raise Exception('Not implemented yet')


def claude_generation(model, prompt, image_data):
    client = anthropic.Anthropic(
        api_key=os.environ['anthropic_api_key'])


    # if we have an image, we're doing the 'reverse mapping'
    if image_data and len(image_data) >= 2:
        image_media_type = image_data[1]
        image_data = base64.b64encode(httpx.get(image_data[0]).content).decode("utf-8")

        message = client.messages.create(
            model= model,
            max_tokens=1024,
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "image",
                            "source": {
                                "type": "base64",
                                "media_type": image_media_type,
                                "data": image_data,
                            },
                        },
                        {
                            "type": "text",
                            "text": prompt,
                        }
                    ],
                }
            ],
        )
    # else we're just doing the code generation
    else:
        message = client.messages.create(
            model= model,
            max_tokens=1024,
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": prompt,
                        }
                    ],
                }
            ]
        )

    return message

