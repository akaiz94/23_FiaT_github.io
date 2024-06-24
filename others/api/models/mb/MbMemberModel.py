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


class MbMember(EntityMeta):
    __tablename__ = "tbMembers"  # 고객정보

    UserKey = Column(Integer)  # 사용자키
    CenterCD = Column(String(8))  # 센터코드
    cstmid = Column(String(50))  # 아이디
    ucstmid = Column(Integer)  # 통합고객번호
    Name = Column(String(50))  # 이름
    Phone = Column(String(20))  # 핸드폰번호
    BirthDate = Column(String(10))  # 생년월일
    BirthCD = Column(String(1))  # 생일코드
    Sex = Column(String(1))  # 성별
    UserType = Column(String(10))  # 사용자타입
    Memo = Column(String(1000))  # 메모
    NAT_CD = Column(String(10))  # NAT_CD
    RA_CD = Column(String(10))  # RA_CD
    RegDate = Column(DateTime, default=datetime.now())  # 등록일
    UpdDate = Column(DateTime, default=datetime.now(), onupdate=datetime.now())  # 수정일
    create_dt = Column(DateTime, default=datetime.now())  # 생성시간
    email = Column(String(100))  # 이메일
    comment = Column(String(1000))  # 커멘트
    group_id = Column(Integer)  # 그룹아이디

    PrimaryKeyConstraint(UserKey)
