from pydantic import BaseModel

from schemas.pydantic.mb.UserSchema import UserResponseSchema


class CmsSharePostRequestSchema(BaseModel):
    id: int  # 고유 ID
    contents_id: int  # 컨텐츠ID
    share_type_cd: str  # 공유 유형
    share_url: str  # 공유된 URL
    user_id: int  # 작성자


class CmsShareSchema(CmsSharePostRequestSchema):
    id: int


class CmsShareResponseSchema(CmsShareSchema):
    user: UserResponseSchema
