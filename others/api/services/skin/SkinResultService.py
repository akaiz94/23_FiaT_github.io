from datetime import datetime
from typing import List, Optional

from fastapi import Depends

from models.skin.SkinResultModel import SkinResult
from repositories.skin.SkinResultRepository import SkinResultRepository
from schemas.pydantic.skin.SkinResultSchema import (
    SkinResultSchema, SkinResultResponseSchema,
)


class SkinResultService:
    skinResultRepository: SkinResultRepository

    def __init__(
            self,
            skinResultRepository: SkinResultRepository = Depends(),
    ) -> None:
        self.skinResultRepository = skinResultRepository

    def list(
            self,
            surveyNo: Optional[int] = None,
            userKey: Optional[int] = None,
            pageSize: Optional[int] = 10,
            startIndex: Optional[int] = 0,
    ) -> List[SkinResult]:
        return self.skinResultRepository.list(
            surveyNo, userKey, pageSize, startIndex
        )

    def count(
            self,
            surveyNo: Optional[int] = None,
            userKey: Optional[int] = None,
    ) -> int:
        return self.skinResultRepository.count(
            surveyNo, userKey
        )

    def get(self, idx: int) -> SkinResultSchema:
        return self.skinResultRepository.get(SkinResult(idx=idx))

    def update(
            self, idx: int, skin_result_body: SkinResultSchema
    ) -> SkinResult:
        skin_result = self.get(idx)

        update_fields = []
        for field in skin_result_body.__dict__:
            if field in skin_result.__dict__:
                update_fields.append(field)

        for field in update_fields:
            if field != '_sa_instance_state':
                setattr(skin_result, field, getattr(skin_result_body, field))

        return self.skinResultRepository.update(skin_result)

    def create(self, skin_result_body: SkinResultSchema) -> SkinResult:
        return self.skinResultRepository.create(
            SkinResult(**skin_result_body.dict())
        )

    def deleteForce(self, idx: int) -> None:
        skin_result = self.get(idx)
        return self.skinResultRepository.delete(skin_result)

    def delete(self, idx: int) -> None:
        self.update(idx, SkinResult(deleted_at=datetime.now()))
