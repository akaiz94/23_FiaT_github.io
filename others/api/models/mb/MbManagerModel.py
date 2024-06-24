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


class MbManager(EntityMeta):
    __tablename__ = "tbAdminManager"  #

    ManagerKey = Column(Integer)  # 매니저 키값
    CenterCD = Column(String(8))  # 센터CD
    ManagerID = Column(String(20))  # 매니저 아이디
    Password = Column(String(150))  # 패스워드
    Name = Column(String(50))  # 이름
    ManagerCD = Column(String(8))  # 메니저코드
    RoleCD = Column(String(8))  # 권한코드
    ResidNo = Column(String(13))  # ResidNo
    PhoneNo1 = Column(String(4))  # 전화1
    PhoneNo2 = Column(String(4))  # 전화2
    PhoneNo3 = Column(String(4))  # 전화3
    ZIP = Column(String(7))  # 우편번호
    ADDR = Column(String(80))  # 주소
    ADDR2 = Column(String(50))  # 주소2
    roadFL = Column(Integer)  # roadFL
    roadcode = Column(String(12))  # roadcode
    MobilePhone1 = Column(String(4))  # 핸드폰1
    MobilePhone2 = Column(String(4))  # 핸드폰2
    MobilePhone3 = Column(String(4))  # 핸드폰3
    Email = Column(String(64))  # 이메일
    CSNO = Column(Integer)  # CSNO
    create_dt = Column(DateTime, default=datetime.now())  # 생성일
    Photo = Column(LargeBinary)  # 사진
    IsWorkStatusCode = Column(String(8))  # 상태코드
    WorkStartTime = Column(String(8))  # 시작일
    WorkEndTime = Column(DateTime, default=datetime.now())  # 종료일
    pwd_upd_dt = Column(DateTime, default=datetime.now(), onupdate=datetime.now())  # 비밀번호 업데이트날짜
    upd_dt = Column(DateTime, default=datetime.now(), onupdate=datetime.now())  # 수정일
    PasswordLock = Column(Integer)  # 비밀번호 틀린횟수
    push_token = Column(String(1000)) # token

    PrimaryKeyConstraint(ManagerKey)
