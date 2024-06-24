from datetime import datetime
from typing import List, Optional

from fastapi import Depends

from models.skin.SkinMarkvuResultModel import SkinMarkvuResult
from repositories.skin.SkinMarkvuResultRepository import SkinMarkvuResultRepository
from schemas.pydantic.skin.SkinMarkvuResultSchema import (
    SkinMarkvuResultSchema,
)


class SkinMarkvuResultService:
    skinMarkvuResultRepository: SkinMarkvuResultRepository

    def __init__(
            self,
            skinMarkvuResultRepository: SkinMarkvuResultRepository = Depends(),
    ) -> None:
        self.skinMarkvuResultRepository = skinMarkvuResultRepository

    def list(
            self,
            surveyNo: Optional[int] = None,
            userkey: Optional[int] = None,
            pageSize: Optional[int] = 10,
            startIndex: Optional[int] = 0,
    ) -> List[SkinMarkvuResult]:
        return self.skinMarkvuResultRepository.list(
            surveyNo, userkey, pageSize, startIndex
        )

    def count(
            self,
            surveyNo: Optional[int] = None,
            userkey: Optional[int] = None,
    ) -> int:
        return self.skinMarkvuResultRepository.count(
            surveyNo, userkey
        )

    def get(self, idx: int) -> SkinMarkvuResult:
        return self.skinMarkvuResultRepository.get(SkinMarkvuResult(idx=idx))

    def update(
            self, idx: int, skin_markvu_result_body: SkinMarkvuResultSchema
    ) -> SkinMarkvuResult:
        skin_markvu_result = self.get(idx)

        update_fields = []
        for field in skin_markvu_result_body.__dict__:
            if field in skin_markvu_result.__dict__:
                update_fields.append(field)

        for field in update_fields:
            if field != '_sa_instance_state':
                setattr(skin_markvu_result, field, getattr(skin_markvu_result_body, field))

        return self.skinMarkvuResultRepository.update(skin_markvu_result)

    def create(self, skin_markvu_result_body: SkinMarkvuResultSchema) -> SkinMarkvuResult:
        return self.skinMarkvuResultRepository.create(
            SkinMarkvuResult(**skin_markvu_result_body.dict())
        )

    def deleteForce(self, idx: int) -> None:
        skin_markvu_result = self.get(idx)
        return self.skinMarkvuResultRepository.delete(skin_markvu_result)

    def delete(self, idx: int) -> None:
        self.update(idx, SkinMarkvuResult(deleted_at=datetime.now()))
