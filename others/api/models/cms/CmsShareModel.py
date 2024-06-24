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


class CmsShare(EntityMeta):
    __tablename__ = "cms_share"  # 공유

    id = Column(Integer)  # 고유 ID
    contents_id = Column(Integer)  # 컨텐츠ID
    share_type_cd = Column(String(20))  # 공유 유형
    share_url = Column(String(200))  # 공유된 URL
    user_id = Column(Integer)  # 작성자
    created_at = Column(DateTime, default=datetime.now())  # 등록일
    updated_at = Column(DateTime, default=datetime.now(), onupdate=datetime.now())  # 수정일
    deleted_at = Column(DateTime, nullable=True)  # 삭제일

    PrimaryKeyConstraint(id)

    def normalize(self):
        return {
            "id": self.id.__str__(),  # 고유 ID
            "contents_id": self.contents_id.__str__(),  # 컨텐츠ID
            "share_type_cd": self.share_type_cd.__str__(),  # 공유 유형
            "share_url": self.share_url.__str__(),  # 공유된 URL
            "user_id": self.user_id.__str__(),  # 작성자
            "created_at": self.created_at.__str__(),
            "updated_at": self.updated_at.__str__(),
            "deleted_at": self.deleted_at.__str__()
        }
