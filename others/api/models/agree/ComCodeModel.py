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


class ComCode(EntityMeta):
    __tablename__ = "tbBasicCode"  # 프로그램별코드

    Code = Column(String(8))  # Code
    GrpCode = Column(String(3))  # GrpCode
    MidCode = Column(String(3))  # MidCode
    DetCode = Column(String(3))  # DetCode
    Gubun = Column(String(2))  # Gubun
    CodeName = Column(String(50))  # CodeName
    Comment = Column(String(50))  # Comment
    ParentCode = Column(String(8))  # ParentCode
    IsGlobalVariable = Column(Integer)  # IsGlobalVariable
    IsWorkStatusCode = Column(String(8))  # IsWorkStatusCode
    WorkStartTime = Column(String(10))  # WorkStartTime
    WorkEndTime = Column(String(10))  # WorkEndTime

    PrimaryKeyConstraint(Code)
