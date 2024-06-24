from datetime import datetime

from typing import Optional

from pydantic import BaseModel


class SkinVapometerPostRequestSchema(BaseModel):
    surveyNo: Optional[int] = None  # 고유번호
    userKey: Optional[int] = None  # 사용자 키
    C_Left: Optional[str] = None  # 좌측 볼
    C_Right: Optional[str] = None  # 우측 볼
    create_dt: Optional[datetime] = None  # 생성일


class SkinVapometerSchema(SkinVapometerPostRequestSchema):
    idx: int


class SkinVapometerResponseSchema(SkinVapometerSchema):
    idx: Optional[int]
    total_count: Optional[int] = 0  # 전체 개수
