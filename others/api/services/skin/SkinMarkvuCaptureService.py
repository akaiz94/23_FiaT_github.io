from datetime import datetime
from typing import List, Optional

from fastapi import Depends

from models.skin.SkinMarkvuCaptureModel import SkinMarkvuCapture
from repositories.skin.SkinMarkvuCaptureRepository import SkinMarkvuCaptureRepository
from schemas.pydantic.skin.SkinMarkvuCaptureSchema import (
    SkinMarkvuCaptureSchema,
)


class SkinMarkvuCaptureService:
    skinMarkvuCaptureRepository: SkinMarkvuCaptureRepository

    def __init__(
            self,
            skinMarkvuCaptureRepository: SkinMarkvuCaptureRepository = Depends(),
    ) -> None:
        self.skinMarkvuCaptureRepository = skinMarkvuCaptureRepository

    def list(
            self,
            surveyNo: Optional[int] = None,
            userKey: Optional[int] = None,
            pageSize: Optional[int] = 10,
            startIndex: Optional[int] = 0,
    ) -> List[SkinMarkvuCapture]:
        return self.skinMarkvuCaptureRepository.list(
            surveyNo, userKey, pageSize, startIndex
        )

    def count(
            self,
            surveyNo: Optional[int] = None,
            userKey: Optional[int] = None,
    ) -> int:
        return self.skinMarkvuCaptureRepository.count(
            surveyNo, userKey
        )

    def get(self, idx: int) -> SkinMarkvuCaptureSchema:
        return self.skinMarkvuCaptureRepository.get(SkinMarkvuCapture(idx=idx))

    def update(
            self, idx: int, skin_markvu_capture_body: SkinMarkvuCaptureSchema
    ) -> SkinMarkvuCapture:
        skin_markvu_capture = self.get(idx)

        update_fields = []
        for field in skin_markvu_capture_body.__dict__:
            if field in skin_markvu_capture.__dict__:
                update_fields.append(field)

        for field in update_fields:
            if field != '_sa_instance_state':
                setattr(skin_markvu_capture, field, getattr(skin_markvu_capture_body, field))

        return self.skinMarkvuCaptureRepository.update(skin_markvu_capture)

    def create(self, skin_markvu_capture_body: SkinMarkvuCaptureSchema) -> SkinMarkvuCapture:
        return self.skinMarkvuCaptureRepository.create(
            SkinMarkvuCapture(**skin_markvu_capture_body.dict())
        )

    def deleteForce(self, idx: int) -> None:
        skin_markvu_capture = self.get(idx)
        return self.skinMarkvuCaptureRepository.delete(skin_markvu_capture)

    def delete(self, idx: int) -> None:
        self.update(idx, SkinMarkvuCapture(deleted_at=datetime.now()))
