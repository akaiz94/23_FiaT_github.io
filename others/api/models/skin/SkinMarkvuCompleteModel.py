from datetime import datetime

from sqlalchemy import (
    Column,
    Integer, Float,
    PrimaryKeyConstraint,
    String,
    Float, DateTime
)

from models.BaseModel import EntityMeta


class SkinMarkvuComplete(EntityMeta):
    __tablename__ = "tbM_MarkVu_Complete"  # 기기_마크뷰_분석
    idx = Column(Integer)
    surveyNo = Column(Integer)  # 고유번호
    userkey = Column(Integer)  # 사용자 키
    DBID = Column(Float)  # 마크뷰DB 식별키
    # CaptureDate = Column(DateTime, default=datetime.now())  # 측정날짜
    Side = Column(String(255))  # Side
    Complete = Column(String(255))  # 성공여부

    PrimaryKeyConstraint(idx)
