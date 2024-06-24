from typing import List, Optional

from fastapi import Depends
from sqlalchemy.orm import Session

from configs.Database import (
    get_db_connection,
)
from models.skin.SkinMarkvuCustinfoModel import SkinMarkvuCustinfo


class SkinMarkvuCustinfoRepository:
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
    ) -> List[SkinMarkvuCustinfo]:
        query = self.db.query(SkinMarkvuCustinfo)

        if surveyNo:
            query = query.filter_by(surveyNo=surveyNo)
        if userKey:
            query = query.filter_by(userKey=userKey)
        query = query.order_by(SkinMarkvuCustinfo.idx.desc())
        return query.offset(start).limit(limit).all()

    def count(
            self,
            surveyNo: Optional[int],
            userKey: Optional[int],
    ) -> int:
        query = self.db.query(SkinMarkvuCustinfo)

        if surveyNo:
            query = query.filter_by(surveyNo=surveyNo)
        if userKey:
            query = query.filter_by(userKey=userKey)

        return query.count()

    def get(self, skin_markvu_custInfo: SkinMarkvuCustinfo) -> SkinMarkvuCustinfo:
        return self.db.get(
            SkinMarkvuCustinfo, (skin_markvu_custInfo.idx)
        )

    def create(self, skin_markvu_custInfo: SkinMarkvuCustinfo) -> SkinMarkvuCustinfo:
        self.db.add(skin_markvu_custInfo)
        self.db.commit()
        self.db.refresh(skin_markvu_custInfo)
        return skin_markvu_custInfo

    def update(self, skin_markvu_custInfo: SkinMarkvuCustinfo) -> SkinMarkvuCustinfo:
        self.db.merge(skin_markvu_custInfo)
        self.db.commit()
        return skin_markvu_custInfo

    def delete(self, skin_markvu_custInfo: SkinMarkvuCustinfo) -> None:
        self.db.delete(skin_markvu_custInfo)
        self.db.commit()
        self.db.flush()
