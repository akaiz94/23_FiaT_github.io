from datetime import datetime
from typing import Optional, Union
from pydantic import BaseModel

class MbManagerPostLoginRequestSchema(BaseModel):
    ManagerID: Optional[str] = None  # 매니저 아이디
    Password: Optional[str] = None  # 패스워드
    push_token: Optional[str] = None

class MbManagerLoginSchema(BaseModel):
    ManagerKey: Optional[int] = None  # 매니저 키값
    CenterCD: Optional[str] = None  # 센터CD
    ManagerID: Optional[str] = None  # 매니저 아이디
    Name: Optional[str] = None  # 이름
    ManagerCD: Optional[str] = None  # 메니저코드
    RoleCD: Optional[str] = None  # 권한코드
    ResidNo: Optional[str] = None  # ResidNo
    PhoneNo1: Optional[str] = None  # 전화1
    PhoneNo2: Optional[str] = None  # 전화2
    PhoneNo3: Optional[str] = None  # 전화3
    ZIP: Optional[str] = None  # 우편번호
    ADDR: Optional[str] = None  # 주소
    ADDR2: Optional[str] = None  # 주소2
    roadFL: Optional[int] = None  # roadFL
    roadcode: Optional[str] = None  # roadcode
    MobilePhone1: Optional[str] = None  # 핸드폰1
    MobilePhone2: Optional[str] = None  # 핸드폰2
    MobilePhone3: Optional[str] = None  # 핸드폰3
    Email: Optional[str] = None  # 이메일
    CSNO: Optional[int] = None  # CSNO
    create_dt: Union[datetime, str, None] = None  # 생성일

class MbManagerLoginResponseSchema(BaseModel):
    manager: MbManagerLoginSchema
    access_token: str

class MbManagerPostRequestSchema(BaseModel):

    ManagerKey: Optional[int] = None  # 매니저 키값
    CenterCD: Optional[str] = None  # 센터CD
    ManagerID: Optional[str] = None  # 매니저 아이디
    Password: Optional[str] = None  # 패스워드
    Name: Optional[str] = None  # 이름
    ManagerCD: Optional[str] = None  # 메니저코드
    RoleCD: Optional[str] = None  # 권한코드
    ResidNo: Optional[str] = None  # ResidNo
    PhoneNo1: Optional[str] = None  # 전화1
    PhoneNo2: Optional[str] = None  # 전화2
    PhoneNo3: Optional[str] = None  # 전화3
    ZIP: Optional[str] = None  # 우편번호
    ADDR: Optional[str] = None  # 주소
    ADDR2: Optional[str] = None  # 주소2
    roadFL: Optional[int] = None  # roadFL
    roadcode: Optional[str] = None  # roadcode
    MobilePhone1: Optional[str] = None  # 핸드폰1
    MobilePhone2: Optional[str] = None  # 핸드폰2
    MobilePhone3: Optional[str] = None  # 핸드폰3
    Email: Optional[str] = None  # 이메일
    CSNO: Optional[int] = None  # CSNO
    create_dt: Union[datetime, str, None] = None  # 생성일

    # todo 사진LargeBinary 타입을 변환할 타입 확인필요
    # Photo: Optional[bytes] = None  # 사진
    IsWorkStatusCode: Optional[str] = None  # 상태코드
    WorkStartTime: Optional[str] = None  # 시작일
    WorkEndTime: Optional[str] = None  # 종료일
    pwd_upd_dt: Union[datetime, str, None] = None  # 비밀번호 업데이트날짜
    upd_dt: Union[datetime, str, None] = None  # 수정일
    PasswordLock: Optional[int] = None  # 비밀번호 틀린횟수

    push_token: Optional[str] = None  # token


class MbManagerSchema(MbManagerPostRequestSchema):
    ManagerKey: int



class MbManagerResponseSchema(MbManagerSchema):
    ManagerKey: Optional[int]
    total_count: Optional[int] = 0  # 전체 개수
