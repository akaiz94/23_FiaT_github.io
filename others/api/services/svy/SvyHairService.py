from datetime import datetime
from typing import List, Optional

from fastapi import Depends

from models.svy.SvyHairModel import SvyHair
from repositories.svy.SvyHairRepository import SvyHairRepository
from schemas.pydantic.svy.SvyHairSchema import (
    SvyHairSchema,
)


class SvyHairService:
    svyHairRepository: SvyHairRepository

    def __init__(
            self,
            svyHairRepository: SvyHairRepository = Depends(),
    ) -> None:
        self.svyHairRepository = svyHairRepository

    def list(
            self,
            surveyNo: Optional[int] = None,
            surveyDate: Optional[str] = None,
            userkey: Optional[int] = None,
            pageSize: Optional[int] = 10,
            startIndex: Optional[int] = 0,
    ) -> List[SvyHair]:
        return self.svyHairRepository.list(
            surveyNo, surveyDate, userkey, pageSize, startIndex
        )

    def count(
            self,
            surveyNo: Optional[int] = None,
            surveyDate: Optional[str] = None,
            userkey: Optional[int] = None,
    ) -> int:
        return self.svyHairRepository.count(
            surveyNo, surveyDate, userkey
        )

    def get(self, surveyNo: int) -> SvyHair:
        return self.svyHairRepository.get(SvyHair(surveyNo=surveyNo))

    def update(
            self, surveyNo: int, svy_hair_body: SvyHairSchema
    ) -> SvyHair:
        svy_hair = self.get(surveyNo)

        update_fields = []
        for field in svy_hair_body.__dict__:
            if field in svy_hair.__dict__:
                update_fields.append(field)

        for field in update_fields:
            if field != '_sa_instance_state':
                setattr(svy_hair, field, getattr(svy_hair_body, field))

        return self.svyHairRepository.update(svy_hair)

    def create(self, svy_hair_body: SvyHairSchema) -> SvyHair:
        return self.svyHairRepository.create(
            SvyHair(**svy_hair_body.dict())
        )

    def deleteForce(self, surveyNo: int) -> None:
        svy_hair = self.get(surveyNo)
        return self.svyHairRepository.delete(svy_hair)

    def delete(self, surveyNo: int) -> None:
        self.update(surveyNo, SvyHair(deleted_at=datetime.now()))
