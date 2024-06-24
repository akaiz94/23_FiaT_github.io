from datetime import datetime

from sqlalchemy import (
    Column,
    Integer, Float,
    PrimaryKeyConstraint,
    String, DateTime,
)

from models.BaseModel import EntityMeta


class SkinCutometer(EntityMeta):
    __tablename__ = "tbM_CNK_Cutometer"  # 기기_큐토미터
    idx = Column(Integer)
    surveyNo = Column(Integer)  # 고유번호
    userKey = Column(Integer)  # 사용자키
    eye_area = Column(String)  # 눈가피부측정
    cheek = Column(String)  # 눈가주변피부측정
    create_dt = Column(DateTime, default=datetime.now())  # 생성일
    update_dt = Column(DateTime, default=datetime.now(), onupdate=datetime.now())  # 수정일

    PrimaryKeyConstraint(idx)
