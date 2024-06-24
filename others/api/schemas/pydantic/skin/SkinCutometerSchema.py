from datetime import datetime

from typing import Optional

from pydantic import BaseModel


class SkinCutometerPostRequestSchema(BaseModel):
    surveyNo: Optional[int] = None  # 고유번호
    userKey: Optional[int] = None  # 사용자키
    eye_area: Optional[str] = None  # 눈가피부측정
    cheek: Optional[str] = None  # 눈가주변피부측정
    create_dt: Optional[datetime] = None  # 생성일
    update_dt: Optional[datetime] = None  # 수정일


class SkinCutometerSchema(SkinCutometerPostRequestSchema):
    idx: int


class SkinCutometerResponseSchema(SkinCutometerSchema):
    idx: Optional[int]
    total_count: Optional[int] = 0  # 전체 개수
