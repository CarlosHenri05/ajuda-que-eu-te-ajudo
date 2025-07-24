from fastapi import FastAPI
from dotenv import load_dotenv
from image_verifier.service.image import ImageService
from image_verifier.schema.schema import VerificationResponse

app = FastAPI()

load_dotenv()

image_service = ImageService()

@app.get("/validate")
async def validate_image(image_url: str) -> VerificationResponse :
    response = image_service.validate_img(image_url)
    
    return response
