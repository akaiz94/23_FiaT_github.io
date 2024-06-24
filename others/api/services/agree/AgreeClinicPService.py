from datetime import datetime
from typing import List, Optional

from fastapi import Depends

from models.agree.AgreeClinicPModel import AgreeClinicP
from repositories.agree.AgreeClinicPRepository import AgreeClinicPRepository
from schemas.pydantic.agree.AgreeClinicPSchema import (
    AgreeClinicPSchema,
)


class AgreeClinicPService:
    agreeClinicPRepository: AgreeClinicPRepository

    def __init__(
            self,
            agreeClinicPRepository: AgreeClinicPRepository = Depends(),
    ) -> None:
        self.agreeClinicPRepository = agreeClinicPRepository

    def list(
            self,
            surveyNo: Optional[int] = None,
            visitkey: Optional[int] = None,
            userKey: Optional[int] = None,
            pageSize: Optional[int] = 10,
            startIndex: Optional[int] = 0,
    ) -> List[AgreeClinicP]:
        return self.agreeClinicPRepository.list(
            surveyNo, visitkey, userKey, pageSize, startIndex
        )

    def count(
            self,
            surveyNo: Optional[int] = None,
            visitkey: Optional[int] = None,
            userKey: Optional[int] = None,
    ) -> int:
        return self.agreeClinicPRepository.count(
            surveyNo, visitkey, userKey
        )

    def get(self, visitkey: int) -> AgreeClinicP:
        return self.agreeClinicPRepository.get(AgreeClinicP(visitkey=visitkey))

    def update(
            self, surveyNo: int, agree_clinic_p_body: AgreeClinicPSchema
    ) -> AgreeClinicP:
        agree_clinic_p = self.get(surveyNo)

        update_fields = []
        for field in agree_clinic_p_body.__dict__:
            if field in agree_clinic_p.__dict__:
                update_fields.append(field)

        for field in update_fields:
            if field != '_sa_instance_state':
                setattr(agree_clinic_p, field, getattr(agree_clinic_p_body, field))

        return self.agreeClinicPRepository.update(agree_clinic_p)

    def create(self, agree_clinic_p_body: AgreeClinicPSchema) -> AgreeClinicP:
        return self.agreeClinicPRepository.create(
            AgreeClinicP(**agree_clinic_p_body.dict())
        )

    def deleteForce(self, surveyNo: int) -> None:
        agree_clinic_p = self.get(surveyNo)
        return self.agreeClinicPRepository.delete(agree_clinic_p)

    def delete(self, surveyNo: int) -> None:
        self.update(surveyNo, AgreeClinicP(deleted_at=datetime.now()))
