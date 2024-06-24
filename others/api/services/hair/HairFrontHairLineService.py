from datetime import datetime
from typing import List, Optional

from fastapi import Depends

from models.hair.HairFrontHairLineModel import HairFrontHairLine
from repositories.hair.HairFrontHairLineRepository import HairFrontHairLineRepository
from schemas.pydantic.hair.HairFrontHairLineSchema import (
    HairFrontHairLineSchema,
)


class HairFrontHairLineService:
    hairFrontHairLineRepository: HairFrontHairLineRepository

    def __init__(
            self,
            hairFrontHairLineRepository: HairFrontHairLineRepository = Depends(),
    ) -> None:
        self.hairFrontHairLineRepository = hairFrontHairLineRepository

    def list(
            self,
            surveyNo: Optional[int] = None,
            userKey: Optional[int] = None,
            Name: Optional[str] = None,
            pageSize: Optional[int] = 10,
            startIndex: Optional[int] = 0,
    ) -> List[HairFrontHairLine]:
        return self.hairFrontHairLineRepository.list(
            surveyNo, userKey, Name, pageSize, startIndex
        )

    def count(
            self,
            surveyNo: Optional[int] = None,
            userKey: Optional[int] = None,
            Name: Optional[str] = None,
    ) -> int:
        return self.hairFrontHairLineRepository.count(
            surveyNo, userKey, Name
        )

    def get(self, idx: int) -> HairFrontHairLine:
        return self.hairFrontHairLineRepository.get(HairFrontHairLine(idx=idx))

    def update(
            self, idx: int, hair_front_hair_line_body: HairFrontHairLineSchema
    ) -> HairFrontHairLine:
        hair_front_hair_line = self.get(idx)

        update_fields = []
        for field in hair_front_hair_line_body.__dict__:
            if field in hair_front_hair_line.__dict__:
                update_fields.append(field)

        for field in update_fields:
            if field != '_sa_instance_state':
                setattr(hair_front_hair_line, field, getattr(hair_front_hair_line_body, field))

        return self.hairFrontHairLineRepository.update(hair_front_hair_line)

    def create(self, hair_front_hair_line_body: HairFrontHairLineSchema) -> HairFrontHairLine:
        return self.hairFrontHairLineRepository.create(
            HairFrontHairLine(**hair_front_hair_line_body.dict())
        )

    def deleteForce(self, idx: int) -> None:
        hair_front_hair_line = self.get(idx)
        return self.hairFrontHairLineRepository.delete(hair_front_hair_line)

    def delete(self, idx: int) -> None:
        self.update(idx, HairFrontHairLine(deleted_at=datetime.now()))
