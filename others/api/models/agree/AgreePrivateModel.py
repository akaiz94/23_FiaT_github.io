from datetime import datetime

from pyodbc import Binary
from sqlalchemy import (
    Column,
    Integer, Float,
    PrimaryKeyConstraint,
    String,
    DateTime,
    LargeBinary, BLOB
)
from models.BaseModel import EntityMeta


class AgreePrivate(EntityMeta):
    __tablename__ = "tbAgreement_Private"  # tbAgreement_Private

    visitkey = Column(Integer)  # 예약 고유키
    surveyNo = Column(Integer)  # 설문 고유번호
    surveyDate = Column(String(20))  # 설문 일자
    userKey = Column(Integer)  # 사용자 키
    PartptName = Column(String(50))  # 고객명
    LegalRept = Column(String(50))  # 미사용
    MobilePhone = Column(String(50))  # 핸드폰번호
    PartptSignature = Column(LargeBinary)  # 서명이미지
    LegalReptSianature = Column(LargeBinary)  # 서명이미지
    AgreementDate = Column(String(20))  # 동의날짜
    PartptAgree1 = Column(String(1))  # PartptAgree1
    PartptAgree2 = Column(String(1))  # PartptAgree2
    PartptAgree3 = Column(String(1))  # PartptAgree3
    LegalRept1 = Column(String(1))  # LegalRept1
    LegalRept2 = Column(String(1))  # LegalRept2
    LegalRept3 = Column(String(1))  # LegalRept3
    create_dt = Column(DateTime, default=datetime.now())  # 등록일
    update_dt = Column(DateTime, default=datetime.now(), onupdate=datetime.now())  # 수정일

    PrimaryKeyConstraint(visitkey)
