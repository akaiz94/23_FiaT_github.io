from datetime import datetime

from sqlalchemy import (
    Column,
    Integer, Float,
    PrimaryKeyConstraint,
    String,
    DateTime, Boolean,
)

from models.BaseModel import EntityMeta


class CmsContents(EntityMeta):
    __tablename__ = "cms_contents"  # 컨텐츠

    id = Column(Integer)  # 게시판 고유 ID
    pid = Column(Integer)  # parent 아이디
    cont_div_cd = Column(String(20))  # 컨텐츠 유형
    title = Column(String(1000))  # 제목
    summary = Column(String(2000), nullable=True)  # 요약
    contents = Column(String, nullable=True)  # 내용
    start_dt = Column(DateTime, nullable=True, default=datetime.now())  # 시작일
    end_dt = Column(DateTime, nullable=True)  # 종료일
    user_id = Column(Integer, nullable=True)  # 작성자
    user_nm = Column(String(50), nullable=True)  # 작성자명
    secret_no = Column(String(50), nullable=True)  # 비밀번호
    display_yn = Column(Boolean, nullable=True)  # 노출여부
    read_cnt = Column(Integer)  # 읽은 횟수

    created_at = Column(DateTime, default=datetime.now())  # 등록일
    updated_at = Column(DateTime, default=datetime.now(), onupdate=datetime.now())  # 수정일
    deleted_at = Column(DateTime, nullable=True)  # 삭제일

    PrimaryKeyConstraint(id)

    def normalize(self):
        return {
            "id": self.id.__str__(),  # 게시판 고유 ID
            "pid": self.pid.__str__(),  # parent 아이디
            "cont_div_cd": self.cont_div_cd.__str__(),  # 컨텐츠 유형
            "title": self.title.__str__(),  # 제목
            "summary": self.summary.__str__(),  # 요약
            "contents": self.contents.__str__(),  # 내용
            "start_dt": self.start_dt.__str__(),  # 시작일
            "end_dt": self.end_dt.__str__(),  # 종료일
            "user_id": self.user_id.__str__(),  # 작성자
            "user_nm": self.user_nm.__str__(),  # 작성자명
            "secret_no": self.secret_no.__str__(),  # 비밀번호
            "display_yn": self.display_yn.__str__(),  # 노출여부
            "read_cnt": self.read_cnt.__str__(),  # 읽은횟수

            "created_at": self.created_at.__str__(),
            "updated_at": self.updated_at.__str__(),
            "deleted_at": self.deleted_at.__str__()
        }
