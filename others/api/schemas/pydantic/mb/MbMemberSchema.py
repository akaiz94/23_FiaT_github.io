from datetime import datetime
from typing import Optional, Union

from pydantic import BaseModel


class MbMemberPostRequestSchema(BaseModel):
    UserKey: Optional[int]  # 사용자키
    CenterCD: Optional[str] = None  # 센터코드
    cstmid: Optional[str] = None  # 아이디
    ucstmid: Optional[int] = None  # 통합고객번호
    Name: Optional[str] = None  # 이름
    Phone: Optional[str] = None   # 핸드폰번호
    BirthDate: Optional[str] = None  # 생년월일
    BirthCD: Optional[str] = None  # 생일코드
    Sex: Optional[str] = None  # 성별
    UserType: Optional[str] = None  # 사용자타입
    Memo: Optional[str] = None  # 메모
    NAT_CD: Optional[str] = None  # NAT_CD
    RA_CD: Optional[str] = None  # RA_CD
    RegDate: Union[datetime, str, None]  # 등록일
    UpdDate: Union[datetime, str, None]  # 수정일
    create_dt: Union[datetime, str, None]  # 생성시간
    email: Optional[str] = None  # 이메일
    comment: Optional[str] = None  # 커멘트
    group_id: Optional[int] = None  # 그룹아이디


class MbMemberSchema(MbMemberPostRequestSchema):
    UserKey: int


class MbMemberResponseSchema(MbMemberSchema):
    UserKey: Optional[int]
    total_count: Optional[int] = 0  # 전체 개수
