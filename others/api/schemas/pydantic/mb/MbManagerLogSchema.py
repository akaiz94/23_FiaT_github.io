from datetime import datetime
from typing import Optional, Union

from pydantic import BaseModel


class MbManagerLogPostRequestSchema(BaseModel):
    LogKey: Optional[int] = None  # 로그키
    ProcessType: Optional[str] = None  # 실행타입
    ProcessCode: Optional[int] = None  # 실행코드
    ProcessName: Optional[str] = None  # 실행이름
    Params: Optional[str] = None  # 정보
    RegKey: Optional[int] = None  # 등록자
    RegDate: Union[datetime, str, None]  # 등록일


class MbManagerLogSchema(MbManagerLogPostRequestSchema):
    LogKey: int


class MbManagerLogResponseSchema(MbManagerLogSchema):
    LogKey: Optional[int]
    total_count: Optional[int] = 0  # 전체 개수
