from typing import Optional

from pydantic import BaseModel

from schemas.pydantic.mb.UserSchema import UserResponseSchema


class UserLoginPostRequestSchema(BaseModel):
    phone: str
    passwd: str
    push_token: Optional[str] = None


class UserLoginResponseSchema(BaseModel):
    user: UserResponseSchema
    access_token: str
