from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class SkinConcernPostRequestSchema(BaseModel):
    surveyNo: Optional[int] = None  # 설문 고유번호
    userKey: Optional[int] = None  # 사용자 키
    name: Optional[str] = None  # 고객명
    pore: Optional[float] = None  # 모공
    wrinkle: Optional[float] = None  # 주름
    futurewrinkles: Optional[float] = None  # 미래주름
    pigmentation: Optional[float] = None  # 색소침착
    melanin: Optional[float] = None  # 멜라닌
    darkcircles: Optional[float] = None  # 다크서클
    transdermal: Optional[float] = None  # 경피수분손실도
    redness: Optional[float] = None  # 붉은기
    porphyrin: Optional[float] = None  # 포피린
    elasticity: Optional[float] = None  # 탄력
    tZone_Moisture: Optional[float] = None  # t좀 수분
    tZone_Oilskin: Optional[float] = None  # t존 유분
    uZone_Moisture: Optional[float] = None  # u존 수분
    uZone_Oilskin: Optional[float] = None  # u존 유분
    create_dt: Optional[datetime] = None  # 생성일자
    update_dt: Optional[datetime] = None  # 업데이트 일자


class SkinConcernSchema(SkinConcernPostRequestSchema):
    idx: int


class SkinConcernResponseSchema(SkinConcernSchema):
    idx: Optional[int]
    total_count: Optional[int] = 0  # 전체 개수
