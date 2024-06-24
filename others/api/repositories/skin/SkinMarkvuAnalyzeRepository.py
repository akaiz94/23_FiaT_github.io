from typing import List, Optional

from fastapi import Depends
from sqlalchemy.orm import Session

from configs.Database import (
    get_db_connection,
)
from models.skin.SkinMarkvuAnalyzeModel import SkinMarkvuAnalyze


class SkinMarkvuAnalyzeRepository:
    db: Session

    def __init__(
            self, db: Session = Depends(get_db_connection)
    ) -> None:
        self.db = db

    def list(
            self,
            userKey: Optional[int],
            limit: Optional[int],
            start: Optional[int],
    ) -> List[SkinMarkvuAnalyze]:
        query = self.db.query(SkinMarkvuAnalyze)

        if userKey:
            query = query.filter_by(userKey=userKey)
        query = query.order_by(SkinMarkvuAnalyze.idx.desc())
        return query.offset(start).limit(limit).all()

    def count(
            self,
            userKey: Optional[int],
    ) -> int:
        query = self.db.query(SkinMarkvuAnalyze)

        if userKey:
            query = query.filter_by(userKey=userKey)

        return query.count()

    def get(self, skin_markvu_analyze: SkinMarkvuAnalyze) -> SkinMarkvuAnalyze:
        return self.db.get(
            SkinMarkvuAnalyze, (skin_markvu_analyze.idx)
        )

    def create(self, skin_markvu_analyze: SkinMarkvuAnalyze) -> SkinMarkvuAnalyze:
        self.db.add(skin_markvu_analyze)
        self.db.commit()
        self.db.refresh(skin_markvu_analyze)
        return skin_markvu_analyze

    def update(self, skin_markvu_analyze: SkinMarkvuAnalyze) -> SkinMarkvuAnalyze:
        self.db.merge(skin_markvu_analyze)
        self.db.commit()
        return skin_markvu_analyze

    def delete(self, skin_markvu_analyze: SkinMarkvuAnalyze) -> None:
        self.db.delete(skin_markvu_analyze)
        self.db.commit()
        self.db.flush()
