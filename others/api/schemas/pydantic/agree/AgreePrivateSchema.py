from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class AgreePrivatePostRequestSchema(BaseModel):
    visitkey: Optional[int] = None  # 예약 고유키
    surveyNo: Optional[int] = None  # 설문 고유번호
    surveyDate: Optional[str] = None  # 설문 일자
    userKey: Optional[int] = None  # 사용자 키
    PartptName: Optional[str] = None  # 고객명
    LegalRept: Optional[str] = None  # 미사용
    MobilePhone: Optional[str] = None  # 핸드폰번호
    # PartptSignature: Optional[bytes] = None  # 서명이미지 : Optional[bytes]
    # LegalReptSianature: Optional[bytes] = None  # 서명이미지 : Optional[bytes]
    AgreementDate: Optional[str] = None  # 동의날짜
    PartptAgree1: Optional[str] = None  # PartptAgree1
    PartptAgree2: Optional[str] = None  # PartptAgree2
    PartptAgree3: Optional[str] = None  # PartptAgree3
    LegalRept1: Optional[str] = None  # LegalRept1
    LegalRept2: Optional[str] = None  # LegalRept2
    LegalRept3: Optional[str] = None  # LegalRept3
    create_dt: Optional[datetime] = None  # 등록일
    update_dt: Optional[datetime] = None  # 수정일


class AgreePrivateSchema(AgreePrivatePostRequestSchema):
    visitkey: int


class AgreePrivateResponseSchema(AgreePrivateSchema):
    visitkey: Optional[int]
    total_count: Optional[int] = 0  # 전체 개수
