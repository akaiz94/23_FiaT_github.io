from typing import List, Optional

from fastapi import Depends

from models.sch.SchDirectModel import SchDirect
from repositories.sch.SchDirectRepository import SchDirectRepository
from schemas.pydantic.sch.SchDirectSchema import (
    SchDirectSchema,
)


class SchDirectService:
    schDirectRepository: SchDirectRepository

    def __init__(
            self,
            schDirectRepository: SchDirectRepository = Depends(),
    ) -> None:
        self.schDirectRepository = schDirectRepository

    def list(
            self,
            skey: Optional[int] = None,
            userkey: Optional[int] = None,
            surveyno: Optional[int] = None,
            pageSize: Optional[int] = 10,
            startIndex: Optional[int] = 0,
    ) -> List[SchDirect]:
        return self.schDirectRepository.list(
            skey, userkey,surveyno, pageSize, startIndex
        )

    def count(
            self,
            skey: Optional[int] = None,
            userkey: Optional[int] = None,
            surveyno: Optional[int] = None,
    ) -> int:
        return self.schDirectRepository.count(
            skey, userkey,surveyno
        )

    def get(self, skey: int) -> SchDirect:
        return self.schDirectRepository.get(SchDirect(skey=skey))

    def update(
            self, skey: int, sch_direct_body: SchDirectSchema
    ) -> SchDirect:
        sch_direct = self.get(skey)

        update_fields = []
        for field in sch_direct_body.__dict__:
            if field in sch_direct.__dict__:
                update_fields.append(field)

        for field in update_fields:
            if field != '_sa_instance_state':
                setattr(sch_direct, field, getattr(sch_direct_body, field))

        return self.schDirectRepository.update(sch_direct)

    def create(self, sch_direct_body: SchDirectSchema) -> SchDirect:
        return self.schDirectRepository.create(
            SchDirect(**sch_direct_body.dict())
        )

    def delete(self, skey: int) -> None:
        sch_direct = self.get(skey)
        return self.schDirectRepository.delete(sch_direct)
