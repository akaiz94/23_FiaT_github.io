from datetime import datetime

from typing import Optional

from pydantic import BaseModel


class SkinMarkvuResultPostRequestSchema(BaseModel):
    surveyNo: Optional[int] = None  #
    userkey: Optional[int] = None  # 사용자 키
    DBID: Optional[float] = None  # 마크뷰DB 식별키
    CustName: Optional[str] = None  # 고객명
    Sex: Optional[str] = None  # 성별
    BirthDay: Optional[str] = None  # 생년월일
    FPixelNo_A: Optional[float] = None  # 픽셀_이마
    FPixelNo_B: Optional[float] = None  # 픽셀_코
    FPixelNo_C: Optional[float] = None  # 픽셀_눈꼬리_우
    FPixelNo_D: Optional[float] = None  # 픽셀_눈꼬리_좌
    FPixelNo_E: Optional[float] = None  # 픽셀_눈밑_우
    FPixelNo_F: Optional[float] = None  # 픽셀_눈밑_좌
    FPixelNo_G: Optional[float] = None  # 픽셀_볼_우
    FPixelNo_H: Optional[float] = None  # 픽셀_볼_좌
    FPore_A: Optional[float] = None  # 모공_이마
    FPore_B: Optional[float] = None  # 모공_코
    FPore_C: Optional[float] = None  # 모공_눈꼬리_우
    FPore_D: Optional[float] = None  # 모공_눈꼬리_좌
    FPore_E: Optional[float] = None  # 모공_눈밑_우
    FPore_F: Optional[float] = None  # 모공_눈밑_좌
    FPore_G: Optional[float] = None  # 모공_볼_우
    FPore_H: Optional[float] = None  # 모공_볼_좌
    FWrinkle_A: Optional[float] = None  # 주름_이마
    FWrinkle_B: Optional[float] = None  # 주름_코
    FWrinkle_C: Optional[float] = None  # 주름_눈꼬리_우
    FWrinkle_D: Optional[float] = None  # 주름_눈꼬리_좌
    FWrinkle_E: Optional[float] = None  # 주름_눈밑_우
    FWrinkle_F: Optional[float] = None  # 주름_눈밑_좌
    FWrinkle_G: Optional[float] = None  # 주름_볼_우
    FWrinkle_H: Optional[float] = None  # 주름_볼_좌
    FFutureWrinkle_A: Optional[float] = None  # 미래주름_이마
    FFutureWrinkle_B: Optional[float] = None  # 미래주름_코
    FFutureWrinkle_C: Optional[float] = None  # 미래주름_눈꼬리_우
    FFutureWrinkle_D: Optional[float] = None  # 미래주름_눈꼬리_좌
    FFutureWrinkle_E: Optional[float] = None  # 미래주름_눈밑_우
    FFutureWrinkle_F: Optional[float] = None  # 미래주름_눈밑_좌
    FFutureWrinkle_G: Optional[float] = None  # 미래주름_볼_우
    FFutureWrinkle_H: Optional[float] = None  # 미래주름_볼_좌
    FPigmentation_A: Optional[float] = None  # 색소침착_이마
    FPigmentation_B: Optional[float] = None  # 색소침착_코
    FPigmentation_C: Optional[float] = None  # 색소침착_눈꼬리_우
    FPigmentation_D: Optional[float] = None  # 색소침착_눈꼬리_좌
    FPigmentation_E: Optional[float] = None  # 색소침착_눈밑_우
    FPigmentation_F: Optional[float] = None  # 색소침착_눈밑_좌
    FPigmentation_G: Optional[float] = None  # 색소침착_볼_우
    FPigmentation_H: Optional[float] = None  # 색소침착_볼_좌
    FMelanin_A: Optional[float] = None  # 멜라닌_이마
    FMelanin_B: Optional[float] = None  # 멜라닌_코
    FMelanin_C: Optional[float] = None  # 멜라닌_눈꼬리_우
    FMelanin_D: Optional[float] = None  # 멜라닌_눈꼬리_좌
    FMelanin_E: Optional[float] = None  # 멜라닌_눈밑_우
    FMelanin_F: Optional[float] = None  # 멜라닌_눈밑_좌
    FMelanin_G: Optional[float] = None  # 멜라닌_볼_우
    FMelanin_H: Optional[float] = None  # 멜라닌_볼_좌
    FRedness_A: Optional[float] = None  # 붉은기_이마
    FRedness_B: Optional[float] = None  # 붉은기_코
    FRedness_C: Optional[float] = None  # 붉은기_눈꼬리_우
    FRedness_D: Optional[float] = None  # 붉은기_눈꼬리_좌
    FRedness_E: Optional[float] = None  # 붉은기_눈밑_우
    FRedness_F: Optional[float] = None  # 붉은기_눈밑_좌
    FRedness_G: Optional[float] = None  # 붉은기_볼_우
    FRedness_H: Optional[float] = None  # 붉은기_볼_좌
    FBrown_A: Optional[float] = None  # 브라운색소_이마
    FBrown_B: Optional[float] = None  # 브라운색소_코
    FBrown_C: Optional[float] = None  # 브라운색소_눈꼬리_우
    FBrown_D: Optional[float] = None  # 브라운색소_눈꼬리_좌
    FBrown_E: Optional[float] = None  # 브라운색소_눈밑_우
    FBrown_F: Optional[float] = None  # 브라운색소_눈밑_좌
    FBrown_G: Optional[float] = None  # 브라운색소_볼_우
    FBrown_H: Optional[float] = None  # 브라운색소_볼_좌
    FSebum_A: Optional[float] = None  # 피지_이마
    FSebum_B: Optional[float] = None  # 피지_코
    FSebum_C: Optional[float] = None  # 피지_눈꼬리_우
    FSebum_D: Optional[float] = None  # 피지_눈꼬리_좌
    FSebum_E: Optional[float] = None  # 피지_눈밑_우
    FSebum_F: Optional[float] = None  # 피지_눈밑_좌
    FSebum_G: Optional[float] = None  # 피지_볼_우
    FSebum_H: Optional[float] = None  # 피지_볼_좌
    FPorphyrin_A: Optional[float] = None  # 포피린_이마
    FPorphyrin_B: Optional[float] = None  # 포피린_코
    FPorphyrin_C: Optional[float] = None  # 포피린_눈꼬리_우
    FPorphyrin_D: Optional[float] = None  # 포피린_눈꼬리_좌
    FPorphyrin_E: Optional[float] = None  # 포피린_눈밑_우
    FPorphyrin_F: Optional[float] = None  # 포피린_눈밑_좌
    FPorphyrin_G: Optional[float] = None  # 포피린_볼_우
    FPorphyrin_H: Optional[float] = None  # 포피린_볼_좌
    FSkinColor_A: Optional[float] = None  # 피부톤_이마
    FSkinColor_B: Optional[float] = None  # 피부톤_코
    FSkinColor_C: Optional[float] = None  # 피부톤_눈꼬리_우
    FSkinColor_D: Optional[float] = None  # 피부톤_눈꼬리_좌
    FSkinColor_E: Optional[float] = None  # 피부톤_눈밑_우
    FSkinColor_F: Optional[float] = None  # 피부톤_눈밑_좌
    FSkinColor_G: Optional[float] = None  # 피부톤_볼_우
    FSkinColor_H: Optional[float] = None  # 피부톤_볼_좌
    FSLArea_A: Optional[float] = None  # 광채면적_이마
    FSLArea_B: Optional[float] = None  # 광채면적_코
    FSLArea_C: Optional[float] = None  # 광채면적_눈꼬리_우
    FSLArea_D: Optional[float] = None  # 광채면적_눈꼬리_좌
    FSLArea_E: Optional[float] = None  # 광채면적_눈밑_우
    FSLArea_F: Optional[float] = None  # 광채면적_눈밑_좌
    FSLArea_G: Optional[float] = None  # 광채면적_볼_우
    FSLArea_H: Optional[float] = None  # 광채면적_볼_좌
    FSLColor_A: Optional[float] = None  # 광채밝기_이마
    FSLColor_B: Optional[float] = None  # 광채밝기_코
    FSLColor_C: Optional[float] = None  # 광채밝기_눈꼬리_우
    FSLColor_D: Optional[float] = None  # 광채밝기_눈꼬리_좌
    FSLColor_E: Optional[float] = None  # 광채밝기_눈밑_우
    FSLColor_F: Optional[float] = None  # 광채밝기_눈밑_좌
    FSLColor_G: Optional[float] = None  # 광채밝기_볼_우
    FSLColor_H: Optional[float] = None  # 광채밝기_볼_좌
    FSubun_A: Optional[float] = None  # 수분_이마
    FSubun_B: Optional[float] = None  # 수분_코
    FSubun_C: Optional[float] = None  # 수분_눈꼬리_우
    FSubun_D: Optional[float] = None  # 수분_눈꼬리_좌
    FSubun_E: Optional[float] = None  # 수분_눈밑_U존
    FSubun_F: Optional[float] = None  # 수분_눈밑_U존
    FSubun_G: Optional[float] = None  # 수분_볼_우
    FSubun_H: Optional[float] = None  # 수분_볼_T존
    create_dt: Optional[datetime] = None  #
    update_dt: Optional[datetime] = None  #


class SkinMarkvuResultSchema(SkinMarkvuResultPostRequestSchema):
    idx: int


class SkinMarkvuResultResponseSchema(SkinMarkvuResultSchema):
    idx: Optional[int]
    total_count: Optional[int] = 0  # 전체 개수
