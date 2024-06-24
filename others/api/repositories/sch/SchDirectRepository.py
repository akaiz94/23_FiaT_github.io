from typing import List, Optional

from fastapi import Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

from configs.Database import (
    get_db_connection,
)
from models.sch.SchDirectModel import SchDirect


class SchDirectRepository:
    db: Session

    def __init__(
            self, db: Session = Depends(get_db_connection)
    ) -> None:
        self.db = db

    def list(
            self,
            skey: Optional[int],
            userkey: Optional[int],
            idx: Optional[int],
            limit: Optional[int],
            start: Optional[int],
    ) -> List[SchDirect]:
        query = self.db.query(SchDirect)

        if skey:
            query = query.filter_by(skey=skey)
        if userkey:
            query = query.filter_by(userkey=userkey)
        if idx:
            query = query.filter_by(idx=idx)

        query = query.order_by(SchDirect.skey.desc())
        return query.offset(start).limit(limit).all()

    def count(
            self,
            skey: Optional[str],
            userkey: Optional[int],
            idx: Optional[int],
    ) -> int:
        query = self.db.query(SchDirect)

        if skey:
            query = query.filter_by(skey=skey)
        if userkey:
            query = query.filter_by(userkey=userkey)
        if idx:
            query = query.filter_by(idx=idx)

        return query.count()

    def get(self, sch_direct: SchDirect) -> SchDirect:
        return self.db.get(
            SchDirect, (sch_direct.skey)
        )

    def create(self, sch_direct: SchDirect) -> SchDirect:
        # userkey 자동증가
        sch_direct.userkey = self.db.query(func.max(SchDirect.userkey)).scalar() + 1 if self.db.query(
            SchDirect.userkey).count() > 0 else 1
        # surveyNo 자동증가
        sch_direct.surveyNo = self.db.query(func.max(SchDirect.surveyNo)).scalar() + 1 if self.db.query(
            SchDirect.surveyNo).count() > 0 else 1

        self.db.add(sch_direct)
        self.db.commit()
        self.db.refresh(sch_direct)
        return sch_direct

    def update(self, sch_direct: SchDirect) -> SchDirect:
        self.db.merge(sch_direct)
        self.db.commit()
        return sch_direct

    def delete(self, sch_direct: SchDirect) -> None:
        self.db.delete(sch_direct)
        self.db.commit()
        self.db.flush()
