from datetime import datetime
from sqlalchemy import (
    Column,
    Integer, Float,
    PrimaryKeyConstraint,
    String,
    DateTime,
    LargeBinary
)

from models.BaseModel import EntityMeta


class AgreeClinicR(EntityMeta):
    __tablename__ = "tbAgreement_ClinicR"  # tbAgreement_ClinicR

    visitkey = Column(Integer)  # 예약 고유키
    surveyNo = Column(Integer)  # 설문 고유번호
    surveyDate = Column(String(20))  # 설문 일자
    userKey = Column(Integer)  # 사용자 키
    PartptName = Column(String(50))  # 핸드폰번호
    LegalRept = Column(String(50))  # 미사용
    PartptSignature = Column(LargeBinary)  # 서명이미지
    LegalReptSianature = Column(LargeBinary)  # 서명이미지
    AgreementDate1 = Column(String(20))  # 동의날짜_1
    ResearcherName = Column(String(50))  # 연구원성명
    ResearcherSignature = Column(LargeBinary)  # 연구원서명
    AgreementDate2 = Column(String(20))  # 동의날짜_2
    PartptAgree1 = Column(String(1))  # PartptAgree1
    PartptAgree2 = Column(String(1))  # PartptAgree2
    PartptAgree3 = Column(String(1))  # PartptAgree3
    PartptAgree4 = Column(String(1))  # PartptAgree4
    LegalRept1 = Column(String(1))  # LegalRept1
    LegalRept2 = Column(String(1))  # LegalRept2
    LegalRept3 = Column(String(1))  # LegalRept3
    LegalRept4 = Column(String(1))  # LegalRept4
    managerDept1 = Column(String(50))  # 담당부서_1
    managerName1 = Column(String(50))  # 담당연구원_1
    managerPhone1 = Column(String(50))  # 휴대폰번호_1
    managerEmail1 = Column(String(50))  # 이메일_1
    managerDept2 = Column(String(50))  # 담당부서_2
    managerName2 = Column(String(50))  # 담당연구원_2
    managerPhone2 = Column(String(50))  # 휴대폰번호_2
    managerEmail2 = Column(String(50))  # 이메일_2
    create_dt = Column(DateTime, default=datetime.now())  # 등록일
    update_dt = Column(DateTime, default=datetime.now(), onupdate=datetime.now())  # 수정일
    gene_agreement_yn = Column(String(1))  # 유전자동의여부

    PrimaryKeyConstraint(visitkey)
