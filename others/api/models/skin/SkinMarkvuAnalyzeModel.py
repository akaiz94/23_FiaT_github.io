from datetime import datetime
from sqlalchemy import (
    Column,
    Integer, Float,
    PrimaryKeyConstraint,
    String,
    DateTime,
    Float
)

from models.BaseModel import EntityMeta


class SkinMarkvuAnalyze(EntityMeta):
    __tablename__ = "tbM_MarkVu_Analyze"  # 기기_마크뷰
    idx = Column(Integer)
    surveyNo = Column(Integer)  # 고유번호
    userkey = Column(Integer)  # 사용자 키
    DBID = Column(Float)  # 마크뷰DB 식별키
    CaptureDate = Column(DateTime, default=datetime.now())  # 등록일  # 측정날짜
    Side = Column(String(255))  # Side
    Gubun = Column(String(255))  # Gubun
    D0 = Column(Float)  # D0
    D1 = Column(Float)  # D1
    D2 = Column(Float)  # D2
    D3 = Column(Float)  # D3
    D4 = Column(Float)  # D4
    D5 = Column(Float)  # D5
    D6 = Column(Float)  # D6
    D7 = Column(Float)  # D7

    PrimaryKeyConstraint(idx)
