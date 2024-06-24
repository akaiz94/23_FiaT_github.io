from datetime import datetime
from typing import List, Optional

from fastapi import Depends

from models.skin.SkinAnteraModel import SkinAntera
from repositories.skin.SkinAnteraRepository import SkinAnteraRepository
from schemas.pydantic.skin.SkinAnteraSchema import (
    SkinAnteraSchema,
)


class SkinAnteraService:
    skinAnteraRepository: SkinAnteraRepository

    def __init__(
            self,
            skinAnteraRepository: SkinAnteraRepository = Depends(),
    ) -> None:
        self.skinAnteraRepository = skinAnteraRepository

    def list(
            self,
            surveyNo: Optional[int] = None,
            userKey: Optional[int] = None,
            pageSize: Optional[int] = 10,
            startIndex: Optional[int] = 0,
    ) -> List[SkinAntera]:
        return self.skinAnteraRepository.list(
            surveyNo, userKey, pageSize, startIndex
        )

    def count(
            self,
            surveyNo: Optional[int] = None,
            userKey: Optional[int] = None,
    ) -> int:
        return self.skinAnteraRepository.count(
            surveyNo, userKey
        )

    def get(self, idx: int) -> SkinAntera:
        return self.skinAnteraRepository.get(SkinAntera(idx=idx))

    def update(
            self, idx: int, skin_antera_body: SkinAnteraSchema
    ) -> SkinAntera:
        skin_antera = self.get(idx)

        update_fields = []
        for field in skin_antera_body.__dict__:
            if field in skin_antera.__dict__:
                update_fields.append(field)

        for field in update_fields:
            if field != '_sa_instance_state':
                setattr(skin_antera, field, getattr(skin_antera_body, field))

        return self.skinAnteraRepository.update(skin_antera)

    def create(self, skin_antera_body: SkinAnteraSchema) -> SkinAntera:
        return self.skinAnteraRepository.create(
            SkinAntera(**skin_antera_body.dict())
        )

    def deleteForce(self, idx: int) -> None:
        skin_antera = self.get(idx)
        return self.skinAnteraRepository.delete(skin_antera)

    def delete(self, idx: int) -> None:
        self.update(idx, SkinAntera(deleted_at=datetime.now()))
