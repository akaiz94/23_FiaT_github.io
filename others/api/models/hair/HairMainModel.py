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


class HairMain(EntityMeta):
    __tablename__ = "tbHair_ScalpType_Main"  # 두피타입 메인
    idx = Column(Integer)
    surveyNo = Column(Integer)  # 예약 고유키
    userKey = Column(Integer)  # 사용자 키
    PhoneNumber = Column(String(50))  # 핸드폰번호
    Name = Column(String(50))  # 이름
    Age = Column(Integer)  # 나이
    Birthday = Column(String(50))  # 생년월일
    Gender = Column(String(50))  # 성별
    ScalpType_Nor = Column(Integer)  # 양호
    ScalpType_Oily = Column(Integer)  # 지성
    ScalpType_Ato = Column(Integer)  # 아토피성
    ScalpType_Trb = Column(Integer)  # 트러블성
    ScalpType_Dry = Column(Integer)  # 건성
    ScalpType_Sen = Column(Integer)  # 민감성
    ScalpType_Seb = Column(Integer)  # 지루성
    ScalpType_Ddan = Column(Integer)  # 건성비듬성
    ScalpType_Odan = Column(Integer)  # 지성비듬성
    ScalpType_Unknown = Column(Integer)  # x1
    HairlossType_Basic = Column(String(200))  # 탈모유형_기본
    HairlossType_Center = Column(String(50))  # 탈모유형_정수리
    HairlossType_FrontCenter = Column(String(50))  # 탈모유형_앞 중앙
    Haircondition_Type = Column(String(50))  # *
    Haircondition_Root = Column(String(50))  # 헤어컨디선_모근
    Haircondition_Mid = Column(String(50))  # 헤어컨디선_모발중간
    Haircondition_Tips = Column(String(50))  # 헤어컨디선_모발끝
    create_dt = Column(DateTime, default=datetime.now())  # 생성일자
    update_dt = Column(DateTime, default=datetime.now(), onupdate=datetime.now())  # 업데이트 일자
    # deleted_at = Column(DateTime, nullable=True) # 삭제일

    PrimaryKeyConstraint(idx)
