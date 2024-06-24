from datetime import datetime

from typing import Optional

from pydantic import BaseModel


class HairMainPostRequestSchema(BaseModel):
    surveyNo: Optional[int] = None  # 예약 고유키
    userKey: Optional[int] = None  # 사용자 키
    PhoneNumber: Optional[str] = None  # 핸드폰번호
    Name: Optional[str] = None  # 이름
    Age: Optional[int] = None  # 나이
    Birthday: Optional[str] = None  # 생년월일
    Gender: Optional[str] = None  # 성별
    ScalpType_Nor: Optional[int] = None  # 양호
    ScalpType_Oily: Optional[int] = None  # 지성
    ScalpType_Ato: Optional[int] = None  # 아토피성
    ScalpType_Trb: Optional[int] = None  # 트러블성
    ScalpType_Dry: Optional[int] = None  # 건성
    ScalpType_Sen: Optional[int] = None  # 민감성
    ScalpType_Seb: Optional[int] = None  # 지루성
    ScalpType_Ddan: Optional[int] = None  # 건성비듬성
    ScalpType_Odan: Optional[int] = None  # 지성비듬성
    ScalpType_Unknown: Optional[int] = None  # x1
    HairlossType_Basic: Optional[str] = None  # 탈모유형_기본
    HairlossType_Center: Optional[str] = None  # 탈모유형_정수리
    HairlossType_FrontCenter: Optional[str] = None  # 탈모유형_앞 중앙
    Haircondition_Type: Optional[str] = None  # *
    Haircondition_Root: Optional[str] = None  # 헤어컨디선_모근
    Haircondition_Mid: Optional[str] = None  # 헤어컨디선_모발중간
    Haircondition_Tips: Optional[str] = None  # 헤어컨디선_모발끝
    create_dt: Optional[datetime] = None  # 생성일자
    update_dt: Optional[datetime] = None  # 업데이트 일자


class HairMainSchema(HairMainPostRequestSchema):
    idx: int


class HairMainResponseSchema(HairMainSchema):
    idx: Optional[int]
    total_count: Optional[int] = 0  # 전체 개수
