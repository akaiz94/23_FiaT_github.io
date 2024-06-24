from pydantic import BaseModel

from schemas.pydantic.mb.UserSchema import UserResponseSchema


class CmsCommentPostRequestSchema(BaseModel):
    id: int  # 고유 ID
    contents_id: str  # 컨텐츠ID
    comments: str  # 내용
    user_id: int  # 작성자


class CmsCommentSchema(CmsCommentPostRequestSchema):
    id: int


class CmsCommentResponseSchema(CmsCommentSchema):
    user: UserResponseSchema
