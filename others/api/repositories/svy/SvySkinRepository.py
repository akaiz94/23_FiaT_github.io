from typing import List, Optional

from fastapi import Depends
from sqlalchemy.orm import Session

from configs.Database import (
    get_db_connection,
)
from models.svy.SvySkinModel import SvySkin


class SvySkinRepository:
    db: Session

    def __init__(
            self, db: Session = Depends(get_db_connection)
    ) -> None:
        self.db = db

    def list(
            self,
            surveyNo: Optional[int],
            surveyDate: Optional[str],
            userkey: Optional[str],
            limit: Optional[int],
            start: Optional[int],
    ) -> List[SvySkin]:
        query = self.db.query(SvySkin)

        if surveyNo:
            query = query.filter_by(surveyNo=surveyNo)
        if surveyDate:
            query = query.filter_by(surveyDate=surveyDate)
        if userkey:
            query = query.filter_by(userkey=userkey)

        query = query.order_by(SvySkin.surveyNo.desc())
        return query.offset(start).limit(limit).all()

    def count(
            self,
            surveyNo: Optional[int],
            surveyDate: Optional[str],
            userkey: Optional[str],
    ) -> int:
        query = self.db.query(SvySkin)

        if surveyNo:
            query = query.filter_by(surveyNo=surveyNo)
        if surveyDate:
            query = query.filter_by(surveyDate=surveyDate)
        if userkey:
            query = query.filter_by(userkey=userkey)

        return query.count()

    def get(self, svy_skin: SvySkin) -> SvySkin:
        return self.db.get(
            SvySkin, (svy_skin.surveyNo)
        )

    def create(self, svy_skin: SvySkin) -> SvySkin:
        self.db.add(svy_skin)
        self.db.commit()
        self.db.refresh(svy_skin)
        return svy_skin

    def update(self, svy_skin: SvySkin) -> SvySkin:
        self.db.merge(svy_skin)
        self.db.commit()
        return svy_skin

    def delete(self, svy_skin: SvySkin) -> None:
        self.db.delete(svy_skin)
        self.db.commit()
        self.db.flush()
