from datetime import datetime
from typing import List, Optional

from fastapi import Depends

from models.skin.SkinConcernModel import SkinConcern
from repositories.skin.SkinConcernRepository import SkinConcernRepository
from schemas.pydantic.skin.SkinConcernSchema import (
    SkinConcernSchema,
)


class SkinConcernService:
    skinConcernRepository: SkinConcernRepository

    def __init__(
            self,
            skinConcernRepository: SkinConcernRepository = Depends(),
    ) -> None:
        self.skinConcernRepository = skinConcernRepository

    def list(
            self,
            surveyNo: Optional[int] = None,
            userKey: Optional[int] = None,
            pageSize: Optional[int] = 10,
            startIndex: Optional[int] = 0,
    ) -> List[SkinConcern]:
        return self.skinConcernRepository.list(
            surveyNo, userKey, pageSize, startIndex
        )

    def count(
            self,
            surveyNo: Optional[int] = None,
            userKey: Optional[int] = None,
    ) -> int:
        return self.skinConcernRepository.count(
            surveyNo, userKey
        )

    def get(self, idx: int) -> SkinConcern:
        return self.skinConcernRepository.get(SkinConcern(idx=idx))

    def update(
            self, idx: int, skin_concern_body: SkinConcernSchema
    ) -> SkinConcern:
        skin_concern = self.get(idx)

        update_fields = []
        for field in skin_concern_body.__dict__:
            if field in skin_concern.__dict__:
                update_fields.append(field)

        for field in update_fields:
            if field != '_sa_instance_state':
                setattr(skin_concern, field, getattr(skin_concern_body, field))

        return self.skinConcernRepository.update(skin_concern)

    def create(self, skin_concern_body: SkinConcernSchema) -> SkinConcern:
        return self.skinConcernRepository.create(
            SkinConcern(**skin_concern_body.dict())
        )

    def deleteForce(self, idx: int) -> None:
        skin_concern = self.get(idx)
        return self.skinConcernRepository.delete(skin_concern)

    def delete(self, idx: int) -> None:
        self.update(idx, SkinConcern(deleted_at=datetime.now()))
