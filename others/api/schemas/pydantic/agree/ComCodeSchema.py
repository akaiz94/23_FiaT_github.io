from typing import Optional

from pydantic import BaseModel


class ComCodePostRequestSchema(BaseModel):
    Code: Optional[str] = None  # Code
    GrpCode: Optional[str] = None  # GrpCode
    MidCode: Optional[str] = None  # MidCode
    DetCode: Optional[str] = None  # DetCode
    Gubun: Optional[str] = None  # Gubun
    CodeName: Optional[str] = None  # CodeName
    Comment: Optional[str] = None  # Comment
    ParentCode: Optional[str] = None  # ParentCode
    IsGlobalVariable: Optional[int] = None  # IsGlobalVariable
    IsWorkStatusCode: Optional[str] = None  # IsWorkStatusCode
    WorkStartTime: Optional[str] = None  # WorkStartTime
    WorkEndTime: Optional[str] = None  # WorkEndTime


class ComCodeSchema(ComCodePostRequestSchema):
    Code: str


class ComCodeResponseSchema(ComCodeSchema):
    Code: Optional[str]
    total_count: Optional[int] = 0  # 전체 개수
