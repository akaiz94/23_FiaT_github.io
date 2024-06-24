from typing import List, Optional

from fastapi import Depends
from sqlalchemy.orm import Session

from configs.Database import (
    get_db_connection,
)
from models.agree.AgreeClinicPModel import AgreeClinicP


class AgreeClinicPRepository:
    db: Session

    def __init__(
            self, db: Session = Depends(get_db_connection)
    ) -> None:
        self.db = db

    def list(
            self,
            surveyNo: Optional[int],
            visitkey: Optional[int],
            userKey: Optional[int],
            limit: Optional[int],
            start: Optional[int],
    ) -> List[AgreeClinicP]:
        query = self.db.query(AgreeClinicP)

        if visitkey:
            query = query.filter_by(visitkey=visitkey)
        if surveyNo:
            query = query.filter_by(surveyNo=surveyNo)
        if userKey:
            query = query.filter_by(userKey=userKey)
        query = query.order_by(AgreeClinicP.surveyNo.desc())
        return query.offset(start).limit(limit).all()

    def count(
            self,
            surveyNo: Optional[int],
            visitkey: Optional[int],
            userKey: Optional[int],
    ) -> int:
        query = self.db.query(AgreeClinicP)

        if visitkey:
            query = query.filter_by(visitkey=visitkey)
        if surveyNo:
            query = query.filter_by(surveyNo=surveyNo)
        if userKey:
            query = query.filter_by(userKey=userKey)

        return query.count()

    def get(self, agree_clinic_p: AgreeClinicP) -> AgreeClinicP:
        return self.db.get(
            AgreeClinicP, (agree_clinic_p.visitkey)
        )

    def create(self, agree_clinic_p: AgreeClinicP) -> AgreeClinicP:
        self.db.add(agree_clinic_p)
        self.db.commit()
        self.db.refresh(agree_clinic_p)
        return agree_clinic_p

    def update(self, agree_clinic_p: AgreeClinicP) -> AgreeClinicP:
        self.db.merge(agree_clinic_p)
        self.db.commit()
        return agree_clinic_p

    def delete(self, agree_clinic_p: AgreeClinicP) -> None:
        self.db.delete(agree_clinic_p)
        self.db.commit()
        self.db.flush()
