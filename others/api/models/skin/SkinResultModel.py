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


class SkinResult(EntityMeta):
    __tablename__ = "tb_C_Result_Rpt"  # 피부결과값
    idx = Column(Integer)
    surveyNo = Column(Integer)  # 설문 고유번호
    surveyDate = Column(String(10))  # 설문 일자
    userKey = Column(Integer)  # 사용자 키
    name = Column(String(1000))  # 이름
    skin_score = Column(Integer)  # 피부점수
    skin_gomin = Column(String(50))  # 피부고민
    IsComplexity = Column(String(1))  # 복합성여부
    t_zone_result = Column(String(100))  # T존결과
    t_zone_position_num = Column(Integer)  # T존위치
    u_zone_result = Column(String(100))  # U존결과
    u_zone_position_num = Column(Integer)  # U존위치
    fizpatrick_color_point = Column(Integer)  # Fitzpatrick 척도
    solution_type_number = Column(String(10))  # 솔루션_타입_번호
    sensitive_type_number = Column(String(10))  # 민감도_타입_번호
    specialtip_img = Column(LargeBinary)  # 분석결과페이지_메모_이미지1
    specialtip_stoke_img = Column(LargeBinary)  # 분석결과페이지_메모_이미지2
    specialtip_memo = Column(String(2000))  # 분석결과페이지_메모_이미지3
    specialtip_memo2 = Column(String(2000))
    specialtip_memo3 = Column(String(2000))
    manager_value = Column(String(50))  # 담당 연구원
    create_dt = Column(DateTime, default=datetime.now())  # 등록일
    update_dt = Column(DateTime, default=datetime.now(), onupdate=datetime.now())  # 수정일

    PrimaryKeyConstraint(idx)
