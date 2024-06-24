from datetime import datetime
from typing import List, Optional

from fastapi import Depends

from models.agree.AgreeClinicRModel import AgreeClinicR
from repositories.agree.AgreeClinicRRepository import AgreeClinicRRepository
from schemas.pydantic.agree.AgreeClinicRSchema import (
    AgreeClinicRSchema,
)


class AgreeClinicRService:
    agreeClinicRRepository: AgreeClinicRRepository

    def __init__(
            self,
            agreeClinicRRepository: AgreeClinicRRepository = Depends(),
    ) -> None:
        self.agreeClinicRRepository = agreeClinicRRepository

    def list(
            self,
            surveyNo: Optional[int] = None,
            pageSize: Optional[int] = 10,
            startIndex: Optional[int] = 0,
    ) -> List[AgreeClinicR]:
        return self.agreeClinicRRepository.list(
            surveyNo, pageSize, startIndex
        )

    def count(
            self,
            surveyNo: Optional[int] = None
    ) -> int:
        return self.agreeClinicRRepository.count(
            surveyNo
        )

    def get(self, surveyNo: int) -> AgreeClinicR:
        return self.agreeClinicRRepository.get(AgreeClinicR(surveyNo=surveyNo))

    def update(
            self, surveyNo: int, agree_clinic_r_body: AgreeClinicRSchema
    ) -> AgreeClinicR:
        agree_clinic_r = self.get(surveyNo)

        update_fields = []
        for field in agree_clinic_r_body.__dict__:
            if field in agree_clinic_r.__dict__:
                update_fields.append(field)

        for field in update_fields:
            if field != '_sa_instance_state':
                setattr(agree_clinic_r, field, getattr(agree_clinic_r_body, field))

        return self.agreeClinicRRepository.update(agree_clinic_r)

    def create(self, agree_clinic_r_body: AgreeClinicRSchema) -> AgreeClinicR:
        return self.agreeClinicRRepository.create(
            AgreeClinicR(**agree_clinic_r_body.dict())
        )

    def deleteForce(self, surveyNo: int) -> None:
        agree_clinic_r = self.get(surveyNo)
        return self.agreeClinicRRepository.delete(agree_clinic_r)

    def delete(self, surveyNo: int) -> None:
        self.update(surveyNo, AgreeClinicR(deleted_at=datetime.now()))
