from datetime import datetime
from typing import List, Optional

from fastapi import Depends

from models.skin.SkinVapometerModel import SkinVapometer
from repositories.skin.SkinVapometerRepository import SkinVapometerRepository
from schemas.pydantic.skin.SkinVapometerSchema import (
    SkinVapometerSchema,
)


class SkinVapometerService:
    skinVapometerRepository: SkinVapometerRepository

    def __init__(
            self,
            skinVapometerRepository: SkinVapometerRepository = Depends(),
    ) -> None:
        self.skinVapometerRepository = skinVapometerRepository

    def list(
            self,
            surveyNo: Optional[int] = None,
            userKey: Optional[int] = None,
            pageSize: Optional[int] = 10,
            startIndex: Optional[int] = 0,
    ) -> List[SkinVapometer]:
        return self.skinVapometerRepository.list(
            surveyNo, userKey, pageSize, startIndex
        )

    def count(
            self,
            surveyNo: Optional[int] = None,
            userKey: Optional[int] = None,
    ) -> int:
        return self.skinVapometerRepository.count(
            surveyNo, userKey
        )

    def get(self, idx: int) -> SkinVapometer:
        return self.skinVapometerRepository.get(SkinVapometer(idx=idx))

    def update(
            self, surveyNo: int, skin_vapometer_body: SkinVapometerSchema
    ) -> SkinVapometer:
        skin_vapometer = self.get(surveyNo)

        update_fields = []
        for field in skin_vapometer_body.__dict__:
            if field in skin_vapometer.__dict__:
                update_fields.append(field)

        for field in update_fields:
            if field != '_sa_instance_state':
                setattr(skin_vapometer, field, getattr(skin_vapometer_body, field))

        return self.skinVapometerRepository.update(skin_vapometer)

    def create(self, skin_vapometer_body: SkinVapometerSchema) -> SkinVapometer:
        return self.skinVapometerRepository.create(
            SkinVapometer(**skin_vapometer_body.dict())
        )

    def deleteForce(self, idx: int) -> None:
        skin_vapometer = self.get(idx)
        return self.skinVapometerRepository.delete(skin_vapometer)

    def delete(self, idx: int) -> None:
        self.update(idx, SkinVapometer(deleted_at=datetime.now()))
