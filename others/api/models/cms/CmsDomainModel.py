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


class CmsDomain(EntityMeta):
    __tablename__ = "cms_domain"  #

    domain_id_test = Column(String(20))  # 도메인아이디
    domain_name = Column(String(100))  # 도메인명
    url = Column(String(200))  # domain url
    path = Column(String(500))  # 페이지url
    domain_type_cd = Column(String(10))  # 도메인유형코드
    design_template_cd = Column(String(10))  # 디자인 템플릿
    design_template_path = Column(String(200))  # 디자인 템플릿 경로
    footer = Column(String(0))  # 푸터 공통 회사정보
    biz_name = Column(String(100))  # 사업자명
    biz_no = Column(String(50))  # 사업자번호
    ceo_name = Column(String(50))  # 대표자이름
    mng_name = Column(String(50))  # 담당자이름
    mng_email = Column(String(50))  # 담당자이메일
    phone_no = Column(String(50))  # 전화번호
    addr1 = Column(String(200))  # 주소1
    addr2 = Column(String(200))  # 주소2
    memo = Column(String(4000))  # 관리자메모
    disp_start_dt = Column(String(50))  # 노출시작일
    disp_end_dt = Column(String(50))  # 노출종료일
    use_yn = Column(String(1))  # 사용여부
    del_yn = Column(String(1))  # 삭제여부
    reg_id = Column(String(100))  # 등록자
    reg_dt = Column(String(50))  # 등록일
    upd_id = Column(String(100))  # 수정자
    upd_dt = Column(String(50))  # 수정일
    # reg_dt = Column(DateTime, default=datetime.now()) # 등록일
    # upd_dt = Column(DateTime, default=datetime.now(), onupdate=datetime.now()) # 수정일
    # del_dt = Column(DateTime, nullable=True) # 삭제일

    PrimaryKeyConstraint(
        domain_id_test,
        domain_name,
    )
