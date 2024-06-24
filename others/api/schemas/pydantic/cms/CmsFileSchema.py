from typing import Optional

from pydantic import BaseModel

from schemas.pydantic.mb.UserSchema import UserResponseSchema


class CmsFilePostRequestSchema(BaseModel):
    file_div_cd: str  # 파일구분코드
    ref_id: int  # 참조ID
    file_name: str  # 파일명
    path: str  # 경로
    ext: str  # 확장자
    size: str  # 파일사이즈
    user_id: int  # 작성자


class CmsFileSchema(CmsFilePostRequestSchema):
    id: int


class CmsFileUpdateRefSchema(BaseModel):
    id: int
    ref_id: int  # 참조ID
    user_id: int  # 작성자


class CmsFileResponseSchema(CmsFileSchema):
    user: Optional[UserResponseSchema]
