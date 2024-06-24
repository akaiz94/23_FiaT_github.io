from datetime import datetime

from sqlalchemy import (
    Column,
    Integer, Float,
    PrimaryKeyConstraint,
    String, DateTime
)

from models.BaseModel import EntityMeta


class User(EntityMeta):
    __tablename__ = "user"  # 사용자

    id = Column(Integer)  # 회원 ID
    email = Column(String(100), nullable=True)  # 회원 이메일 주소
    passwd = Column(String(200), nullable=False)  # 회원 비밀번호
    name = Column(String(40), nullable=True)  # 회원 이름
    address = Column(String(100), nullable=True)  # 주소지
    phone = Column(String(20), nullable=False)  # 회원 전화번호
    birth_date = Column(String(10), nullable=True)  # 회원 생년월일
    gender = Column(String(10), nullable=True)  # 회원 성별
    last_access_at = Column(DateTime, nullable=True)  # 마지막 접속 시간
    push_token = Column(String(500), nullable=True)  # 앱 푸시토큰
    cloi_push_token = Column(String(500), nullable=True)  # 클로기 푸시토큰 (카메라 좌우 이동용)
    created_at = Column(DateTime, default=datetime.now())  # 등록일
    updated_at = Column(DateTime, default=datetime.now(), onupdate=datetime.now())  # 수정일
    deleted_at = Column(DateTime, nullable=True)  # 삭제일

    PrimaryKeyConstraint(id)

    def normalize(self):
        return {
            "id": self.id.__str__(),
            "email": self.email.__str__(),
            "passwd": self.passwd.__str__(),
            "name": self.name.__str__(),
            "address": self.address.__str__(),
            "phone": self.phone.__str__(),
            "birth_date": self.birth_date.__str__(),
            "gender": self.gender.__str__(),
            "last_access_at": self.last_access_at.__str__(),
            "push_token": self.push_token.__str__(),
            "cloi_push_token": self.cloi_push_token.__str__(),
            "created_at": self.created_at.__str__(),
            "updated_at": self.updated_at.__str__(),
            "deleted_at": self.deleted_at.__str__()
        }
