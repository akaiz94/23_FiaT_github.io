from datetime import datetime

from typing import Optional

from pydantic import BaseModel


class HairResultPostRequestSchema(BaseModel):
    surveyNo: Optional[int] = None  #
    surveyDate: Optional[str] = None  # (사용 안함)
    userKey: Optional[int] = None  #
    name: Optional[str] = None  #
    skin_score: Optional[int] = None  # (사용 안함)
    skin_gomin: Optional[str] = None  # (사용 안함)
    IsComplexity: Optional[str] = None  # (사용 안함)
    t_zone_result: Optional[str] = None  # (사용 안함)
    t_zone_position_num: Optional[int] = None  # (사용 안함)
    u_zone_result: Optional[str] = None  # (사용 안함)
    u_zone_position_num: Optional[int] = None  # (사용 안함)
    fizpatrick_color_point: Optional[int] = None  # (사용 안함)
    solution_type_number: Optional[str] = None  # (사용 안함)
    sensitive_type_number: Optional[str] = None  # (사용 안함)
    #specialtip_img: Optional[bytes] = None  # 분석결과페이지_메모_이미지1
    #specialtip_stoke_img: Optional[bytes] = None  # 분석결과페이지_메모_이미지2
    specialtip_memo: Optional[str] = None  # 분석결과페이지_메모_이미지3
    specialtip_memo2: Optional[str] = None
    specialtip_memo3: Optional[str] = None
    manager_value: Optional[str] = None  # 담당 연구원
    create_dt: Optional[datetime] = None  # 생성일자
    update_dt: Optional[datetime] = None  # 업데이트 일자


class HairResultSchema(HairResultPostRequestSchema):
    idx: int


class HairResultResponseSchema(HairResultSchema):
    idx: Optional[int]
    total_count: Optional[int] = 0  # 전체 개수
