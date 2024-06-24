from datetime import datetime
from typing import List, Optional

from fastapi import Depends

from models.hair.HairFrontCenterModel import HairFrontCenter
from repositories.hair.HairFrontCenterRepository import HairFrontCenterRepository
from schemas.pydantic.hair.HairFrontCenterSchema import (
    HairFrontCenterSchema,
)


class HairFrontCenterService:
    hairFrontCenterRepository: HairFrontCenterRepository

    def __init__(
            self,
            hairFrontCenterRepository: HairFrontCenterRepository = Depends(),
    ) -> None:
        self.hairFrontCenterRepository = hairFrontCenterRepository

    def list(
            self,
            surveyNo: Optional[int] = None,
            userKey: Optional[int] = None,
            Name: Optional[str] = None,
            pageSize: Optional[int] = 10,
            startIndex: Optional[int] = 0,
    ) -> List[HairFrontCenter]:
        return self.hairFrontCenterRepository.list(
            surveyNo, userKey, Name, pageSize, startIndex
        )

    def count(
            self,
            surveyNo: Optional[int] = None,
            userKey: Optional[int] = None,
            Name: Optional[str] = None,
    ) -> int:
        return self.hairFrontCenterRepository.count(
            surveyNo, userKey, Name
        )

    def get(self, idx: int) -> HairFrontCenter:
        return self.hairFrontCenterRepository.get(HairFrontCenter(idx=idx))

    def update(
            self, idx: int, hair_front_center_body: HairFrontCenterSchema
    ) -> HairFrontCenter:
        hair_front_center = self.get(idx)

        update_fields = []
        for field in hair_front_center_body.__dict__:
            if field in hair_front_center.__dict__:
                update_fields.append(field)

        for field in update_fields:
            if field != '_sa_instance_state':
                setattr(hair_front_center, field, getattr(hair_front_center_body, field))

        return self.hairFrontCenterRepository.update(hair_front_center)

    def create(self, hair_front_center_body: HairFrontCenterSchema) -> HairFrontCenter:
        return self.hairFrontCenterRepository.create(
            HairFrontCenter(**hair_front_center_body.dict())
        )

    def deleteForce(self, idx: int) -> None:
        hair_front_center = self.get(idx)
        return self.hairFrontCenterRepository.delete(hair_front_center)

    def delete(self, idx: int) -> None:
        self.update(idx, HairFrontCenter(deleted_at=datetime.now()))
