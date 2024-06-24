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


class CmsMeta(EntityMeta):
    __tablename__ = "cms_meta"  # 메시지

    id = Column(Integer)  # 고유 ID
    id = Column(Integer)  # 고유 ID
    ref_id = Column(Integer)  # 참조ID
    meta_type_cd = Column(String(20))  # 메시지유형
    meta = Column(String(2000))  # 메시지
    ip = Column(String(20))  # ip주소
    user_id = Column(Integer)  # 작성자
    created_at = Column(DateTime, default=datetime.now())  # 등록일
    updated_at = Column(DateTime, default=datetime.now(), onupdate=datetime.now())  # 수정일
    deleted_at = Column(DateTime, nullable=True)  # 삭제일

    PrimaryKeyConstraint(id)

    def normalize(self):
        return {
            "id": self.id.__str__(),  # 고유 ID
            "ref_id": self.ref_id.__str__(),  # 참조ID
            "meta_type_cd": self.meta_type_cd.__str__(),  # 메시지유형
            "meta": self.meta.__str__(),  # 메시지
            "ip": self.ip.__str__(),  # ip주소
            "user_id": self.user_id.__str__(),  # 작성자
            "created_at": self.created_at.__str__(),
            "updated_at": self.updated_at.__str__(),
            "deleted_at": self.deleted_at.__str__()
        }
