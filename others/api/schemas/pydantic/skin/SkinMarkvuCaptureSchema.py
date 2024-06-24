from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class SkinMarkvuCapturePostRequestSchema(BaseModel):
    surveyNo: Optional[int] = None  # 고유번호
    userkey: Optional[int] = None  # 사용자 키
    DBID: Optional[float] = None  # 마크뷰DB 식별키
    CaptureDate: Optional[datetime] = None  # 측정날짜
    LED: Optional[str] = None  # LED
    Side: Optional[str] = None  # Side
    FilePath: Optional[str] = None  # FilePath
    MakeData: Optional[str] = None  # MakeDate

    ImageData: Optional[bytes] = None  # ImageData


class SkinMarkvuCaptureSchema(SkinMarkvuCapturePostRequestSchema):
    idx: int


class SkinMarkvuCaptureResponseSchema(SkinMarkvuCaptureSchema):
    idx: Optional[int]
    total_count: Optional[int] = 0  # 전체 개수
