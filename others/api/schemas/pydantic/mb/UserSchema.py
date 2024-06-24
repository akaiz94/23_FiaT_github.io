from typing import Optional

from pydantic import BaseModel


# from models.OfficeModel import Office
# from schemas.pydantic.OfficeSchema import OfficePostRequestSchema, OfficeSchema
# from schemas.pydantic.UserOptinSchema import UserOptinPostRequestSchema

class UserPostRequestSchema(BaseModel):
    email: Optional[str] = None
    passwd: Optional[str] = None
    name: str
    address: Optional[str] = None
    phone: str
    birth_date: Optional[str] = None
    gender: Optional[str] = None
    profile_file_id: Optional[int] = 0


class UserSchema(UserPostRequestSchema):
    id: int


class UserInfoSchema(BaseModel):
    email: Optional[str] = None
    name: str
    address: Optional[str] = None
    phone: str
    birth_date: Optional[str] = None
    gender: Optional[str] = None

    profile_img: Optional[str] = None
    push_token: Optional[str] = None


class UserPatchRequestSchema(BaseModel):
    email: Optional[str] = None
    name: str
    address: Optional[str] = None
    phone: Optional[str] = None
    birth_date: Optional[str] = None
    gender: Optional[str] = None
    profile_file_id: Optional[int] = 0
    last_access_at: Optional[str]
    push_token: Optional[str] = None


class UserPatchResponseSchema(BaseModel):
    id: int
    name: str


class UserResponseSchema(UserInfoSchema):
    id: int
