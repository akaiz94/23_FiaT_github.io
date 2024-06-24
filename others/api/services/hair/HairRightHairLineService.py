from datetime import datetime
from typing import List, Optional

from fastapi import Depends

from models.hair.HairRightHairLineModel import HairRightHairLine
from repositories.hair.HairRightHairLineRepository import HairRightHairLineRepository
from schemas.pydantic.hair.HairRightHairLineSchema import (
    HairRightHairLineSchema,
)


class HairRightHairLineService:
    hairRightHairLineRepository: HairRightHairLineRepository

    def __init__(
            self,
            hairRightHairLineRepository: HairRightHairLineRepository = Depends(),
    ) -> None:
        self.hairRightHairLineRepository = hairRightHairLineRepository

    def list(
            self,
            surveyNo: Optional[int] = None,
            userKey: Optional[int] = None,
            Name: Optional[str] = None,
            pageSize: Optional[int] = 10,
            startIndex: Optional[int] = 0,
    ) -> List[HairRightHairLine]:
        return self.hairRightHairLineRepository.list(
            surveyNo, userKey, Name, pageSize, startIndex
        )

    def count(
            self,
            surveyNo: Optional[int] = None,
            userKey: Optional[int] = None,
            Name: Optional[str] = None,
    ) -> int:
        return self.hairRightHairLineRepository.count(
            surveyNo, userKey, Name
        )

    def get(self, idx: int) -> HairRightHairLine:
        return self.hairRightHairLineRepository.get(HairRightHairLine(idx=idx))

    def update(
            self, idx: int, hair_right_hair_line_body: HairRightHairLineSchema
    ) -> HairRightHairLine:
        hair_right_hair_line = self.get(idx)

        update_fields = []
        for field in hair_right_hair_line_body.__dict__:
            if field in hair_right_hair_line.__dict__:
                update_fields.append(field)

        for field in update_fields:
            if field != '_sa_instance_state':
                setattr(hair_right_hair_line, field, getattr(hair_right_hair_line_body, field))

        return self.hairRightHairLineRepository.update(hair_right_hair_line)

    def create(self, hair_right_hair_line_body: HairRightHairLineSchema) -> HairRightHairLine:
        return self.hairRightHairLineRepository.create(
            HairRightHairLine(**hair_right_hair_line_body.dict())
        )

    def deleteForce(self, idx: int) -> None:
        hair_right_hair_line = self.get(idx)
        return self.hairRightHairLineRepository.delete(hair_right_hair_line)

    def delete(self, idx: int) -> None:
        self.update(idx, HairRightHairLine(deleted_at=datetime.now()))
