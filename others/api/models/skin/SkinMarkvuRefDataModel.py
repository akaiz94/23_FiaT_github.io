from sqlalchemy import (
    Column,
    Integer,PrimaryKeyConstraint,
    String,
    Float
)

from models.BaseModel import EntityMeta


class SkinMarkvuRefData(EntityMeta):
    __tablename__ = "tbM_MarkVu_RefData"  #
    idx = Column(Integer)
    Gubun = Column(String(255))  # 고유번호
    Age = Column(Float)  # 사용자 키
    Sex = Column(String(255))  # 마크뷰DB 식별키
    F0 = Column(Float)  # 측정날짜
    F1 = Column(Float)  # F1
    F2 = Column(Float)  # 성공여부
    F3 = Column(Float)  # F3
    F4 = Column(Float)  # F4
    F5 = Column(Float)  # F5
    F6 = Column(Float)  # F6
    F7 = Column(Float)  # F7
    iAvg = Column(Float)  # iAvg
    Side = Column(String(255))  # Side
    # 필드14 = Column(String(255))  # 필드14

    PrimaryKeyConstraint(Gubun)
