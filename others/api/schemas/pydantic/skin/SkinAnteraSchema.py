from datetime import datetime

from typing import Optional

from pydantic import BaseModel


class SkinAnteraPostRequestSchema(BaseModel):
    surveyNo: Optional[int] = None  # 고유번호
    userKey: Optional[int] = None  # 사용자키
    J_normal: Optional[str] = None  # 주름_평소
    J_laugh: Optional[str] = None  # 주름_웃을때
    M_left: Optional[str] = None  # 멜라닌_좌
    M_right: Optional[str] = None  # 멜라닌_우
    H_left: Optional[str] = None  # 헤모글로빈_좌
    H_right: Optional[str] = None  # 헤모글로빈_우
    C_left: Optional[str] = None  # 칙칙함_좌
    C_right: Optional[str] = None  # 칙칙함_우

    G1_name: Optional[str] = None
    G1_val: Optional[str] = None
    G2_name: Optional[str] = None
    G2_val: Optional[str] = None
    G3_name: Optional[str] = None
    G3_val: Optional[str] = None
    G4_name: Optional[str] = None
    G4_val: Optional[str] = None
    G5_name: Optional[str] = None
    G5_val: Optional[str] = None
    G6_name: Optional[str] = None
    G6_val: Optional[str] = None


    # G1_name: Optional[str] = None  # 고민1_이름
    # G1_left: Optional[str] = None  # 고민1_좌
    # G1_right: Optional[str] = None  # 고민1_우
    # G2_name: Optional[str] = None  # 고민2_이름
    # G2_left: Optional[str] = None  # 고민2_좌
    # G2_right: Optional[str] = None  # 고민2_우
    J_01_Normal_img:              Optional[bytes] = None   # 주름_눈가_평소_이미지
    J_01_Laugh_img :             Optional[bytes] = None   # 주름_눈가_웃을때_이미지
    J_02_Normal_img:              Optional[bytes] = None   # 주름_입가_평소_이미지
    J_02_Laugh_img :             Optional[bytes] = None   # 주름_입가_웃을때_이미지
    M_01_img       :       Optional[bytes] = None   # 멜라닌_01_이미지
    M_02_img       :       Optional[bytes] = None   # 멜라닌_02_이미지
    G1_img         :     Optional[bytes] = None   # 고민1_이미지
    G2_img         :     Optional[bytes] = None   # 고민2_이미지
    H_01_img       :       Optional[bytes] = None   # 헤모글로빈_01_이미지
    H_02_img       :       Optional[bytes] = None   # 헤모글로빈_02_이미지
    G3_img         :     Optional[bytes] = None   # 고민3_이미지
    G4_img         :     Optional[bytes] = None   # 고민4_이미지
    G5_img         :     Optional[bytes] = None   # 고민5_이미지
    G6_img         :     Optional[bytes] = None   # 고민6_이미지
    create_dt: Optional[datetime] = None  # 생성일
    update_dt: Optional[datetime] = None  # 수정일


class SkinAnteraSchema(SkinAnteraPostRequestSchema):
    idx: int


class SkinAnteraResponseSchema(SkinAnteraSchema):
    idx: Optional[int]
    total_count: Optional[int] = 0  # 전체 개수
