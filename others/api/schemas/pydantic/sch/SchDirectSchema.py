from datetime import datetime
from typing import Optional, Union

from pydantic import BaseModel

class SchDirectProgressFlgPostRequestSchema(BaseModel):
    progress_flg: Optional[str] = None  # 진행상태

class SchDirectPostRequestSchema(BaseModel):
    reg_date: Union[datetime, str, None]  # 등록일
    rsvn_date: Union[datetime, str, None]  # 예약일
    rsvn_time: Optional[str] = None  # 예약시각
    name: Optional[str] = None  # 이름
    course_flg: Optional[str] = None  # 진행상태
    phone: Optional[str] = None  # 전화번호
    sex: Optional[str] = None  # 성별
    birthdate: Optional[str] = None  # 생일
    birthdatetp: Optional[str] = None  # 음/양
    cstmid: Optional[str] = None  # 통합고객아이디
    ucstmid: Optional[int]  # 통합고객번호
    userkey: Optional[int]  # 사용자키
    surveyNo: Optional[int]  # 설문번호
    progress_flg: Optional[str] = None  # 진행상태
    vst_path: Optional[str] = None  # 방문경로
    vst_txt: Optional[str] = None  # 방문경로 _텍스트
    create_dt: Union[datetime, str, None]  # 생성일
    update_dt: Union[datetime, str, None]  # 수정일
    email: Optional[str] = None  # 이메일
    comment: Optional[str] = None  # 코멘트
    group_id: Optional[int]  #
    programcode: Optional[str] = None  #
    apnonid: Optional[str] = None  # 비회원 회원 구분
    brandcourse: Optional[str] = None  # 아이오페랩, 시티랩 구분

class SchDirectSchema(SchDirectPostRequestSchema):
    skey: int


class SchDirectResponseSchema(SchDirectSchema):
    skey: Optional[int]
    total_count: Optional[int] = 0  # 전체 개수
