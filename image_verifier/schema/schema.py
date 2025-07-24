from pydantic import BaseModel

class VerificationResponse(BaseModel): 
    approved: bool
    message: str


    