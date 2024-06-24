from datetime import datetime

from typing import Optional

from pydantic import BaseModel


class SvySkinPostRequestSchema(BaseModel):
    surveyNo: Optional[int] = None  # 설문 고유번호
    surveyDate: Optional[str] = None  # 설문 일자
    userkey: Optional[int] = None  # 사용자 키
    qyn: Optional[str] = None  # 상태
    s1_1: Optional[str] = None  # 피부고민을 선택
    s1_2: Optional[str] = None  # 피부고민을 선택
    s1_3: Optional[str] = None  # 피부고민을 선택
    s1_4: Optional[str] = None  # 피부고민을 선택
    s1_5: Optional[str] = None  # 피부고민을 선택
    s1_6: Optional[str] = None  # 피부고민을 선택
    s1_7: Optional[str] = None  # 피부고민을 선택
    s1_8: Optional[str] = None  # 피부고민을 선택
    s1_9: Optional[str] = None  # 피부고민을 선택
    s1_10: Optional[str] = None  # 피부고민을 선택
    s1_11: Optional[str] = None  # 피부고민을 선택
    s1_12: Optional[str] = None  # 피부고민을 선택
    s1_first: Optional[str] = None  # 1순위 고민 text
    s1_second: Optional[str] = None  # 2순위 고민 text
    s2_1: Optional[str] = None  # 피부타입
    s2_2: Optional[str] = None  # 피부타입
    s2_3: Optional[str] = None  # 피부타입
    s2_4: Optional[str] = None  # 피부타입
    s3_1: Optional[str] = None  # 생활습관
    s3_2: Optional[str] = None  # 생활습관
    s3_3: Optional[str] = None  # 생활습관
    s3_4: Optional[str] = None  # 생활습관
    s3_5: Optional[str] = None  # 생활습관
    s3_6: Optional[str] = None  # 생활습관
    s3_7: Optional[str] = None  # (사용안함)
    s3_8: Optional[str] = None  # (사용안함)
    s3_9: Optional[str] = None  # (사용안함)
    s3_10: Optional[str] = None  # (사용안함)
    s3_11: Optional[str] = None  # (사용안함)
    s3_12: Optional[str] = None  # (사용안함)
    s4_1: Optional[str] = None  # 민감도
    s4_2: Optional[str] = None  # 민감도
    s4_3: Optional[str] = None  # 민감도
    s4_4: Optional[str] = None  # 민감도
    s4_5: Optional[str] = None  # 민감도
    s4_6: Optional[str] = None  # 민감도
    m_markvu_yn: Optional[str] = None  # 마크뷰 저장 YN
    m_antera_yn: Optional[str] = None  # 안테라 저장 YN
    m_cnk_01_yn: Optional[str] = None  #
    m_cnk_01_yn: Optional[str] = None  #
    create_dt: Optional[datetime] = None  #
    update_dt: Optional[datetime] = None  #


class SvySkinSchema(SvySkinPostRequestSchema):
    surveyNo: int


class SvySkinResponseSchema(SvySkinSchema):
    surveyNo: Optional[int]
    total_count: Optional[int] = 0  # 전체 개수
