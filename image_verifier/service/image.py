import requests
from PIL import Image
import pytesseract
import io

from image_verifier.llm.gemini import is_image_valid
from image_verifier.schema.schema import VerificationResponse

class ImageService:
    def __init__(self):
        pass

    def download_image(self,image_url: str): 
        try:
            response = requests.get(image_url, stream=True)
            response.raise_for_status()

            return response.content
        except requests.exceptions.RequestException as e:
            return None
            

    def validate_img(self, image_url: str):
        image = self.download_image(image_url)

        if not image:
            return VerificationResponse(
                approved=False,
                message="Erro ao baixar a imagem."
            )
        
        is_image_valid_result = is_image_valid(image)

        if not is_image_valid_result:
            return VerificationResponse(
                approved=False,
                message="A imagem é imprópria."
            )
        
        return VerificationResponse(
            approved=True,
            message="A imagem é apropriada."
        )
        
        
        




    
    




