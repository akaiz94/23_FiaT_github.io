from datetime import datetime
from typing import List, Optional

from fastapi import Depends

from models.hair.HairResultModel import HairResult
from repositories.hair.HairResultRepository import HairResultRepository
from schemas.pydantic.hair.HairResultSchema import (
    HairResultSchema, HairResultResponseSchema,
)


class HairResultService:
    hairResultRepository: HairResultRepository

    def __init__(
            self,
            hairResultRepository: HairResultRepository = Depends(),
    ) -> None:
        self.hairResultRepository = hairResultRepository

    def list(
            self,
            surveyNo: Optional[int] = None,
            userKey: Optional[int] = None,
            name: Optional[str] = None,
            pageSize: Optional[int] = 10,
            startIndex: Optional[int] = 0,
    ) -> List[HairResultResponseSchema]:
        return self.hairResultRepository.list(
            surveyNo, userKey, name, pageSize, startIndex
        )

    def count(
            self,
            surveyNo: Optional[int] = None,
            userKey: Optional[int] = None,
            name: Optional[str] = None,
    ) -> int:
        return self.hairResultRepository.count(
            surveyNo, userKey, name
        )

    def get(self, idx: int) -> HairResultSchema:
        return self.hairResultRepository.get(HairResult(idx=idx))

    def update(
            self, idx: int, hair_result_body: HairResultSchema
    ) -> HairResult:
        hair_result = self.get(idx)

        update_fields = []
        for field in hair_result_body.__dict__:
            if field in hair_result.__dict__:
                update_fields.append(field)

        for field in update_fields:
            if field != '_sa_instance_state':
                setattr(hair_result, field, getattr(hair_result_body, field))

        return self.hairResultRepository.update(hair_result)

    def create(self, hair_result_body: HairResultSchema) -> HairResult:
        return self.hairResultRepository.create(
            HairResult(**hair_result_body.dict())
        )

    def deleteForce(self, idx: int) -> None:
        hair_result = self.get(idx)
        return self.hairResultRepository.delete(hair_result)

    def delete(self, idx: int) -> None:
        self.update(idx, HairResult(deleted_at=datetime.now()))
