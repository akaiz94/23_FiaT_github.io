from typing import List, Optional

from fastapi import Depends
from sqlalchemy.orm import Session

from configs.Database import (
    get_db_connection,
)
from models.skin.SkinAnteraModel import SkinAntera


class SkinAnteraRepository:
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
    ) -> List[SkinAntera]:
        query = self.db.query(SkinAntera)

        if surveyNo:
            query = query.filter_by(surveyNo=surveyNo)
        if userKey:
            query = query.filter_by(userKey=userKey)
        query = query.order_by(SkinAntera.idx.desc())
        return query.offset(start).limit(limit).all()

    def count(
            self,
            surveyNo: Optional[int],
            userKey: Optional[int],
    ) -> int:
        query = self.db.query(SkinAntera)

        if surveyNo:
            query = query.filter_by(surveyNo=surveyNo)
        if userKey:
            query = query.filter_by(userKey=userKey)

        return query.count()

    def get(self, skin_antera: SkinAntera) -> SkinAntera:
        return self.db.get(
            SkinAntera, (skin_antera.idx)
        )

    def create(self, skin_antera: SkinAntera) -> SkinAntera:
        self.db.add(skin_antera)
        self.db.commit()
        self.db.refresh(skin_antera)
        return skin_antera

    def update(self, skin_antera: SkinAntera) -> SkinAntera:
        self.db.merge(skin_antera)
        self.db.commit()
        return skin_antera

    def delete(self, skin_antera: SkinAntera) -> None:
        self.db.delete(skin_antera)
        self.db.commit()
        self.db.flush()
