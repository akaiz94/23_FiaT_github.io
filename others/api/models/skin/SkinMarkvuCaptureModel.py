from datetime import datetime

from sqlalchemy import (
    Column,
    Integer, Float,
    PrimaryKeyConstraint,
    String,
    Float, DateTime, LargeBinary
)

from models.BaseModel import EntityMeta


class SkinMarkvuCapture(EntityMeta):
    __tablename__ = "tbM_MarkVu_Capture"  # 기기_마크뷰_캡처(이미지)
    idx = Column(Integer)
    surveyNo = Column(Integer)  # 고유번호
    userkey = Column(Integer)  # 사용자 키
    DBID = Column(Float)  # 마크뷰DB 식별키
    # CaptureDate = Column(DateTime, default=datetime.now())  # 측정날짜
    LED = Column(String(255))  # LED
    Side = Column(String(255))  # Side
    FilePath = Column(String(255))  # FilePath
    MakeData = Column(String(255))  # MakeDate
    ImageData = Column(LargeBinary)  # ImageData

    PrimaryKeyConstraint(idx)
