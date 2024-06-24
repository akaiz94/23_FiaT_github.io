from typing import List, Optional

from fastapi import Depends
from sqlalchemy.orm import Session

from configs.Database import (
    get_db_connection,
)
from models.skin.SkinVapometerModel import SkinVapometer


class SkinVapometerRepository:
    db: Session

    def __init__(
            self, db: Session = Depends(get_db_connection)
    ) -> None:
        self.db = db

    def list(
            self,
            surveyNo: Optional[int],
            userKey: Optional[int],
            limit: Optional[int],
            start: Optional[int],
    ) -> List[SkinVapometer]:
        query = self.db.query(SkinVapometer)

        if surveyNo:
            query = query.filter_by(surveyNo=surveyNo)
        if userKey:
            query = query.filter_by(userKey=userKey)
        query = query.order_by(SkinVapometer.idx.desc())
        return query.offset(start).limit(limit).all()

    def count(
            self,
            surveyNo: Optional[int],
            userKey: Optional[int],
    ) -> int:
        query = self.db.query(SkinVapometer)

        if surveyNo:
            query = query.filter_by(surveyNo=surveyNo)
        if userKey:
            query = query.filter_by(userKey=userKey)

        return query.count()

    def get(self, skin_vapometer: SkinVapometer) -> SkinVapometer:
        return self.db.get(
            SkinVapometer, (skin_vapometer.idx)
        )

    def create(self, skin_vapometer: SkinVapometer) -> SkinVapometer:
        self.db.add(skin_vapometer)
        self.db.commit()
        self.db.refresh(skin_vapometer)
        return skin_vapometer

    def update(self, skin_vapometer: SkinVapometer) -> SkinVapometer:
        self.db.merge(skin_vapometer)
        self.db.commit()
        return skin_vapometer

    def delete(self, skin_vapometer: SkinVapometer) -> None:
        self.db.delete(skin_vapometer)
        self.db.commit()
        self.db.flush()
