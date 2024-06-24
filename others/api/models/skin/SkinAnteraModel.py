from datetime import datetime

from sqlalchemy import (
    Column,
    Integer, Float,
    PrimaryKeyConstraint,
    String,
    LargeBinary, DateTime

)

from models.BaseModel import EntityMeta


class SkinAntera(EntityMeta):
    __tablename__ = "tbM_Antera"  #
    idx = Column(Integer)
    surveyNo = Column(Integer)  # 고유번호
    userKey = Column(Integer)  # 사용자키
    J_normal = Column(String(50))  # 주름_평소
    J_laugh = Column(String(50))  # 주름_웃을때
    M_left = Column(String(50))  # 멜라닌_좌
    M_right = Column(String(50))  # 멜라닌_우
    H_left = Column(String(50))  # 헤모글로빈_좌
    H_right = Column(String(50))  # 헤모글로빈_우
    C_left = Column(String(50))  # 칙칙함_좌
    C_right = Column(String(50))  # 칙칙함_우
    G1_name = Column(String(50))  # 고민1_이름
    G1_val = Column(String(50))

    G2_name = Column(String(50))  # 고민2_이름
    G2_val = Column(String(50))

    G3_name = Column(String(50))
    G3_val = Column(String(50))
    G4_name = Column(String(50))
    G4_val = Column(String(50))
    G5_name = Column(String(50))
    G5_val = Column(String(50))
    G6_name = Column(String(50))
    G6_val = Column(String(50))

    # G2_left = Column(String(50))  # 고민2_좌
    # G2_right = Column(String(50))  # 고민2_우
    J_01_Normal_img = Column(LargeBinary)  # 주름_눈가_평소_이미지
    J_01_Laugh_img = Column(LargeBinary)  # 주름_눈가_웃을때_이미지
    J_02_Normal_img = Column(LargeBinary)  # 주름_입가_평소_이미지
    J_02_Laugh_img = Column(LargeBinary)  # 주름_입가_웃을때_이미지
    M_01_img = Column(LargeBinary)  # 멜라닌_01_이미지
    M_02_img = Column(LargeBinary)  # 멜라닌_02_이미지
    G1_img = Column(LargeBinary)  # 고민1_이미지
    G2_img = Column(LargeBinary)  # 고민2_이미지
    H_01_img = Column(LargeBinary)  # 헤모글로빈_01_이미지
    H_02_img = Column(LargeBinary)  # 헤모글로빈_02_이미지
    G3_img = Column(LargeBinary)  # 고민3_이미지
    G4_img = Column(LargeBinary)  # 고민4_이미지
    G5_img = Column(LargeBinary)  # 고민5_이미지
    G6_img = Column(LargeBinary)  # 고민6_이미지
    create_dt = Column(DateTime, default=datetime.now())  # 생성일
    update_dt = Column(DateTime, default=datetime.now(), onupdate=datetime.now())  # 수정일

    PrimaryKeyConstraint(idx)
