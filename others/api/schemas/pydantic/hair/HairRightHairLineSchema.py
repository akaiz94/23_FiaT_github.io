from datetime import datetime

from typing import Optional

from pydantic import BaseModel


class HairRightHairLinePostRequestSchema(BaseModel):
    surveyNo: Optional[int] = None  # 예약 고유키
    userKey: Optional[int] = None  # 사용자 키
    PhoneNumber: Optional[str] = None  # 핸드폰번호
    Name: Optional[str] = None  # 이름
    Age: Optional[int] = None  # 나이
    Birthday: Optional[str] = None  # 생년월일
    Gender: Optional[str] = None  # 성별
    ScalpType_Nor: Optional[int] = None  # 양호
    ScalpType_Oily: Optional[int] = None  # 지성
    ScalpType_Ato: Optional[int] = None  # 아토피성
    ScalpType_Trb: Optional[int] = None  # 트러블성
    ScalpType_Dry: Optional[int] = None  # 건성
    ScalpType_Sen: Optional[int] = None  # 민감성
    ScalpType_Seb: Optional[int] = None  # 지루성
    ScalpType_Ddan: Optional[int] = None  # 건성비듬성
    ScalpType_Odan: Optional[int] = None  # 지성비듬성
    ScalpType_Unknown: Optional[int] = None  # *
    Thickness: Optional[float] = None  # 굵기
    Density: Optional[float] = None  # 밀도
    Thickness_mean: Optional[float] = None  # 굴기 중간값
    Density_mean: Optional[float] = None  # 밀도 중간값
    create_dt: Optional[datetime] = None  # 생성일자
    update_dt: Optional[datetime] = None  # 업데이트 일자


class HairRightHairLineSchema(HairRightHairLinePostRequestSchema):
    idx: int


class HairRightHairLineResponseSchema(HairRightHairLineSchema):
    idx: Optional[int]
    total_count: Optional[int] = 0  # 전체 개수
