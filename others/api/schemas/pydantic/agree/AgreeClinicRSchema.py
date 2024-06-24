from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class AgreeClinicRPostRequestSchema(BaseModel):
    visitkey: Optional[int] = None  # 예약 고유키
    surveyNo: Optional[int] = None  # 설문 고유번호
    surveyDate: Optional[str] = None  # 설문 일자
    userKey: Optional[int] = None  # 사용자 키
    PartptName: Optional[str] = None  # 핸드폰번호
    LegalRept: Optional[str] = None  # 미사용
    # PartptSignature: Optional[bytes] = None  # 서명이미지
    # LegalReptSianature: Optional[bytes] = None  # 서명이미지
    AgreementDate1: Optional[str] = None  # 동의날짜_1
    ResearcherName: Optional[str] = None  # 연구원성명
    # ResearcherSignature: Optional[bytes] = None  # 연구원서명
    AgreementDate2: Optional[str] = None  # 동의날짜_2
    PartptAgree1: Optional[str] = None  # PartptAgree1
    PartptAgree2: Optional[str] = None  # PartptAgree2
    PartptAgree3: Optional[str] = None  # PartptAgree3
    PartptAgree4: Optional[str] = None  # PartptAgree4
    LegalRept1: Optional[str] = None  # LegalRept1
    LegalRept2: Optional[str] = None  # LegalRept2
    LegalRept3: Optional[str] = None  # LegalRept3
    LegalRept4: Optional[str] = None  # LegalRept4
    managerDept1: Optional[str] = None  # 담당부서_1
    managerName1: Optional[str] = None  # 담당연구원_1
    managerPhone1: Optional[str] = None  # 휴대폰번호_1
    managerEmail1: Optional[str] = None  # 이메일_1
    managerDept2: Optional[str] = None  # 담당부서_2
    managerName2: Optional[str] = None  # 담당연구원_2
    managerPhone2: Optional[str] = None  # 휴대폰번호_2
    managerEmail2: Optional[str] = None  # 이메일_2
    create_dt: Optional[datetime] = None  # 등록일
    update_dt: Optional[datetime] = None  # 수정일
    gene_agreement_yn: Optional[str] = None  # 유전자동의여부


class AgreeClinicRSchema(AgreeClinicRPostRequestSchema):
    visitkey: int


class AgreeClinicRResponseSchema(AgreeClinicRSchema):
    visitkey: Optional[int]
    total_count: Optional[int] = 0  # 전체 개수
