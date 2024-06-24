from datetime import datetime

from typing import Optional

from pydantic import BaseModel


class SkinMarkvuCustinfoPostRequestSchema(BaseModel):
    surveyNo: Optional[int] = None  # 고유번호
    userkey: Optional[int] = None  # 사용자 키
    DBID: Optional[float] = None  # 마크뷰DB 식별키
    CustName: Optional[str] = None  # 고객명
    Sex: Optional[str] = None  # 성별
    BirthDay: Optional[str] = None  # 생년월일
    PatNo: Optional[str] = None  # PatNo
    Phone: Optional[str] = None  # 핸드폰번호
    AsistName: Optional[str] = None  # 상담사명
    Care: Optional[str] = None  # Care
    Etc: Optional[str] = None  # Etc
    Z1X: Optional[float] = None  # Z1X
    Z1Y: Optional[float] = None  # Z1Y
    Z1W: Optional[float] = None  # Z1W
    Z1H: Optional[float] = None  # Z1H
    Z2X: Optional[float] = None  # Z2X
    Z2Y: Optional[float] = None  # Z2Y
    Z2W: Optional[float] = None  # Z2W
    Z2H: Optional[float] = None  # Z2H
    Z3X: Optional[float] = None  # Z3X
    Z3Y: Optional[float] = None  # Z3Y
    Z3W: Optional[float] = None  # Z3W
    Z3H: Optional[float] = None  # Z3H
    Z4X: Optional[float] = None  # Z4X
    Z4Y: Optional[float] = None  # Z4Y
    Z4W: Optional[float] = None  # Z4W
    Z4H: Optional[float] = None  # Z4H
    Z5X: Optional[float] = None  # Z5X
    Z5Y: Optional[float] = None  # Z5Y
    Z5W: Optional[float] = None  # Z5W
    Z5H: Optional[float] = None  # Z5H
    Z6X: Optional[float] = None  # Z6X
    Z6Y: Optional[float] = None  # Z6Y
    Z6W: Optional[float] = None  # Z6W
    Z6H: Optional[float] = None  # Z6H
    Z7X: Optional[float] = None  # Z7X
    Z7Y: Optional[float] = None  # Z7Y
    Z7W: Optional[float] = None  # Z7W
    Z7H: Optional[float] = None  # Z7H
    Z8X: Optional[float] = None  # Z8X
    Z8Y: Optional[float] = None  # Z8Y
    Z8W: Optional[float] = None  # Z8W
    Z8H: Optional[float] = None  # Z8H
    L1X: Optional[float] = None  # L1X
    L1Y: Optional[float] = None  # L1Y
    L1W: Optional[float] = None  # L1W
    L1H: Optional[float] = None  # L1H
    L2X: Optional[float] = None  # L2X
    L2Y: Optional[float] = None  # L2Y
    L2W: Optional[float] = None  # L2W
    L2H: Optional[float] = None  # L2H
    L3X: Optional[float] = None  # L3X
    L3Y: Optional[float] = None  # L3Y
    L3W: Optional[float] = None  # L3W
    L3H: Optional[float] = None  # L3H
    L4X: Optional[float] = None  # L4X
    L4Y: Optional[float] = None  # L4Y
    L4W: Optional[float] = None  # L4W
    L4H: Optional[float] = None  # L4H
    R1X: Optional[float] = None  # R1X
    R1Y: Optional[float] = None  # R1Y
    R1W: Optional[float] = None  # R1W
    R1H: Optional[float] = None  # R1H
    R2X: Optional[float] = None  # R2X
    R2Y: Optional[float] = None  # R2Y
    R2W: Optional[float] = None  # R2W
    R2H: Optional[float] = None  # R2H
    R3X: Optional[float] = None  # R3X
    R3Y: Optional[float] = None  # R3Y
    R3W: Optional[float] = None  # R3W
    R3H: Optional[float] = None  # R3H
    R4X: Optional[float] = None  # R4X
    R4Y: Optional[float] = None  # R4Y
    R4W: Optional[float] = None  # R4W
    R4H: Optional[float] = None  # R4H
    create_dt: Optional[datetime] = None  # create_dt
    updtea_dt: Optional[str] = None  # updtea_dt


class SkinMarkvuCustinfoSchema(SkinMarkvuCustinfoPostRequestSchema):
    idx: int


class SkinMarkvuCustinfoResponseSchema(SkinMarkvuCustinfoSchema):
    idx: Optional[int]
    total_count: Optional[int] = 0  # 전체 개수
