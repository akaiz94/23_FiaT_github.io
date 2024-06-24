from typing import List, Optional

from fastapi import Depends
from sqlalchemy.orm import Session

from configs.Database import (
    get_db_connection,
)
from models.skin.SkinMarkvuResultModel import SkinMarkvuResult


class SkinMarkvuResultRepository:
    db: Session

    def __init__(
            self, db: Session = Depends(get_db_connection)
    ) -> None:
        self.db = db

    def list(
            self,
            surveyNo: Optional[int],
            userkey: Optional[int],
            limit: Optional[int],
            start: Optional[int],
    ) -> List[SkinMarkvuResult]:
        query = self.db.query(SkinMarkvuResult)

        if surveyNo:
            query = query.filter_by(surveyNo=surveyNo)
        if userkey:
            query = query.filter_by(userkey=userkey)
        query = query.order_by(SkinMarkvuResult.idx.desc())
        return query.offset(start).limit(limit).all()

    def count(
            self,
            surveyNo: Optional[int],
            userkey: Optional[int],
    ) -> int:
        query = self.db.query(SkinMarkvuResult)

        if surveyNo:
            query = query.filter_by(surveyNo=surveyNo)
        if userkey:
            query = query.filter_by(userkey=userkey)

        return query.count()

    def get(self, skin_markvu_result: SkinMarkvuResult) -> SkinMarkvuResult:
        return self.db.get(
            SkinMarkvuResult, (skin_markvu_result.idx)
        )

    def create(self, skin_markvu_result: SkinMarkvuResult) -> SkinMarkvuResult:
        self.db.add(skin_markvu_result)
        self.db.commit()
        self.db.refresh(skin_markvu_result)
        return skin_markvu_result

    def update(self, skin_markvu_result: SkinMarkvuResult) -> SkinMarkvuResult:
        self.db.merge(skin_markvu_result)
        self.db.commit()
        return skin_markvu_result

    def delete(self, skin_markvu_result: SkinMarkvuResult) -> None:
        self.db.delete(skin_markvu_result)
        self.db.commit()
        self.db.flush()
