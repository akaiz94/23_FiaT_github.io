from typing import Optional

from pydantic import BaseModel


class SkinMarkvuRefDataPostRequestSchema(BaseModel):
    Gubun: Optional[str] = None  # 고유번호
    Age: Optional[float] = None  # 사용자 키
    Sex: Optional[str] = None  # 마크뷰DB 식별키
    F0: Optional[float] = None  # 측정날짜
    F1: Optional[float] = None  # F1
    F2: Optional[float] = None  # 성공여부
    F3: Optional[float] = None  # F3
    F4: Optional[float] = None  # F4
    F5: Optional[float] = None  # F5
    F6: Optional[float] = None  # F6
    F7: Optional[float] = None  # F7
    iAvg: Optional[float] = None  # iAvg
    Side: Optional[str] = None  # Side
    # 필드14: Optional[str] = None  # 필드14


class SkinMarkvuRefDataSchema(SkinMarkvuRefDataPostRequestSchema):
    idx: str


class SkinMarkvuRefDataResponseSchema(SkinMarkvuRefDataSchema):
    idx: Optional[str]
    total_count: Optional[int] = 0  # 전체 개수
