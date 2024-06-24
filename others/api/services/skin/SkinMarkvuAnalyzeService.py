from datetime import datetime
from typing import List, Optional

from fastapi import Depends

from models.skin.SkinMarkvuAnalyzeModel import SkinMarkvuAnalyze
from repositories.skin.SkinMarkvuAnalyzeRepository import SkinMarkvuAnalyzeRepository
from schemas.pydantic.skin.SkinMarkvuAnalyzeSchema import (
    SkinMarkvuAnalyzeSchema,
)


class SkinMarkvuAnalyzeService:
    skinMarkvuAnalyzeRepository: SkinMarkvuAnalyzeRepository

    def __init__(
            self,
            skinMarkvuAnalyzeRepository: SkinMarkvuAnalyzeRepository = Depends(),
    ) -> None:
        self.skinMarkvuAnalyzeRepository = skinMarkvuAnalyzeRepository

    def list(
            self,
            userKey: Optional[int] = None,
            pageSize: Optional[int] = 10,
            startIndex: Optional[int] = 0,
    ) -> List[SkinMarkvuAnalyze]:
        return self.skinMarkvuAnalyzeRepository.list(
            userKey, pageSize, startIndex
        )

    def count(
            self,
            userKey: Optional[int] = None,
    ) -> int:
        return self.skinMarkvuAnalyzeRepository.count(
            userKey
        )

    def get(self, idx: int) -> SkinMarkvuAnalyze:
        return self.skinMarkvuAnalyzeRepository.get(SkinMarkvuAnalyze(idx=idx))

    def update(
            self, idx: int, skin_markvu_analyze_body: SkinMarkvuAnalyzeSchema
    ) -> SkinMarkvuAnalyze:
        skin_markvu_analyze = self.get(idx)

        update_fields = []
        for field in skin_markvu_analyze_body.__dict__:
            if field in skin_markvu_analyze.__dict__:
                update_fields.append(field)

        for field in update_fields:
            if field != '_sa_instance_state':
                setattr(skin_markvu_analyze, field, getattr(skin_markvu_analyze_body, field))

        return self.skinMarkvuAnalyzeRepository.update(skin_markvu_analyze)

    def create(self, skin_markvu_analyze_body: SkinMarkvuAnalyzeSchema) -> SkinMarkvuAnalyze:
        return self.skinMarkvuAnalyzeRepository.create(
            SkinMarkvuAnalyze(**skin_markvu_analyze_body.dict())
        )

    def deleteForce(self, idx: int) -> None:
        skin_markvu_analyze = self.get(idx)
        return self.skinMarkvuAnalyzeRepository.delete(skin_markvu_analyze)

    def delete(self, idx: int) -> None:
        self.update(idx, SkinMarkvuAnalyze(deleted_at=datetime.now()))
