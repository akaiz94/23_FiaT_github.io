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


class MbManagerLog(EntityMeta):
    __tablename__ = "tbManagerLogs"  # 관리자 실행로그

    LogKey = Column(Integer)  # 로그키
    ProcessType = Column(String(50))  # 실행타입
    ProcessCode = Column(Integer)  # 실행코드
    ProcessName = Column(String(255))  # 실행이름
    Params = Column(String(200))  # 정보
    RegKey = Column(Integer)  # 등록자
    RegDate = Column(DateTime, default=datetime.now())  # 등록일

    PrimaryKeyConstraint(LogKey)
