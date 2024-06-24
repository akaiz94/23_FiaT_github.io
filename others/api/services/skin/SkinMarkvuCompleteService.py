from datetime import datetime
from typing import List, Optional

from fastapi import Depends

from models.skin.SkinMarkvuCompleteModel import SkinMarkvuComplete
from repositories.skin.SkinMarkvuCompleteRepository import SkinMarkvuCompleteRepository
from schemas.pydantic.skin.SkinMarkvuCompleteSchema import (
    SkinMarkvuCompleteSchema,
)


class SkinMarkvuCompleteService:
    skinMarkvuCompleteRepository: SkinMarkvuCompleteRepository

    def __init__(
            self,
            skinMarkvuCompleteRepository: SkinMarkvuCompleteRepository = Depends(),
    ) -> None:
        self.skinMarkvuCompleteRepository = skinMarkvuCompleteRepository

    def list(
            self,
            surveyNo: Optional[int] = None,
            userKey: Optional[int] = None,
            pageSize: Optional[int] = 10,
            startIndex: Optional[int] = 0,
    ) -> List[SkinMarkvuComplete]:
        return self.skinMarkvuCompleteRepository.list(
            surveyNo, userKey, pageSize, startIndex
        )

    def count(
            self,
            surveyNo: Optional[int] = None,
            userKey: Optional[int] = None,
    ) -> int:
        return self.skinMarkvuCompleteRepository.count(
            surveyNo, userKey
        )

    def get(self, idx: int) -> SkinMarkvuComplete:
        return self.skinMarkvuCompleteRepository.get(SkinMarkvuComplete(idx=idx))

    def update(
            self, idx: int, skin_markvu_complete_body: SkinMarkvuCompleteSchema
    ) -> SkinMarkvuComplete:
        skin_markvu_complete = self.get(idx)

        update_fields = []
        for field in skin_markvu_complete_body.__dict__:
            if field in skin_markvu_complete.__dict__:
                update_fields.append(field)

        for field in update_fields:
            if field != '_sa_instance_state':
                setattr(skin_markvu_complete, field, getattr(skin_markvu_complete_body, field))

        return self.skinMarkvuCompleteRepository.update(skin_markvu_complete)

    def create(self, skin_markvu_complete_body: SkinMarkvuCompleteSchema) -> SkinMarkvuComplete:
        return self.skinMarkvuCompleteRepository.create(
            SkinMarkvuComplete(**skin_markvu_complete_body.dict())
        )

    def deleteForce(self, idx: int) -> None:
        skin_markvu_complete = self.get(idx)
        return self.skinMarkvuCompleteRepository.delete(skin_markvu_complete)

    def delete(self, idx: int) -> None:
        self.update(idx, SkinMarkvuComplete(deleted_at=datetime.now()))
