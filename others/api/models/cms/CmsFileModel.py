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


class CmsFile(EntityMeta):
    __tablename__ = "cms_file"  # 파일

    id = Column(Integer)  # 고유 ID
    file_div_cd = Column(String(20))  # 파일구분코드
    ref_id = Column(Integer)  # 참조ID
    file_name = Column(String(100))  # 파일명
    path = Column(String(200))  # 경로
    ext = Column(String(20))  # 확장자
    size = Column(String(30))  # 파일사이즈
    user_id = Column(Integer)  # 작성자
    created_at = Column(DateTime, default=datetime.now())  # 등록일
    updated_at = Column(DateTime, default=datetime.now(), onupdate=datetime.now())  # 수정일
    deleted_at = Column(DateTime, nullable=True)  # 삭제일

    PrimaryKeyConstraint(id)

    def normalize(self):
        return {
            "id": self.id.__str__(),  # 고유 ID
            "file_div_cd": self.file_div_cd.__str__(),  # 파일구분코드
            "ref_id": self.ref_id.__str__(),  # 참조ID
            "file_name": self.file_name.__str__(),  # 파일명
            "path": self.path.__str__(),  # 경로
            "ext": self.ext.__str__(),  # 확장자
            "size": self.size.__str__(),  # 파일사이즈
            "user_id": self.user_id.__str__(),  # 작성자
            "created_at": self.created_at.__str__(),
            "updated_at": self.updated_at.__str__(),
            "deleted_at": self.deleted_at.__str__()
        }
