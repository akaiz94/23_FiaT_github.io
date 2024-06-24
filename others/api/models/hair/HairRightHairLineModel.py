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


class HairRightHairLine(EntityMeta):
    __tablename__ = "tbHair_ScalpType_RightHairLine"  # 우측 헤어라인
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
    ScalpType_Unknown = Column(Integer)  # *
    Thickness = Column(Float(0))  # 굵기
    Density = Column(Float(0))  # 밀도
    Thickness_mean = Column(Float(0))  # 굴기 중간값
    Density_mean = Column(Float(0))  # 밀도 중간값
    create_dt = Column(DateTime, default=datetime.now())  # 생성일자
    update_dt = Column(DateTime, default=datetime.now(), onupdate=datetime.now())  # 업데이트 일자
    # deleted_at = Column(DateTime, nullable=True) # 삭제일

    PrimaryKeyConstraint(idx)
