from typing import List, Optional

from fastapi import Depends

from models.sch.SchVisitModel import SchVisit
from repositories.sch.SchVisitRepository import SchVisitRepository
from schemas.pydantic.sch.SchVisitSchema import (
    SchVisitSchema, SchVisitResponseSchema, SchMergedRequestSchema,
)


class SchVisitService:
    schVisitRepository: SchVisitRepository

    def __init__(
            self,
            schVisitRepository: SchVisitRepository = Depends(),
    ) -> None:
        self.schVisitRepository = schVisitRepository

    def list(
            self,
            visitkey: Optional[int] = None,
            m_userkey: Optional[int] = None,
            m_surveyno: Optional[int] = None,
            cstmid: Optional[str] = None,
            ucstmid: Optional[int] = None,
            pageSize: Optional[int] = 10,
            startIndex: Optional[int] = 0,
    ) -> List[SchVisit]:
        return self.schVisitRepository.list(
            visitkey, m_userkey, m_surveyno, cstmid, ucstmid, pageSize, startIndex
        )

    def count(
            self,
            visitkey: Optional[int] = None,
            m_userkey: Optional[int] = None,
            m_surveyno: Optional[int] = None,
            cstmid: Optional[str] = None,
            ucstmid: Optional[int] = None,
    ) -> int:
        return self.schVisitRepository.count(
            visitkey, m_userkey, m_surveyno, cstmid, ucstmid,
        )

    def get_merged_sch_list(
            self,
            visitkey: Optional[int] = None,
            skey: Optional[int] = None,
            surveyno: Optional[int] = None,
            name: Optional[str] = None,
            phone: Optional[str] = None,
            rsvn_date: Optional[str] = None,
            pageSize: Optional[int] = 10,
            startIndex: Optional[int] = 0,
    ) -> List[SchVisitResponseSchema]:
        return self.schVisitRepository.get_merged_sch_list(
            visitkey, skey, surveyno, name, phone, rsvn_date,pageSize,startIndex
        )

    def get_merged_sch_list_count(
            self,
            visitkey: Optional[int] = None,
            skey: Optional[int] = None,
            surveyno: Optional[int] = None,
            name: Optional[str] = None,
            phone: Optional[str] = None,
            rsvn_date: Optional[str] = None,
    ) -> int:
        return self.schVisitRepository.get_merged_sch_list_count(
            visitkey, skey, surveyno, name, phone, rsvn_date
        )



    def get(self, visitkey: int, skey: int) -> SchVisit:
        return self.schVisitRepository.get(SchVisit(visitkey=visitkey, skey=skey))

    def update(
            self, visitkey: int, skey: int, sch_visit_body: SchVisitSchema
    ) -> SchVisit:
        sch_visit = self.get(visitkey, skey)

        update_fields = []
        for field in sch_visit_body.__dict__:
            if field in sch_visit.__dict__:
                update_fields.append(field)

        for field in update_fields:
            if field != '_sa_instance_state':
                setattr(sch_visit, field, getattr(sch_visit_body, field))

        return self.schVisitRepository.update(sch_visit)

    def create(self, sch_visit_body: SchVisitSchema) -> SchVisit:
        return self.schVisitRepository.create(
            SchVisit(**sch_visit_body.dict())
        )

    def delete(self, visitkey: int, skey: int) -> None:
        sch_visit = self.get(visitkey, skey)
        return self.schVisitRepository.delete(sch_visit)
