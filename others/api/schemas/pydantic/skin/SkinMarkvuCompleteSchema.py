from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class SkinMarkvuCompletePostRequestSchema(BaseModel):
    surveyNo: Optional[int] = None  # 고유번호
    userkey: Optional[int] = None  # 사용자 키
    DBID: Optional[float] = None  # 마크뷰DB 식별키
    CaptureDate: Optional[datetime] = None  # 측정날짜
    Side: Optional[str] = None  # Side
    Complete: Optional[str] = None  # 성공여부


class SkinMarkvuCompleteSchema(SkinMarkvuCompletePostRequestSchema):
    idx: int


class SkinMarkvuCompleteResponseSchema(SkinMarkvuCompleteSchema):
    idx: Optional[int]
    total_count: Optional[int] = 0  # 전체 개수
