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


class SkinVapometer(EntityMeta):
    __tablename__ = "tbM_Vapometer"  #
    idx = Column(Integer)
    surveyNo = Column(Integer)  # 고유번호
    userKey = Column(Integer)  # 사용자 키
    C_Left = Column(String(50))  # 좌측 볼
    C_Right = Column(String(50))  # 우측 볼
    create_dt = Column(DateTime, default=datetime.now())  # 생성일

    PrimaryKeyConstraint(idx)
