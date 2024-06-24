from pydantic import BaseModel

from schemas.pydantic.mb.UserSchema import UserResponseSchema


class CmsMetaPostRequestSchema(BaseModel):
    id: int  # 고유 ID
    ref_id: int  # 참조ID
    meta_type_cd: str  # 메시지유형
    meta: str  # 메시지
    ip: str  # ip주소
    user_id: int  # 작성자


class CmsMetaSchema(CmsMetaPostRequestSchema):
    id: int


class CmsMetaResponseSchema(CmsMetaSchema):
    user: UserResponseSchema
