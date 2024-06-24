import base64
from typing import List, Optional

from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session

from configs.Database import (
    get_db_connection,
)
from models.skin.SkinMarkvuCaptureModel import SkinMarkvuCapture
from schemas.pydantic.skin.SkinMarkvuCaptureSchema import SkinMarkvuCaptureSchema


class SkinMarkvuCaptureRepository:
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
    ) -> List[SkinMarkvuCapture]:
        query = self.db.query(SkinMarkvuCapture)

        if surveyNo:
            query = query.filter_by(surveyNo=surveyNo)
        if userKey:
            query = query.filter_by(userKey=userKey)
        query = query.order_by(SkinMarkvuCapture.idx.desc())
        return query.offset(start).limit(limit).all()

    def count(
            self,
            surveyNo: Optional[int],
            userKey: Optional[int],
    ) -> int:
        query = self.db.query(SkinMarkvuCapture)

        if surveyNo:
            query = query.filter_by(surveyNo=surveyNo)
        if userKey:
            query = query.filter_by(userKey=userKey)

        return query.count()

    # def get(self, skin_markvu_capture: SkinMarkvuCapture) -> SkinMarkvuCapture:
    #     return self.db.get(
    #         SkinMarkvuCapture, (skin_markvu_capture.idx)
    #     )
    def get(self, skin_markvu_capture: SkinMarkvuCapture) -> SkinMarkvuCaptureSchema:
        query_string = f"""
            select
                idx
                ,surveyNo
                ,userkey
                ,DBID
                ,CaptureDate
                ,LED
                ,Side
                ,FilePath
                ,MakeData
                ,ImageData
            from 
                tbM_MarkVu_Capture
                where idx = :idx
        """
        result = self.db.execute(query_string, {"idx": skin_markvu_capture.idx}).fetchone()

        if not result:
            raise HTTPException(status_code=404, detail="Hair result not found")

        # 인코딩 처리 안되있는 이미지 처리
        # 이미지 데이터를 바이트 스트림으로 변환
        image_data_bytes = result['ImageData']

        # Base64로 인코딩
        image_data_base64 = base64.b64encode(image_data_bytes).decode('utf-8')

        # 결과 객체 생성 시 Base64 인코딩된 이미지 데이터 추가
        capture_result_data = {
            "idx": result['idx'],
            "surveyNo": result['surveyNo'],
            "ImageData": image_data_base64
        }

        return SkinMarkvuCaptureSchema(**capture_result_data)

    def create(self, skin_markvu_capture: SkinMarkvuCapture) -> SkinMarkvuCapture:
        self.db.add(skin_markvu_capture)
        self.db.commit()
        self.db.refresh(skin_markvu_capture)
        return skin_markvu_capture

    def update(self, skin_markvu_capture: SkinMarkvuCapture) -> SkinMarkvuCapture:
        self.db.merge(skin_markvu_capture)
        self.db.commit()
        return skin_markvu_capture

    def delete(self, skin_markvu_capture: SkinMarkvuCapture) -> None:
        self.db.delete(skin_markvu_capture)
        self.db.commit()
        self.db.flush()
