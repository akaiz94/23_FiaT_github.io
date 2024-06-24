from datetime import datetime
from typing import List, Optional

from fastapi import Depends

from models.hair.HairLeftHairLineModel import HairLeftHairLine
from repositories.hair.HairLeftHairLineRepository import HairLeftHairLineRepository
from schemas.pydantic.hair.HairLeftHairLineSchema import (
    HairLeftHairLineSchema,
)


class HairLeftHairLineService:
    hairLeftHairLineRepository: HairLeftHairLineRepository

    def __init__(
            self,
            hairLeftHairLineRepository: HairLeftHairLineRepository = Depends(),
    ) -> None:
        self.hairLeftHairLineRepository = hairLeftHairLineRepository

    def list(
            self,
            surveyNo: Optional[int] = None,
            userKey: Optional[int] = None,
            Name: Optional[str] = None,
            pageSize: Optional[int] = 10,
            startIndex: Optional[int] = 0,
    ) -> List[HairLeftHairLine]:
        return self.hairLeftHairLineRepository.list(
            surveyNo, userKey, Name, pageSize, startIndex
        )

    def count(
            self,
            surveyNo: Optional[int] = None,
            userKey: Optional[int] = None,
            Name: Optional[str] = None,
    ) -> int:
        return self.hairLeftHairLineRepository.count(
            surveyNo, userKey, Name
        )

    def get(self, idx: int) -> HairLeftHairLine:
        return self.hairLeftHairLineRepository.get(HairLeftHairLine(idx=idx))

    def update(
            self, idx: int, hair_left_hair_line_body: HairLeftHairLineSchema
    ) -> HairLeftHairLine:
        hair_left_hair_line = self.get(idx)

        update_fields = []
        for field in hair_left_hair_line_body.__dict__:
            if field in hair_left_hair_line.__dict__:
                update_fields.append(field)

        for field in update_fields:
            if field != '_sa_instance_state':
                setattr(hair_left_hair_line, field, getattr(hair_left_hair_line_body, field))

        return self.hairLeftHairLineRepository.update(hair_left_hair_line)

    def create(self, hair_left_hair_line_body: HairLeftHairLineSchema) -> HairLeftHairLine:
        return self.hairLeftHairLineRepository.create(
            HairLeftHairLine(**hair_left_hair_line_body.dict())
        )

    def deleteForce(self, idx: int) -> None:
        hair_left_hair_line = self.get(idx)
        return self.hairLeftHairLineRepository.delete(hair_left_hair_line)

    def delete(self, idx: int) -> None:
        self.update(idx, HairLeftHairLine(deleted_at=datetime.now()))
