from datetime import datetime

from typing import Optional

from pydantic import BaseModel


class HairImagePostRequestSchema(BaseModel):
    surveyNo: Optional[int] = None  # 예약 고유키
    userKey: Optional[int] = None  # 사용자 키
    PhoneNumber: Optional[str] = None  # 핸드폰번호
    Name: Optional[str] = None  # 이름
    Age: Optional[int] = None  # 나이
    Gender: Optional[str] = None  # 성별
    Scalp_FrontHairLine: Optional[bytes] = None  #
    Scalp_FrontCenter: Optional[bytes] = None  #
    Scalp_Center: Optional[bytes] = None  #
    Scalp_RightHairLine: Optional[bytes] = None  #
    Scalp_Back: Optional[bytes] = None  #
    Scalp_LeftHairLine: Optional[bytes] = None  #
    Hair_Root: Optional[bytes] = None  #
    Hair_Mid: Optional[bytes] = None  #
    Hair_Tips: Optional[bytes] = None  #
    create_dt: Optional[datetime] = None  # 생성일자
    update_dt: Optional[datetime] = None  # 업데이트 일자


class HairImageSchema(HairImagePostRequestSchema):
    idx: int


class HairImageResponseSchema(HairImageSchema):
    idx: Optional[int]
    total_count: Optional[int] = 0  # 전체 개수
