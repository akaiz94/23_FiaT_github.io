from datetime import datetime

from typing import Optional

from pydantic import BaseModel


class SkinResultPostRequestSchema(BaseModel):
    surveyNo: Optional[int] = None  # 설문 고유번호
    surveyDate: Optional[str] = None  # 설문 일자
    userKey: Optional[int] = None  # 사용자 키
    name: Optional[str] = None  # 이름
    skin_score: Optional[int] = None  # 피부점수
    skin_gomin: Optional[str] = None  # 피부고민
    IsComplexity: Optional[str] = None  # 복합성여부
    t_zone_result: Optional[str] = None  # T존결과
    t_zone_position_num: Optional[int] = None  # T존위치
    u_zone_result: Optional[str] = None  # U존결과
    u_zone_position_num: Optional[int] = None  # U존위치
    fizpatrick_color_point: Optional[int] = None  # Fitzpatrick 척도
    solution_type_number: Optional[str] = None  # 솔루션_타입_번호
    sensitive_type_number: Optional[str] = None  # 민감도_타입_번호
    #specialtip_img: Optional[bytes] = None  # 분석결과페이지_메모_이미지1
    #specialtip_stoke_img: Optional[bytes] = None  # 분석결과페이지_메모_이미지2
    specialtip_memo: Optional[str] = None  # 분석결과페이지_메모_이미지3
    specialtip_memo2: Optional[str] = None
    specialtip_memo3: Optional[str] = None
    manager_value: Optional[str] = None  # 담당 연구원
    create_dt: Optional[datetime] = None  # 생성일자
    update_dt: Optional[datetime] = None  # 업데이트 일자


class SkinResultSchema(SkinResultPostRequestSchema):
    idx: int


class SkinResultResponseSchema(SkinResultSchema):
    idx: Optional[int]
    total_count: Optional[int] = 0  # 전체 개수
