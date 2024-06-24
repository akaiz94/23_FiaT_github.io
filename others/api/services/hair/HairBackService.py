from datetime import datetime
from typing import List, Optional

from fastapi import Depends

from models.hair.HairBackModel import HairBack
from repositories.hair.HairBackRepository import HairBackRepository
from schemas.pydantic.hair.HairBackSchema import (
    HairBackSchema,
)


class HairBackService:
    hairBackRepository: HairBackRepository

    def __init__(
            self,
            hairBackRepository: HairBackRepository = Depends(),
    ) -> None:
        self.hairBackRepository = hairBackRepository

    def list(
            self,
            surveyNo: Optional[int] = None,
            userKey: Optional[int] = None,
            Name: Optional[str] = None,
            pageSize: Optional[int] = 10,
            startIndex: Optional[int] = 0,
    ) -> List[HairBack]:
        return self.hairBackRepository.list(
            surveyNo, userKey, Name, pageSize, startIndex
        )

    def count(
            self,
            surveyNo: Optional[int] = None,
            userKey: Optional[int] = None,
            Name: Optional[str] = None,
    ) -> int:
        return self.hairBackRepository.count(
            surveyNo, userKey, Name
        )

    def get(self, idx: int) -> HairBack:
        return self.hairBackRepository.get(HairBack(idx=idx))

    def update(
            self, idx: int, hair_back_body: HairBackSchema
    ) -> HairBack:
        hair_back = self.get(idx)

        update_fields = []
        for field in hair_back_body.__dict__:
            if field in hair_back.__dict__:
                update_fields.append(field)

        for field in update_fields:
            if field != '_sa_instance_state':
                setattr(hair_back, field, getattr(hair_back_body, field))

        return self.hairBackRepository.update(hair_back)

    def create(self, hair_back_body: HairBackSchema) -> HairBack:
        return self.hairBackRepository.create(
            HairBack(**hair_back_body.dict())
        )

    def deleteForce(self, idx: int) -> None:
        hair_back = self.get(idx)
        return self.hairBackRepository.delete(hair_back)

    def delete(self, idx: int) -> None:
        self.update(idx, HairBack(deleted_at=datetime.now()))
