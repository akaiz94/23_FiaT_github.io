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


class SvyHair(EntityMeta):
    __tablename__ = "tb_C_SurveyResult_M"  #
    surveyNo = Column(Integer)  # 설문 고유번호
    surveyDate = Column(String(10))  # 설문 일자
    userkey = Column(Integer)  # 사용자 키
    qyn = Column(String(1))  # 상태
    s1_1 = Column(String(1))  # 두피고민을 선택
    s1_2 = Column(String(1))  # 두피고민을 선택
    s1_3 = Column(String(1))  # 두피고민을 선택
    s1_4 = Column(String(1))  # 두피고민을 선택
    s1_5 = Column(String(1))  # 두피고민을 선택
    s1_6 = Column(String(1))  # 두피고민을 선택
    s1_7 = Column(String(1))  # 두피고민을 선택
    s1_first = Column(String(100))  # 1순위 고민
    s2_1_1 = Column(String(1))  # 두피타입
    s2_1_2 = Column(String(1))  # 두피타입
    s2_1_3 = Column(String(1))  # 두피타입
    s2_2 = Column(String(1))  # 두피타입
    s2_3 = Column(String(1))  # 두피타입
    s2_4 = Column(String(1))  # 두피타입
    s2_5 = Column(String(1))  # 두피타입
    s2_6 = Column(String(1))  # 두피타입
    s2_7 = Column(String(1))  # 두피타입
    s2_8 = Column(String(1))  # 두피타입
    s2_9 = Column(String(1))  # 두피타입
    s2_10 = Column(String(1))  # 두피타입
    s2_11 = Column(String(1))  # 두피타입
    s2_12_1 = Column(String(1))  # 두피타입
    s2_12_2 = Column(String(1))  # 두피타입
    s2_12_3 = Column(String(1))  # 두피타입
    s2_12_4 = Column(String(1))  # 두피타입
    s2_12_5 = Column(String(1))  # 두피타입
    s2_12_6 = Column(String(1))  # 두피타입
    s2_12_7 = Column(String(1))  # 두피타입
    s2_12_8 = Column(String(1))  # 두피타입
    s2_12_9 = Column(String(1))  # 두피타입
    s3_1_1 = Column(String(1))  # 모발
    s3_1_2 = Column(String(1))  # 모발
    s3_1_3 = Column(String(1))  # 모발
    s3_1_4 = Column(String(1))  # 모발
    s3_1_5 = Column(String(1))  # 모발
    s3_1_6 = Column(String(1))  # 모발
    s3_1_7 = Column(String(1))  # 모발
    s3_1_8 = Column(String(1))  # 모발
    s3_1_first = Column(String(100))  # 모발고민 1순위
    s3_2 = Column(String(1))  # 모발
    m_markvu_yn = Column(String(1))  # 마크뷰 저장 YN
    m_antera_yn = Column(String(1))  # 안테라 저장 YN
    m_cnk_01_yn = Column(String(1))  #
    m_cnk_01_yn = Column(String(1))  #
    create_dt = Column(DateTime, default=datetime.now())  # 등록일
    update_dt = Column(DateTime, default=datetime.now(), onupdate=datetime.now())  # 수정일
    # deleted_at = Column(DateTime, nullable=True)  # 삭제일

    PrimaryKeyConstraint(surveyNo)
