from datetime import datetime
from sqlalchemy import (
    Column,
    Integer, Float,
    PrimaryKeyConstraint,
    String,
    Float, DateTime
)

from models.BaseModel import EntityMeta


class SkinMarkvuCustinfo(EntityMeta):
    __tablename__ = "tbM_MarkVu_CustInfo"  #
    idx = Column(Integer)
    surveyNo = Column(Integer)  # 고유번호
    userkey = Column(Integer)  # 사용자 키
    DBID = Column(Float)  # 마크뷰DB 식별키
    CustName = Column(String(255))  # 고객명
    Sex = Column(String(255))  # 성별
    BirthDay = Column(String(255))  # 생년월일
    PatNo = Column(String(255))  # PatNo
    Phone = Column(String(255))  # 핸드폰번호
    AsistName = Column(String(255))  # 상담사명
    Care = Column(String(255))  # Care
    Etc = Column(String(255))  # Etc
    Z1X = Column(Float)  # Z1X
    Z1Y = Column(Float)  # Z1Y
    Z1W = Column(Float)  # Z1W
    Z1H = Column(Float)  # Z1H
    Z2X = Column(Float)  # Z2X
    Z2Y = Column(Float)  # Z2Y
    Z2W = Column(Float)  # Z2W
    Z2H = Column(Float)  # Z2H
    Z3X = Column(Float)  # Z3X
    Z3Y = Column(Float)  # Z3Y
    Z3W = Column(Float)  # Z3W
    Z3H = Column(Float)  # Z3H
    Z4X = Column(Float)  # Z4X
    Z4Y = Column(Float)  # Z4Y
    Z4W = Column(Float)  # Z4W
    Z4H = Column(Float)  # Z4H
    Z5X = Column(Float)  # Z5X
    Z5Y = Column(Float)  # Z5Y
    Z5W = Column(Float)  # Z5W
    Z5H = Column(Float)  # Z5H
    Z6X = Column(Float)  # Z6X
    Z6Y = Column(Float)  # Z6Y
    Z6W = Column(Float)  # Z6W
    Z6H = Column(Float)  # Z6H
    Z7X = Column(Float)  # Z7X
    Z7Y = Column(Float)  # Z7Y
    Z7W = Column(Float)  # Z7W
    Z7H = Column(Float)  # Z7H
    Z8X = Column(Float)  # Z8X
    Z8Y = Column(Float)  # Z8Y
    Z8W = Column(Float)  # Z8W
    Z8H = Column(Float)  # Z8H
    L1X = Column(Float)  # L1X
    L1Y = Column(Float)  # L1Y
    L1W = Column(Float)  # L1W
    L1H = Column(Float)  # L1H
    L2X = Column(Float)  # L2X
    L2Y = Column(Float)  # L2Y
    L2W = Column(Float)  # L2W
    L2H = Column(Float)  # L2H
    L3X = Column(Float)  # L3X
    L3Y = Column(Float)  # L3Y
    L3W = Column(Float)  # L3W
    L3H = Column(Float)  # L3H
    L4X = Column(Float)  # L4X
    L4Y = Column(Float)  # L4Y
    L4W = Column(Float)  # L4W
    L4H = Column(Float)  # L4H
    R1X = Column(Float)  # R1X
    R1Y = Column(Float)  # R1Y
    R1W = Column(Float)  # R1W
    R1H = Column(Float)  # R1H
    R2X = Column(Float)  # R2X
    R2Y = Column(Float)  # R2Y
    R2W = Column(Float)  # R2W
    R2H = Column(Float)  # R2H
    R3X = Column(Float)  # R3X
    R3Y = Column(Float)  # R3Y
    R3W = Column(Float)  # R3W
    R3H = Column(Float)  # R3H
    R4X = Column(Float)  # R4X
    R4Y = Column(Float)  # R4Y
    R4W = Column(Float)  # R4W
    R4H = Column(Float)  # R4H
    create_dt = Column(DateTime, default=datetime.now())  # create_dt
    update_dt = Column(DateTime)  # updtea_dt

    PrimaryKeyConstraint(idx)
