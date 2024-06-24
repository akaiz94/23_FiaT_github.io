from datetime import datetime
from typing import List, Optional

from fastapi import Depends

from models.hair.HairMainModel import HairMain
from repositories.hair.HairMainRepository import HairMainRepository
from schemas.pydantic.hair.HairMainSchema import (
    HairMainSchema,
)


class HairMainService:
    hairMainRepository: HairMainRepository

    def __init__(
            self,
            hairMainRepository: HairMainRepository = Depends(),
    ) -> None:
        self.hairMainRepository = hairMainRepository

    def list(
            self,
            surveyNo: Optional[int] = None,
            userKey: Optional[int] = None,
            Name: Optional[str] = None,
            pageSize: Optional[int] = 10,
            startIndex: Optional[int] = 0,
    ) -> List[HairMain]:
        return self.hairMainRepository.list(
            surveyNo, userKey, Name, pageSize, startIndex
        )

    def count(
            self,
            surveyNo: Optional[int] = None,
            userKey: Optional[int] = None,
            Name: Optional[str] = None,
    ) -> int:
        return self.hairMainRepository.count(
            surveyNo, userKey, Name
        )

    def get(self, idx: int) -> HairMain:
        return self.hairMainRepository.get(HairMain(idx=idx))

    def update(
            self, idx: int, hair_main_body: HairMainSchema
    ) -> HairMain:
        hair_main = self.get(idx)

        update_fields = []
        for field in hair_main_body.__dict__:
            if field in hair_main.__dict__:
                update_fields.append(field)

        for field in update_fields:
            if field != '_sa_instance_state':
                setattr(hair_main, field, getattr(hair_main_body, field))

        return self.hairMainRepository.update(hair_main)

    def create(self, hair_main_body: HairMainSchema) -> HairMain:
        return self.hairMainRepository.create(
            HairMain(**hair_main_body.dict())
        )

    def deleteForce(self, idx: int) -> None:
        hair_main = self.get(idx)
        return self.hairMainRepository.delete(hair_main)

    def delete(self, idx: int) -> None:
        self.update(idx, HairMain(deleted_at=datetime.now()))
