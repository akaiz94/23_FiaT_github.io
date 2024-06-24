from datetime import datetime

from sqlalchemy import (
    Column,
    Integer, Float,
    PrimaryKeyConstraint,
    String,
    Float, DateTime
)

from models.BaseModel import EntityMeta


class SkinConcern(EntityMeta):
    __tablename__ = "tbSkinConcern"  #
    idx = Column(Integer)
    surveyNo = Column(Integer)  # 설문 고유번호
    userKey = Column(Integer)  # 사용자 키
    name = Column(String(50))  # 고객명
    pore = Column(Float)  # 모공
    wrinkle = Column(Float)  # 주름
    futurewrinkles = Column(Float)  # 미래주름
    pigmentation = Column(Float)  # 색소침착
    melanin = Column(Float)  # 멜라닌
    darkcircles = Column(Float)  # 다크서클
    transdermal = Column(Float)  # 경피수분손실도
    redness = Column(Float)  # 붉은기
    porphyrin = Column(Float)  # 포피린
    elasticity = Column(Float)  # 탄력
    tZone_Moisture = Column(Float)  # t좀 수분
    tZone_Oilskin = Column(Float)  # t존 유분
    uZone_Moisture = Column(Float)  # u존 수분
    uZone_Oilskin = Column(Float)  # u존 유분
    create_dt = Column(DateTime, default=datetime.now())  # 생성일자
    update_dt = Column(String)  # 업데이트 일자

    PrimaryKeyConstraint(idx)
