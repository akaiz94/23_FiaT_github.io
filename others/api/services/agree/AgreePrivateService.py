from datetime import datetime
from typing import List, Optional

from fastapi import Depends

from models.agree.AgreePrivateModel import AgreePrivate
from repositories.agree.AgreePrivateRepository import AgreePrivateRepository
from schemas.pydantic.agree.AgreePrivateSchema import (
    AgreePrivateSchema,
)


class AgreePrivateService:
    agreePrivateRepository: AgreePrivateRepository

    def __init__(
            self,
            agreePrivateRepository: AgreePrivateRepository = Depends(),
    ) -> None:
        self.agreePrivateRepository = agreePrivateRepository

    def list(
            self,
            surveyNo: Optional[int] = None,
            pageSize: Optional[int] = 10,
            startIndex: Optional[int] = 0,
    ) -> List[AgreePrivate]:
        return self.agreePrivateRepository.list(
            surveyNo, pageSize, startIndex
        )

    def count(
            self,
            surveyNo: Optional[int] = None
    ) -> int:
        return self.agreePrivateRepository.count(
            surveyNo
        )

    def get(self, visitkey: int) -> AgreePrivate:
        return self.agreePrivateRepository.get(AgreePrivate(visitkey=visitkey))

    def update(
            self, surveyNo: int, agree_private_body: AgreePrivateSchema
    ) -> AgreePrivate:
        agree_private = self.get(surveyNo)

        update_fields = []
        for field in agree_private_body.__dict__:
            if field in agree_private.__dict__:
                update_fields.append(field)

        for field in update_fields:
            if field != '_sa_instance_state':
                setattr(agree_private, field, getattr(agree_private_body, field))

        return self.agreePrivateRepository.update(agree_private)

    def create(self, agree_private_body: AgreePrivateSchema) -> AgreePrivate:
        return self.agreePrivateRepository.create(
            AgreePrivate(**agree_private_body.dict())
        )

    def deleteForce(self, surveyNo: int) -> None:
        agree_private = self.get(surveyNo)
        return self.agreePrivateRepository.delete(agree_private)

    def delete(self, surveyNo: int) -> None:
        self.update(surveyNo, AgreePrivate(deleted_at=datetime.now()))
