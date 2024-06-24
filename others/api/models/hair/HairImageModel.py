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


class HairImage(EntityMeta):
    __tablename__ = "tbHair_ScalpType_Images"  # 헤어 이미지
    idx = Column(Integer)
    surveyNo = Column(Integer)  # 예약 고유키
    userKey = Column(Integer)  # 사용자 키
    PhoneNumber = Column(String(50))  # 핸드폰번호
    Name = Column(String(50))  # 이름
    Age = Column(Integer)  # 나이
    Gender = Column(String(50))  # 성별
    Scalp_FrontHairLine = Column(LargeBinary)  #
    Scalp_FrontCenter = Column(LargeBinary)  #
    Scalp_Center = Column(LargeBinary)  #
    Scalp_RightHairLine = Column(LargeBinary)  #
    Scalp_Back = Column(LargeBinary)  #
    Scalp_LeftHairLine = Column(LargeBinary)  #
    Hair_Root = Column(LargeBinary)  #
    Hair_Mid = Column(LargeBinary)  #
    Hair_Tips = Column(LargeBinary)  #
    create_dt = Column(DateTime, default=datetime.now())  # 생성일자
    update_dt = Column(DateTime, default=datetime.now(), onupdate=datetime.now())  # 업데이트 일자

    PrimaryKeyConstraint(idx)
