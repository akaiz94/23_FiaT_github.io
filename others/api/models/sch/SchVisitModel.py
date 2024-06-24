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


class SchVisit(EntityMeta):
    __tablename__ = "tb_C_VisitSch"  # 예약 방문스케쥴

    visitkey = Column(Integer)  # 예약 고유키
    skey = Column(Integer)  # 고유키
    reg_date = Column(DateTime)  # 등록일
    rsvn_date = Column(String)  # 예약일
    rsvn_time = Column(String(50))  # 예약시각
    name = Column(String(50))  # 이름
    course_flg = Column(String(50))  # 코스
    phone = Column(String(20))  # 전화번호
    sex = Column(String(1))  # 성별
    birthdate = Column(String(8))  # 생일
    birthdatetp = Column(String(1))  # 음/양
    cstmid = Column(String(50))  # 통합고객아이디
    ucstmid = Column(Integer)  # 통합고객번호
    m_userkey = Column(Integer)  # 사용자 키
    m_surveyno = Column(Integer)  # 설문번호
    m_memoyn = Column(String(1))  # 메모 저장 여부
    vstflg = Column(String(1))  # 동반여부
    progress_flg = Column(String(10))  # 진행상태
    c_name = Column(String(50))  # 동반자 이름
    c_phone = Column(String(50))  # 동반자  전화번호
    c_sex = Column(String(50))  # 동반자 성별
    c_birthdate = Column(String(8))  # 동반자 생년월일
    c_progress_flg = Column(String(10))  # 진행상태
    c_cstmid = Column(String(50))  # 통합고객아이디
    c_ucstmid = Column(Integer)  # 통합고객번호
    c_userkey = Column(Integer)  # 사용자 키
    c_surveyno = Column(Integer)  # 설문번호
    c_memoyn = Column(String(1))  # 메모 저장 여부
    cancelYN = Column(String(1))  # 취소 여부
    rsvn_flg = Column(String(1))  # 예약 형태
    vst_path = Column(String(1))  # 방문경로
    vst_txt = Column(String(50))  # 방문경로 _텍스트
    c_vst_path = Column(String(1))  # 방문경로
    c_vst_txt = Column(String(50))  # 방문경로 _텍스트
    email = Column(String(100))  # 이메일
    comment = Column(String(1000))  # 코멘트
    ProgramCode = Column(String(8))  # 프로그램코드
    prog_name = Column(String(50))  # 프로그램이름
    prog_cd = Column(String(8))  # 프로그램 코드
    gene_kit = Column(String(9))  # 유전자바코드
    reservation_num = Column(String(9))  # 예약번호
    agree_flag = Column(String(1))  # 동의여부
    agree_flag_date = Column(DateTime)  # 동의일자
    dormancy_flag = Column(String(1))  # 휴면여부
    dormancy_flag_date = Column(DateTime)  # 휴면일자
    withdraw_flag = Column(String(1))  # 탈퇴여부
    withdraw_flag_date = Column(DateTime)  # 탈퇴일자
    create_dt = Column(DateTime, default=datetime.now())  # 생성일
    update_dt = Column(DateTime, default=datetime.now(), onupdate=datetime.now())  # 수정일

    PrimaryKeyConstraint(visitkey, skey)
