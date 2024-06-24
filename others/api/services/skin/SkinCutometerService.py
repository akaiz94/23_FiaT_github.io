from datetime import datetime
from typing import List, Optional

from fastapi import Depends

from models.skin.SkinCutometerModel import SkinCutometer
from repositories.skin.SkinCutometerRepository import SkinCutometerRepository
from schemas.pydantic.skin.SkinCutometerSchema import (
    SkinCutometerSchema,
)


class SkinCutometerService:
    skinCutometerRepository: SkinCutometerRepository

    def __init__(
            self,
            skinCutometerRepository: SkinCutometerRepository = Depends(),
    ) -> None:
        self.skinCutometerRepository = skinCutometerRepository

    def list(
            self,
            surveyNo: Optional[int] = None,
            userKey: Optional[int] = None,
            pageSize: Optional[int] = 10,
            startIndex: Optional[int] = 0,
    ) -> List[SkinCutometer]:
        return self.skinCutometerRepository.list(
            surveyNo, userKey, pageSize, startIndex
        )

    def count(
            self,
            surveyNo: Optional[int] = None,
            userKey: Optional[int] = None,
    ) -> int:
        return self.skinCutometerRepository.count(
            surveyNo, userKey
        )

    def get(self, idx: int) -> SkinCutometer:
        return self.skinCutometerRepository.get(SkinCutometer(idx=idx))

    def update(
            self, idx: int, skin_cutometer_body: SkinCutometerSchema
    ) -> SkinCutometer:
        skin_cutometer = self.get(idx)

        update_fields = []
        for field in skin_cutometer_body.__dict__:
            if field in skin_cutometer.__dict__:
                update_fields.append(field)

        for field in update_fields:
            if field != '_sa_instance_state':
                setattr(skin_cutometer, field, getattr(skin_cutometer_body, field))

        return self.skinCutometerRepository.update(skin_cutometer)

    def create(self, skin_cutometer_body: SkinCutometerSchema) -> SkinCutometer:
        return self.skinCutometerRepository.create(
            SkinCutometer(**skin_cutometer_body.dict())
        )

    def deleteForce(self, idx: int) -> None:
        skin_cutometer = self.get(idx)
        return self.skinCutometerRepository.delete(skin_cutometer)

    def delete(self, idx: int) -> None:
        self.update(idx, SkinCutometer(deleted_at=datetime.now()))
