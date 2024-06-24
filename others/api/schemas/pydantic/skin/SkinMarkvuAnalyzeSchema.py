from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class SkinMarkvuAnalyzePostRequestSchema(BaseModel):
    userkey: Optional[int] = None  # 사용자 키
    DBID: Optional[float] = None  # 마크뷰DB 식별키
    # CaptureDate: Optional[datetime] = None  # 측정날짜
    Side: Optional[str] = None  # Side
    Gubun: Optional[str] = None  # Gubun
    D0: Optional[float] = None  # D0
    D1: Optional[float] = None  # D1
    D2: Optional[float] = None  # D2
    D3: Optional[float] = None  # D3
    D4: Optional[float] = None  # D4
    D5: Optional[float] = None  # D5
    D6: Optional[float] = None  # D6
    D7: Optional[float] = None  # D7


class SkinMarkvuAnalyzeSchema(SkinMarkvuAnalyzePostRequestSchema):
    idx: int


class SkinMarkvuAnalyzeResponseSchema(SkinMarkvuAnalyzeSchema):
    idx: Optional[int]
    total_count: Optional[int] = 0  # 전체 개수
