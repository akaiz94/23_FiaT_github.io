from datetime import datetime
from typing import Optional, Union

from pydantic import BaseModel

class SchVisitProgressFlgPostRequestSchema(BaseModel):
    progress_flg: Optional[str] = None  # 동의여부

class SchVisitPostRequestSchema(BaseModel):
    skey: Optional[int]  # 고유키
    reg_date: Union[datetime, str, None]  # 등록일
    rsvn_date: Union[datetime, str, None]  # 예약일
    rsvn_time: Optional[str] = None  # 예약시각
    name: Optional[str] = None  # 이름
    course_flg: Optional[str] = None  # 코스
    phone: Optional[str] = None  # 전화번호
    sex: Optional[str] = None  # 성별
    birthdate: Optional[str] = None  # 생일
    birthdatetp: Optional[str] = None  # 음/양
    cstmid: Optional[str] = None  # 통합고객아이디
    ucstmid: Optional[int]  # 통합고객번호
    m_userkey: Optional[int]  # 사용자 키
    m_surveyno: Optional[int]  # 설문번호
    m_memoyn: Optional[str] = None  # 메모 저장 여부
    vstflg: Optional[str] = None  # 동반여부
    progress_flg: Optional[str] = None  # 진행상태
    c_name: Optional[str] = None  # 동반자 이름
    c_phone: Optional[str] = None  # 동반자  전화번호
    c_sex: Optional[str] = None  # 동반자 성별
    c_birthdate: Optional[str] = None  # 동반자 생년월일
    c_progress_flg: Optional[str] = None  # 진행상태
    c_cstmid: Optional[str] = None  # 통합고객아이디
    c_ucstmid: Optional[int]  # 통합고객번호
    c_userkey: Optional[int]  # 사용자 키
    c_surveyno: Optional[int]  # 설문번호
    c_memoyn: Optional[str] = None  # 메모 저장 여부
    cancelYN: Optional[str] = None  # 취소 여부
    rsvn_flg: Optional[str] = None  # 예약 형태
    vst_path: Optional[str] = None  # 방문경로
    vst_txt: Optional[str] = None  # 방문경로 _텍스트
    c_vst_path: Optional[str] = None  # 방문경로
    c_vst_txt: Optional[str] = None  # 방문경로 _텍스트
    create_dt: Union[datetime, str, None]  # 생성일
    update_dt: Union[datetime, str, None]  # 수정일
    email: Optional[str] = None  # 이메일
    comment: Optional[str] = None  # 코멘트
    ProgramCode: Optional[str] = None  # 프로그램코드
    prog_name: Optional[str] = None  # 프로그램이름
    prog_cd: Optional[str] = None  # 프로그램 코드
    gene_kit: Optional[str] = None  # 유전자바코드
    reservation_num: Optional[str] = None  # 예약번호
    agree_flag: Optional[str] = None  # 동의여부
    agree_flag_date: Union[datetime, str, None]  # 동의일자
    dormancy_flag: Optional[str] = None  # 휴면여부
    dormancy_flag_date: Union[datetime, str, None]  # 휴면일자
    withdraw_flag: Optional[str] = None  # 탈퇴여부
    withdraw_flag_date: Union[datetime, str, None]  # 탈퇴일자
    cancelYN: Optional[str] = None  # 취소 여부

class SchMergedRequestSchema(BaseModel):
    visitkey: Optional[int]  # 예약 고유키
    skey: Optional[int]  # 고유키
    reg_date: Union[datetime, str, None]  # 등록일
    rsvn_date: Union[datetime, str, None]  # 예약일
    rsvn_time: Optional[str] = None  # 예약시각
    name: Optional[str] = None  # 이름
    course_flg: Optional[str] = None  # 코스
    phone: Optional[str] = None  # 전화번호
    sex: Optional[str] = None  # 성별
    birthdate: Optional[str] = None  # 생일
    birthdatetp: Optional[str] = None  # 음/양
    cstmid: Optional[str] = None  # 통합고객아이디
    ucstmid: Optional[int]  # 통합고객번호
    m_userkey: Optional[int]  # 사용자 키
    m_surveyNo: Optional[int]  # 설문번호
    progress_flg: Optional[str] = None  # 진행상태
    vst_path: Optional[str] = None  # 방문경로
    vst_txt: Optional[str] = None  # 방문경로 _텍스트
    create_dt: Union[datetime, str, None]  # 생성일
    update_dt: Union[datetime, str, None]  # 수정일
    email: Optional[str] = None  # 이메일
    comment: Optional[str] = None  # 코멘트
    ProgramCode: Optional[str] = None  # 프로그램코드
    cancelYN: Optional[str] = None  # 취소 여부
    phone_consulting: Optional[str] = None  # 추가됨

class SchVisitSchema(SchVisitPostRequestSchema):
    visitkey: Optional[int]  # 예약 고유키
    skey: Optional[int]  # 고유키


class SchVisitResponseSchema(SchVisitSchema):
    total_count: Optional[int] = 0  # 전체 개수

class SchMergedResponseSchema(SchMergedRequestSchema):
    total_count: Optional[int] = 0  # 전체 개수