from datetime import datetime
from sqlalchemy import (
    Column,
    Integer, Float,
    PrimaryKeyConstraint,
    String,
    DateTime,
    Float
)

from models.BaseModel import EntityMeta


class SkinMarkvuResult(EntityMeta):
    __tablename__ = "tb_C_ResultMarkVu"  # 기기_마크뷰
    idx = Column(Integer)
    surveyNo = Column(Integer)  # 고유번호
    userkey = Column(Integer)  # 사용자 키
    DBID = Column(Float)  # 마크뷰DB 식별키
    CustName = Column(String(255))  # 고객명
    Sex = Column(String(255))  # 성별
    BirthDay = Column(String(255))  # 생년월일
    FPixelNo_A = Column(Float)  # 픽셀_이마
    FPixelNo_B = Column(Float)  # 픽셀_코
    FPixelNo_C = Column(Float)  # 픽셀_눈꼬리_우
    FPixelNo_D = Column(Float)  # 픽셀_눈꼬리_좌
    FPixelNo_E = Column(Float)  # 픽셀_눈밑_우
    FPixelNo_F = Column(Float)  # 픽셀_눈밑_좌
    FPixelNo_G = Column(Float)  # 픽셀_볼_우
    FPixelNo_H = Column(Float)  # 픽셀_볼_좌
    FPore_A = Column(Float)  # 모공_이마
    FPore_B = Column(Float)  # 모공_코
    FPore_C = Column(Float)  # 모공_눈꼬리_우
    FPore_D = Column(Float)  # 모공_눈꼬리_좌
    FPore_E = Column(Float)  # 모공_눈밑_우
    FPore_F = Column(Float)  # 모공_눈밑_좌
    FPore_G = Column(Float)  # 모공_볼_우
    FPore_H = Column(Float)  # 모공_볼_좌
    FWrinkle_A = Column(Float)  # 주름_이마
    FWrinkle_B = Column(Float)  # 주름_코
    FWrinkle_C = Column(Float)  # 주름_눈꼬리_우
    FWrinkle_D = Column(Float)  # 주름_눈꼬리_좌
    FWrinkle_E = Column(Float)  # 주름_눈밑_우
    FWrinkle_F = Column(Float)  # 주름_눈밑_좌
    FWrinkle_G = Column(Float)  # 주름_볼_우
    FWrinkle_H = Column(Float)  # 주름_볼_좌
    FFutureWrinkle_A = Column(Float)  # 미래주름_이마
    FFutureWrinkle_B = Column(Float)  # 미래주름_코
    FFutureWrinkle_C = Column(Float)  # 미래주름_눈꼬리_우
    FFutureWrinkle_D = Column(Float)  # 미래주름_눈꼬리_좌
    FFutureWrinkle_E = Column(Float)  # 미래주름_눈밑_우
    FFutureWrinkle_F = Column(Float)  # 미래주름_눈밑_좌
    FFutureWrinkle_G = Column(Float)  # 미래주름_볼_우
    FFutureWrinkle_H = Column(Float)  # 미래주름_볼_좌
    FPigmentation_A = Column(Float)  # 색소침착_이마
    FPigmentation_B = Column(Float)  # 색소침착_코
    FPigmentation_C = Column(Float)  # 색소침착_눈꼬리_우
    FPigmentation_D = Column(Float)  # 색소침착_눈꼬리_좌
    FPigmentation_E = Column(Float)  # 색소침착_눈밑_우
    FPigmentation_F = Column(Float)  # 색소침착_눈밑_좌
    FPigmentation_G = Column(Float)  # 색소침착_볼_우
    FPigmentation_H = Column(Float)  # 색소침착_볼_좌
    FMelanin_A = Column(Float)  # 멜라닌_이마
    FMelanin_B = Column(Float)  # 멜라닌_코
    FMelanin_C = Column(Float)  # 멜라닌_눈꼬리_우
    FMelanin_D = Column(Float)  # 멜라닌_눈꼬리_좌
    FMelanin_E = Column(Float)  # 멜라닌_눈밑_우
    FMelanin_F = Column(Float)  # 멜라닌_눈밑_좌
    FMelanin_G = Column(Float)  # 멜라닌_볼_우
    FMelanin_H = Column(Float)  # 멜라닌_볼_좌
    FRedness_A = Column(Float)  # 붉은기_이마
    FRedness_B = Column(Float)  # 붉은기_코
    FRedness_C = Column(Float)  # 붉은기_눈꼬리_우
    FRedness_D = Column(Float)  # 붉은기_눈꼬리_좌
    FRedness_E = Column(Float)  # 붉은기_눈밑_우
    FRedness_F = Column(Float)  # 붉은기_눈밑_좌
    FRedness_G = Column(Float)  # 붉은기_볼_우
    FRedness_H = Column(Float)  # 붉은기_볼_좌
    FBrown_A = Column(Float)  # 브라운색소_이마
    FBrown_B = Column(Float)  # 브라운색소_코
    FBrown_C = Column(Float)  # 브라운색소_눈꼬리_우
    FBrown_D = Column(Float)  # 브라운색소_눈꼬리_좌
    FBrown_E = Column(Float)  # 브라운색소_눈밑_우
    FBrown_F = Column(Float)  # 브라운색소_눈밑_좌
    FBrown_G = Column(Float)  # 브라운색소_볼_우
    FBrown_H = Column(Float)  # 브라운색소_볼_좌
    FSebum_A = Column(Float)  # 피지_이마
    FSebum_B = Column(Float)  # 피지_코
    FSebum_C = Column(Float)  # 피지_눈꼬리_우
    FSebum_D = Column(Float)  # 피지_눈꼬리_좌
    FSebum_E = Column(Float)  # 피지_눈밑_우
    FSebum_F = Column(Float)  # 피지_눈밑_좌
    FSebum_G = Column(Float)  # 피지_볼_우
    FSebum_H = Column(Float)  # 피지_볼_좌
    FPorphyrin_A = Column(Float)  # 포피린_이마
    FPorphyrin_B = Column(Float)  # 포피린_코
    FPorphyrin_C = Column(Float)  # 포피린_눈꼬리_우
    FPorphyrin_D = Column(Float)  # 포피린_눈꼬리_좌
    FPorphyrin_E = Column(Float)  # 포피린_눈밑_우
    FPorphyrin_F = Column(Float)  # 포피린_눈밑_좌
    FPorphyrin_G = Column(Float)  # 포피린_볼_우
    FPorphyrin_H = Column(Float)  # 포피린_볼_좌
    FSkinColor_A = Column(Float)  # 피부톤_이마
    FSkinColor_B = Column(Float)  # 피부톤_코
    FSkinColor_C = Column(Float)  # 피부톤_눈꼬리_우
    FSkinColor_D = Column(Float)  # 피부톤_눈꼬리_좌
    FSkinColor_E = Column(Float)  # 피부톤_눈밑_우
    FSkinColor_F = Column(Float)  # 피부톤_눈밑_좌
    FSkinColor_G = Column(Float)  # 피부톤_볼_우
    FSkinColor_H = Column(Float)  # 피부톤_볼_좌
    FSLArea_A = Column(Float)  # 광채면적_이마
    FSLArea_B = Column(Float)  # 광채면적_코
    FSLArea_C = Column(Float)  # 광채면적_눈꼬리_우
    FSLArea_D = Column(Float)  # 광채면적_눈꼬리_좌
    FSLArea_E = Column(Float)  # 광채면적_눈밑_우
    FSLArea_F = Column(Float)  # 광채면적_눈밑_좌
    FSLArea_G = Column(Float)  # 광채면적_볼_우
    FSLArea_H = Column(Float)  # 광채면적_볼_좌
    FSLColor_A = Column(Float)  # 광채밝기_이마
    FSLColor_B = Column(Float)  # 광채밝기_코
    FSLColor_C = Column(Float)  # 광채밝기_눈꼬리_우
    FSLColor_D = Column(Float)  # 광채밝기_눈꼬리_좌
    FSLColor_E = Column(Float)  # 광채밝기_눈밑_우
    FSLColor_F = Column(Float)  # 광채밝기_눈밑_좌
    FSLColor_G = Column(Float)  # 광채밝기_볼_우
    FSLColor_H = Column(Float)  # 광채밝기_볼_좌
    FSubun_A = Column(Float)  # 수분_이마
    FSubun_B = Column(Float)  # 수분_코
    FSubun_C = Column(Float)  # 수분_눈꼬리_우
    FSubun_D = Column(Float)  # 수분_눈꼬리_좌
    FSubun_E = Column(Float)  # 수분_눈밑_U존
    FSubun_F = Column(Float)  # 수분_눈밑_U존
    FSubun_G = Column(Float)  # 수분_볼_우
    FSubun_H = Column(Float)  # 수분_볼_T존
    create_dt = Column(DateTime, default=datetime.now())  # 등록일
    update_dt = Column(DateTime, default=datetime.now(), onupdate=datetime.now())  # 수정일
    # deleted_at   = Column(DateTime, nullable=True) # 삭제일


    PrimaryKeyConstraint(idx)
