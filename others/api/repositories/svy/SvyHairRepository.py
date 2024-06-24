from typing import List, Optional

from fastapi import Depends
from sqlalchemy.orm import Session

from configs.Database import (
    get_db_connection,
)
from models.svy.SvyHairModel import SvyHair


class SvyHairRepository:
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
    ) -> List[SvyHair]:
        query = self.db.query(SvyHair)

        if surveyNo:
            query = query.filter_by(surveyNo=surveyNo)
        if surveyDate:
            query = query.filter_by(surveyDate=surveyDate)
        if userkey:
            query = query.filter_by(userkey=userkey)
        query = query.order_by(SvyHair.surveyNo.desc())
        return query.offset(start).limit(limit).all()

    def count(
            self,
            surveyNo: Optional[int],
            surveyDate: Optional[str],
            userkey: Optional[str],
    ) -> int:
        query = self.db.query(SvyHair)

        if surveyNo:
            query = query.filter_by(surveyNo=surveyNo)
        if surveyDate:
            query = query.filter_by(surveyDate=surveyDate)
        if userkey:
            query = query.filter_by(userkey=userkey)

        return query.count()

    def get(self, svy_hair: SvyHair) -> SvyHair:
        return self.db.get(
            SvyHair, (svy_hair.surveyNo)
        )

    def create(self, svy_hair: SvyHair) -> SvyHair:
        self.db.add(svy_hair)
        self.db.commit()
        self.db.refresh(svy_hair)
        return svy_hair

    def update(self, svy_hair: SvyHair) -> SvyHair:
        self.db.merge(svy_hair)
        self.db.commit()
        return svy_hair

    def delete(self, svy_hair: SvyHair) -> None:
        self.db.delete(svy_hair)
        self.db.commit()
        self.db.flush()
