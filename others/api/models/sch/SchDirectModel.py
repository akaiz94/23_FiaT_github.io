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


class SchDirect(EntityMeta):
    __tablename__ = "tbVisitDirect"  # 직접 방문

    skey = Column(Integer)  # 고유키
    reg_date = Column(DateTime)  # 등록일
    rsvn_date = Column(String)  # 예약일
    rsvn_time = Column(String(50))  # 예약시각
    name = Column(String(50))  # 이름
    course_flg = Column(String(50))  # 진행상태
    phone = Column(String(50))  # 전화번호
    sex = Column(String(50))  # 성별
    birthdate = Column(String(8))  # 생일
    birthdatetp = Column(String(1))  # 음/양
    cstmid = Column(String(50))  # 통합고객아이디
    ucstmid = Column(Integer)  # 통합고객번호
    userkey = Column(Integer)  # 사용자키
    surveyNo = Column(Integer)  # 설문번호
    progress_flg = Column(String(10))  # 진행상태
    vst_path = Column(String(1))  # 방문경로
    vst_txt = Column(String(50))  # 방문경로 _텍스트
    create_dt = Column(DateTime, default=datetime.now())  # 생성일
    update_dt = Column(DateTime, default=datetime.now(), onupdate=datetime.now())  # 수정일
    email = Column(String(100))  # 이메일
    comment = Column(String(1000))  # 코멘트
    group_id = Column(Integer)  #
    programcode = Column(String(8))  #
    apnonid = Column(String(50))  # 비회원 회원 구분
    brandcourse = Column(String(10))  # 아이오페랩, 시티랩 구분

    PrimaryKeyConstraint(skey)
