from typing import List, Optional

from fastapi import Depends
from sqlalchemy.orm import Session

from configs.Database import (
    get_db_connection,
)
from models.agree.AgreeClinicRModel import AgreeClinicR


class AgreeClinicRRepository:
    db: Session

    def __init__(
            self, db: Session = Depends(get_db_connection)
    ) -> None:
        self.db = db

    def list(
            self,
            visitkey: Optional[str],
            limit: Optional[int],
            start: Optional[int],
    ) -> List[AgreeClinicR]:
        query = self.db.query(AgreeClinicR)

        if visitkey:
            query = query.filter_by(visitkey=visitkey)
        query = query.order_by(AgreeClinicR.surveyNo.desc())
        return query.offset(start).limit(limit).all()

    def count(
            self,
            visitkey: Optional[int]
    ) -> int:
        query = self.db.query(AgreeClinicR)

        if visitkey:
            query = query.filter_by(visitkey=visitkey)

        return query.count()

    def get(self, agree_clinic_r: AgreeClinicR) -> AgreeClinicR:
        return self.db.get(
            AgreeClinicR, (agree_clinic_r.visitkey)
        )

    def create(self, agree_clinic_r: AgreeClinicR) -> AgreeClinicR:
        self.db.add(agree_clinic_r)
        self.db.commit()
        self.db.refresh(agree_clinic_r)
        return agree_clinic_r

    def update(self, agree_clinic_r: AgreeClinicR) -> AgreeClinicR:
        self.db.merge(agree_clinic_r)
        self.db.commit()
        return agree_clinic_r

    def delete(self, agree_clinic_r: AgreeClinicR) -> None:
        self.db.delete(agree_clinic_r)
        self.db.commit()
        self.db.flush()
