from typing import List, Optional

from fastapi import Depends
from sqlalchemy.orm import Session

from configs.Database import (
    get_db_connection,
)
from models.skin.SkinConcernModel import SkinConcern


class SkinConcernRepository:
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
    ) -> List[SkinConcern]:
        query = self.db.query(SkinConcern)

        if surveyNo:
            query = query.filter_by(surveyNo=surveyNo)
        if userKey:
            query = query.filter_by(userKey=userKey)
        query = query.order_by(SkinConcern.idx.desc())
        return query.offset(start).limit(limit).all()

    def count(
            self,
            surveyNo: Optional[int],
            userKey: Optional[int],
    ) -> int:
        query = self.db.query(SkinConcern)

        if surveyNo:
            query = query.filter_by(surveyNo=surveyNo)
        if userKey:
            query = query.filter_by(userKey=userKey)

        return query.count()

    def get(self, skin_concern: SkinConcern) -> SkinConcern:
        return self.db.get(
            SkinConcern, (skin_concern.idx)
        )

    def create(self, skin_concern: SkinConcern) -> SkinConcern:
        self.db.add(skin_concern)
        self.db.commit()
        self.db.refresh(skin_concern)
        return skin_concern

    def update(self, skin_concern: SkinConcern) -> SkinConcern:
        self.db.merge(skin_concern)
        self.db.commit()
        return skin_concern

    def delete(self, skin_concern: SkinConcern) -> None:
        self.db.delete(skin_concern)
        self.db.commit()
        self.db.flush()
