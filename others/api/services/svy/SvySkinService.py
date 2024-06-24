from datetime import datetime
from typing import List, Optional

from fastapi import Depends

from models.svy.SvySkinModel import SvySkin
from repositories.svy.SvySkinRepository import SvySkinRepository
from schemas.pydantic.svy.SvySkinSchema import (
    SvySkinSchema,
)


class SvySkinService:
    svySkinRepository: SvySkinRepository

    def __init__(
            self,
            svySkinRepository: SvySkinRepository = Depends(),
    ) -> None:
        self.svySkinRepository = svySkinRepository

    def list(
            self,
            surveyNo: Optional[int] = None,
            surveyDate: Optional[str] = None,
            userkey: Optional[int] = None,
            pageSize: Optional[int] = 10,
            startIndex: Optional[int] = 0,
    ) -> List[SvySkin]:
        return self.svySkinRepository.list(
            surveyNo, surveyDate, userkey, pageSize, startIndex
        )

    def count(
            self,
            surveyNo: Optional[int] = None,
            surveyDate: Optional[str] = None,
            userkey: Optional[int] = None,
    ) -> int:
        return self.svySkinRepository.count(
            surveyNo, surveyDate, userkey
        )

    def get(self, surveyNo: int) -> SvySkin:
        return self.svySkinRepository.get(SvySkin(surveyNo=surveyNo))

    def update(
            self, surveyNo: int, svy_skin_body: SvySkinSchema
    ) -> SvySkin:
        svy_skin = self.get(surveyNo)

        update_fields = []
        for field in svy_skin_body.__dict__:
            if field in svy_skin.__dict__:
                update_fields.append(field)

        for field in update_fields:
            if field != '_sa_instance_state':
                setattr(svy_skin, field, getattr(svy_skin_body, field))

        return self.svySkinRepository.update(svy_skin)

    def create(self, svy_skin_body: SvySkinSchema) -> SvySkin:
        return self.svySkinRepository.create(
            SvySkin(**svy_skin_body.dict())
        )

    def deleteForce(self, surveyNo: int) -> None:
        svy_skin = self.get(surveyNo)
        return self.svySkinRepository.delete(surveyNo)

    def delete(self, surveyNo: int) -> None:
        self.update(surveyNo, SvySkin(deleted_at=datetime.now()))
