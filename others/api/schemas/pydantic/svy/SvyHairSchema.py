from datetime import datetime

from typing import Optional

from pydantic import BaseModel


class SvyHairPostRequestSchema(BaseModel):
    surveyNo: Optional[int] = None  # 설문 고유번호
    surveyDate: Optional[str] = None  # 설문 일자
    userkey: Optional[int] = None  # 사용자 키
    qyn: Optional[str] = None  # 상태
    s1_1: Optional[str] = None  # 두피고민을 선택
    s1_2: Optional[str] = None  # 두피고민을 선택
    s1_3: Optional[str] = None  # 두피고민을 선택
    s1_4: Optional[str] = None  # 두피고민을 선택
    s1_5: Optional[str] = None  # 두피고민을 선택
    s1_6: Optional[str] = None  # 두피고민을 선택
    s1_7: Optional[str] = None  # 두피고민을 선택
    s1_first: Optional[str] = None  # 1순위 고민
    s2_1_1: Optional[str] = None  # 두피타입
    s2_1_2: Optional[str] = None  # 두피타입
    s2_1_3: Optional[str] = None  # 두피타입
    s2_2: Optional[str] = None  # 두피타입
    s2_3: Optional[str] = None  # 두피타입
    s2_4: Optional[str] = None  # 두피타입
    s2_5: Optional[str] = None  # 두피타입
    s2_6: Optional[str] = None  # 두피타입
    s2_7: Optional[str] = None  # 두피타입
    s2_8: Optional[str] = None  # 두피타입
    s2_9: Optional[str] = None  # 두피타입
    s2_10: Optional[str] = None  # 두피타입
    s2_11: Optional[str] = None  # 두피타입
    s2_12_1: Optional[str] = None  # 두피타입
    s2_12_2: Optional[str] = None  # 두피타입
    s2_12_3: Optional[str] = None  # 두피타입
    s2_12_4: Optional[str] = None  # 두피타입
    s2_12_5: Optional[str] = None  # 두피타입
    s2_12_6: Optional[str] = None  # 두피타입
    s2_12_7: Optional[str] = None  # 두피타입
    s2_12_8: Optional[str] = None  # 두피타입
    s2_12_9: Optional[str] = None  # 두피타입
    s3_1_1: Optional[str] = None  # 모발
    s3_1_2: Optional[str] = None  # 모발
    s3_1_3: Optional[str] = None  # 모발
    s3_1_4: Optional[str] = None  # 모발
    s3_1_5: Optional[str] = None  # 모발
    s3_1_6: Optional[str] = None  # 모발
    s3_1_7: Optional[str] = None  # 모발
    s3_1_8: Optional[str] = None  # 모발
    s3_1_first: Optional[str] = None  # 모발고민 1순위
    s3_2: Optional[str] = None  # 모발
    m_markvu_yn: Optional[str] = None  # 마크뷰 저장 YN
    m_antera_yn: Optional[str] = None  # 안테라 저장 YN
    m_cnk_01_yn: Optional[str] = None  #
    m_cnk_01_yn: Optional[str] = None  #
    create_dt: Optional[datetime] = None  #
    update_dt: Optional[datetime] = None  #


class SvyHairSchema(SvyHairPostRequestSchema):
    surveyNo: int


class SvyHairResponseSchema(SvyHairSchema):
    surveyNo: Optional[int]
    total_count: Optional[int] = 0  # 전체 개수
