from datetime import datetime
from typing import List, Optional

from fastapi import Depends

from models.agree.ComCodeModel import ComCode
from repositories.agree.ComCodeRepository import ComCodeRepository
from schemas.pydantic.agree.ComCodeSchema import (
    ComCodeSchema,
)


class ComCodeService:
    comCodeRepository: ComCodeRepository

    def __init__(
            self,
            comCodeRepository: ComCodeRepository = Depends(),
    ) -> None:
        self.comCodeRepository = comCodeRepository

    def list(
            self,
            surveyNo: Optional[int] = None,
            pageSize: Optional[int] = 10,
            startIndex: Optional[int] = 0,
    ) -> List[ComCode]:
        return self.comCodeRepository.list(
            surveyNo, pageSize, startIndex
        )

    def count(
            self,
            surveyNo: Optional[int] = None
    ) -> int:
        return self.comCodeRepository.count(
            surveyNo
        )

    def get(self, com_code_id: int) -> ComCode:
        return self.comCodeRepository.get(ComCode(id=com_code_id))

    def update(
            self, com_code_id: int, com_code_body: ComCodeSchema
    ) -> ComCode:
        com_code = self.get(com_code_id)

        update_fields = []
        for field in com_code_body.__dict__:
            if field in com_code.__dict__:
                update_fields.append(field)

        for field in update_fields:
            if field != '_sa_instance_state':
                setattr(com_code, field, getattr(com_code_body, field))

        return self.comCodeRepository.update(com_code_id, com_code)

    def create(self, com_code_body: ComCodeSchema) -> ComCode:
        return self.comCodeRepository.create(
            ComCode(**com_code_body.dict())
        )

    def deleteForce(self, com_code_id: int) -> None:
        com_code = self.get(com_code_id)
        return self.comCodeRepository.delete(com_code)

    def delete(self, com_code_id: int) -> None:
        self.update(com_code_id, ComCode(deleted_at=datetime.now()))
