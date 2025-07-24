from google import genai
from google.genai import types
from dotenv import load_dotenv
import os
from PIL import Image
import io

load_dotenv()

client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))

def is_image_valid(image_bytes:bytes) -> bool:
  contents = [
      "Você vai receber uma imagem e tem que me falar se o conteudo é apropriado ou não. Somente isso. Qualquer imagem sexualizada, ofensiva ou imprópria pode e deve ser considerada IMPRÓPRIA. A resposta deve ser no formato: 'Apropriada' ou 'Imprópria'",
      Image.open(io.BytesIO(image_bytes))
  ]

  response = client.models.generate_content(
    model='gemini-2.0-flash',
    contents=contents,
    config=types.GenerateContentConfig(
         safety_settings=[
        types.SafetySetting(
            category='HARM_CATEGORY_HATE_SPEECH',
            threshold='BLOCK_LOW_AND_ABOVE'
        ),
        types.SafetySetting(
             category='HARM_CATEGORY_SEXUALLY_EXPLICIT',
             threshold='BLOCK_LOW_AND_ABOVE'
        ),
        types.SafetySetting(
            category='HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold='BLOCK_LOW_AND_ABOVE'
        )
        ]
    )
  )

  print(response.text)

  if response.candidates and response.candidates[0].content and response.candidates[0].content.parts:
            for part in response.candidates[0].content.parts:
                if part.text:
                    gemini_text_response = part.text.strip()
                    break 
  if "imprópria" in gemini_text_response.lower():
       return False
  

  return True
