from datetime import datetime

from sqlalchemy import (
    Column,
    Integer, Float,
    PrimaryKeyConstraint,
    String,
    DateTime,
    LargeBinary
)

from models.BaseModel import EntityMeta


class SvySkin(EntityMeta):
    __tablename__ = "tb_C_SurveyResult"  #
    surveyNo = Column(Integer)  # 설문 고유번호
    surveyDate = Column(String(10))  # 설문 일자
    userkey = Column(Integer)  # 사용자 키
    qyn = Column(String(1))  # 상태
    s1_1 = Column(String(1))  # 피부고민을 선택
    s1_2 = Column(String(1))  # 피부고민을 선택
    s1_3 = Column(String(1))  # 피부고민을 선택
    s1_4 = Column(String(1))  # 피부고민을 선택
    s1_5 = Column(String(1))  # 피부고민을 선택
    s1_6 = Column(String(1))  # 피부고민을 선택
    s1_7 = Column(String(1))  # 피부고민을 선택
    s1_8 = Column(String(1))  # 피부고민을 선택
    s1_9 = Column(String(1))  # 피부고민을 선택
    s1_10 = Column(String(1))  # 피부고민을 선택
    s1_11 = Column(String(1))  # 피부고민을 선택
    s1_12 = Column(String(1))  # 피부고민을 선택
    s1_first = Column(String(100))  # 1순위 고민 text
    s1_second = Column(String(100))  # 2순위 고민 text
    s2_1 = Column(String(20))  # 피부타입
    s2_2 = Column(String(1))  # 피부타입
    s2_3 = Column(String(1))  # 피부타입
    s2_4 = Column(String(1))  # 피부타입
    s3_1 = Column(String(1))  # 생활습관
    s3_2 = Column(String(2))  # 생활습관
    s3_3 = Column(String(2))  # 생활습관
    s3_4 = Column(String(2))  # 생활습관
    s3_5 = Column(String(2))  # 생활습관
    s3_6 = Column(String(2))  # 생활습관
    s3_7 = Column(String(20))  # (사용안함)
    s3_8 = Column(String(2))  # (사용안함)
    s3_9 = Column(String(20))  # (사용안함)
    s3_10 = Column(String(20))  # (사용안함)
    s3_11 = Column(String(2))  # (사용안함)
    s3_12 = Column(String(20))  # (사용안함)
    s4_1 = Column(String(2))  # 민감도
    s4_2 = Column(String(2))  # 민감도
    s4_3 = Column(String(2))  # 민감도
    s4_4 = Column(String(2))  # 민감도
    s4_5 = Column(String(2))  # 민감도
    s4_6 = Column(String(2))  # 민감도
    m_markvu_yn = Column(String(1))  # 마크뷰 저장 YN
    m_antera_yn = Column(String(1))  # 안테라 저장 YN
    m_cnk_01_yn = Column(String(1))  #
    m_cnk_01_yn = Column(String(1))  #
    create_dt = Column(DateTime, default=datetime.now())  # 등록일
    update_dt = Column(DateTime, default=datetime.now(), onupdate=datetime.now())  # 수정일
    # deleted_at = Column(DateTime, nullable=True)  # 삭제일

    PrimaryKeyConstraint(surveyNo)
