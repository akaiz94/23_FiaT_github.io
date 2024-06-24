from typing import List, Optional

from fastapi import Depends
from sqlalchemy.orm import Session

from configs.Database import (
    get_db_connection,
)
from models.skin.SkinMarkvuCompleteModel import SkinMarkvuComplete


class SkinMarkvuCompleteRepository:
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
    ) -> List[SkinMarkvuComplete]:
        query = self.db.query(SkinMarkvuComplete)

        if surveyNo:
            query = query.filter_by(surveyNo=surveyNo)
        if userKey:
            query = query.filter_by(userKey=userKey)
        query = query.order_by(SkinMarkvuComplete.idx.desc())
        return query.offset(start).limit(limit).all()

    def count(
            self,
            surveyNo: Optional[int],
            userKey: Optional[int],
    ) -> int:
        query = self.db.query(SkinMarkvuComplete)

        if surveyNo:
            query = query.filter_by(surveyNo=surveyNo)
        if userKey:
            query = query.filter_by(userKey=userKey)

        return query.count()

    def get(self, skin_markvu_complete: SkinMarkvuComplete) -> SkinMarkvuComplete:
        return self.db.get(
            SkinMarkvuComplete, (skin_markvu_complete.idx)
        )

    def create(self, skin_markvu_complete: SkinMarkvuComplete) -> SkinMarkvuComplete:
        self.db.add(skin_markvu_complete)
        self.db.commit()
        self.db.refresh(skin_markvu_complete)
        return skin_markvu_complete

    def update(self, skin_markvu_complete: SkinMarkvuComplete) -> SkinMarkvuComplete:
        self.db.merge(skin_markvu_complete)
        self.db.commit()
        return skin_markvu_complete

    def delete(self, skin_markvu_complete: SkinMarkvuComplete) -> None:
        self.db.delete(skin_markvu_complete)
        self.db.commit()
        self.db.flush()
