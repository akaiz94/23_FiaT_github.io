import base64
from typing import List, Optional

from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session

from configs.Database import (
    get_db_connection,
)
from models.skin.SkinResultModel import SkinResult
from schemas.pydantic.skin.SkinResultSchema import SkinResultResponseSchema, SkinResultSchema


class SkinResultRepository:
    db: Session

    def __init__(
            self, db: Session = Depends(get_db_connection)
    ) -> None:
        self.db = db

    def list(
            self,
            surveyNo: Optional[int],
            userKey: Optional[int],
            limit: Optional[int],
            start: Optional[int],
    ) -> List[SkinResult]:
        query = self.db.query(SkinResult)

        if surveyNo:
            query = query.filter_by(surveyNo=surveyNo)
        if userKey:
            query = query.filter_by(userKey=userKey)
        query = query.order_by(SkinResult.idx.desc())
        return query.offset(start).limit(limit).all()

    def count(
            self,
            surveyNo: Optional[int],
            userKey: Optional[int],
    ) -> int:
        query = self.db.query(SkinResult)

        if surveyNo:
            query = query.filter_by(surveyNo=surveyNo)
        if userKey:
            query = query.filter_by(userKey=userKey)

        return query.count()

    def get(self, skin_result: SkinResult) -> SkinResultSchema:
        query_string = f"""
                    select
                        surveyNo
                        ,surveyDate
                        ,userKey
                        ,name
                        ,skin_score
                        ,skin_gomin
                        ,IsComplexity
                        ,t_zone_result
                        ,t_zone_position_num
                        ,u_zone_result
                        ,u_zone_position_num
                        ,fizpatrick_color_point
                        ,solution_type_number
                        ,sensitive_type_number
                        ,specialtip_img
                        ,specialtip_stoke_img
                        ,specialtip_memo
                        ,manager_value
                        ,create_dt
                        ,update_dt
                        ,idx
                        ,specialtip_memo2
                        ,specialtip_memo3
                    from tb_C_Result_Rpt
                    where idx = :idx
                """
        result = self.db.execute(query_string, {"idx": skin_result.idx}).fetchone()

        if not result:
            raise HTTPException(status_code=404, detail="Skin result not found")

        # 인코딩 처리 안되있는 이미지 처리
        # 이미지 데이터를 바이트 스트림으로 변환
        specialtip_img_bytes = result['specialtip_img']
        specialtip_stoke_img_bytes = result['specialtip_stoke_img']

        # Base64로 인코딩
        specialtip_img_base64 = base64.b64encode(specialtip_img_bytes).decode('utf-8')
        specialtip_stoke_img_base64 = base64.b64encode(specialtip_stoke_img_bytes).decode('utf-8')

        # 결과 객체 생성 시 Base64 인코딩된 이미지 데이터 추가
        skin_result_data = {
            "idx": result['idx'],
            "surveyNo": result['surveyNo'],
            "specialtip_img": specialtip_img_base64,
            "specialtip_stoke_img": specialtip_stoke_img_base64
        }

        return SkinResultSchema(**skin_result_data)

    def create(self, skin_result: SkinResult) -> SkinResult:
        self.db.add(skin_result)
        self.db.commit()
        self.db.refresh(skin_result)
        return skin_result

    def update(self, skin_result: SkinResult) -> SkinResult:
        self.db.merge(skin_result)
        self.db.commit()
        return skin_result

    def delete(self, skin_result: SkinResult) -> None:
        self.db.delete(skin_result)
        self.db.commit()
        self.db.flush()
