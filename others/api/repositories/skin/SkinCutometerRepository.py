from typing import List, Optional

from fastapi import Depends
from sqlalchemy.orm import Session

from configs.Database import (
    get_db_connection,
)
from models.skin.SkinCutometerModel import SkinCutometer


class SkinCutometerRepository:
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
    ) -> List[SkinCutometer]:
        query = self.db.query(SkinCutometer)

        if surveyNo:
            query = query.filter_by(surveyNo=surveyNo)
        if userKey:
            query = query.filter_by(userKey=userKey)
        query = query.order_by(SkinCutometer.idx.desc())
        return query.offset(start).limit(limit).all()

    def count(
            self,
            surveyNo: Optional[int],
            userKey: Optional[int],
    ) -> int:
        query = self.db.query(SkinCutometer)

        if surveyNo:
            query = query.filter_by(surveyNo=surveyNo)
        if userKey:
            query = query.filter_by(userKey=userKey)

        return query.count()

    def get(self, skin_cutometer: SkinCutometer) -> SkinCutometer:
        return self.db.get(
            SkinCutometer, (skin_cutometer.idx)
        )

    def create(self, skin_cutometer: SkinCutometer) -> SkinCutometer:
        self.db.add(skin_cutometer)
        self.db.commit()
        self.db.refresh(skin_cutometer)
        return skin_cutometer

    def update(self, skin_cutometer: SkinCutometer) -> SkinCutometer:
        self.db.merge(skin_cutometer)
        self.db.commit()
        return skin_cutometer

    def delete(self, skin_cutometer: SkinCutometer) -> None:
        self.db.delete(skin_cutometer)
        self.db.commit()
        self.db.flush()
