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


class HairResult(EntityMeta):
    __tablename__ = "tb_C_Result_Rpt_M"  # 두피결과값
    idx = Column(Integer)
    surveyNo = Column(Integer)  #
    surveyDate = Column(String(10))  # (사용 안함)
    userKey = Column(Integer)  #
    name = Column(String(0))  #
    skin_score = Column(Integer)  # (사용 안함)
    skin_gomin = Column(String(50))  # (사용 안함)
    IsComplexity = Column(String(1))  # (사용 안함)
    t_zone_result = Column(String(100))  # (사용 안함)
    t_zone_position_num = Column(Integer)  # (사용 안함)
    u_zone_result = Column(String(100))  # (사용 안함)
    u_zone_position_num = Column(Integer)  # (사용 안함)
    fizpatrick_color_point = Column(Integer)  # (사용 안함)
    solution_type_number = Column(String(10))  # (사용 안함)
    sensitive_type_number = Column(String(10))  # (사용 안함)
    specialtip_img = Column(LargeBinary)  # 분석결과페이지_메모_이미지1
    specialtip_stoke_img = Column(LargeBinary)  # 분석결과페이지_메모_이미지2
    specialtip_memo = Column(String(2000))  # 분석결과페이지_메모_이미지3
    specialtip_memo2 = Column(String(2000))
    specialtip_memo3 = Column(String(2000))
    manager_value = Column(String(50))  # 담당 연구원
    create_dt = Column(DateTime, default=datetime.now())  # 생성일자
    update_dt = Column(DateTime, default=datetime.now(), onupdate=datetime.now())  # 업데이트 일자
    # deleted_at = Column(DateTime, nullable=True) # 삭제일

    PrimaryKeyConstraint(idx)
