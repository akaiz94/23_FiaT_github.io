from datetime import datetime
from typing import List, Optional

from fastapi import Depends

from models.hair.HairCenterModel import HairCenter
from repositories.hair.HairCenterRepository import HairCenterRepository
from schemas.pydantic.hair.HairCenterSchema import (
    HairCenterSchema,
)


class HairCenterService:
    hairCenterRepository: HairCenterRepository

    def __init__(
            self,
            hairCenterRepository: HairCenterRepository = Depends(),
    ) -> None:
        self.hairCenterRepository = hairCenterRepository

    def list(
            self,
            surveyNo: Optional[int] = None,
            userKey: Optional[int] = None,
            Name: Optional[str] = None,
            pageSize: Optional[int] = 10,
            startIndex: Optional[int] = 0,
    ) -> List[HairCenter]:
        return self.hairCenterRepository.list(
            surveyNo, userKey, Name, pageSize, startIndex
        )

    def count(
            self,
            surveyNo: Optional[int] = None,
            userKey: Optional[int] = None,
            Name: Optional[str] = None,
    ) -> int:
        return self.hairCenterRepository.count(
            surveyNo, userKey, Name
        )

    def get(self, idx: int) -> HairCenter:
        return self.hairCenterRepository.get(HairCenter(idx=idx))

    def update(
            self, idx: int, hair_center_body: HairCenterSchema
    ) -> HairCenter:
        hair_center = self.get(idx)

        update_fields = []
        for field in hair_center_body.__dict__:
            if field in hair_center.__dict__:
                update_fields.append(field)

        for field in update_fields:
            if field != '_sa_instance_state':
                setattr(hair_center, field, getattr(hair_center_body, field))

        return self.hairCenterRepository.update(hair_center)

    def create(self, hair_center_body: HairCenterSchema) -> HairCenter:
        return self.hairCenterRepository.create(
            HairCenter(**hair_center_body.dict())
        )

    def deleteForce(self, idx: int) -> None:
        hair_center = self.get(idx)
        return self.hairCenterRepository.delete(hair_center)

    def delete(self, idx: int) -> None:
        self.update(idx, HairCenter(deleted_at=datetime.now()))
