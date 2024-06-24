from typing import List, Optional

from fastapi import Depends
from sqlalchemy.orm import Session

from configs.Database import (
    get_db_connection,
)
from models.mb.MbManagerLogModel import MbManagerLog


class MbManagerLogRepository:
    db: Session

    def __init__(
            self, db: Session = Depends(get_db_connection)
    ) -> None:
        self.db = db

    def list(
            self,
            name: Optional[str],
            limit: Optional[int],
            start: Optional[int],
    ) -> List[MbManagerLog]:
        query = self.db.query(MbManagerLog)

        if name:
            query = query.filter_by(surveyNo=surveyNo)
        query = query.order_by(MbManagerLog.LogKey.desc())
        return query.offset(start).limit(limit).all()

    def count(
            self,
            user_id: Optional[int]
    ) -> int:
        query = self.db.query(MbManagerLog)

        if user_id:
            query = query.filter_by(user_id=user_id)

        return query.count()

    def get(self, mb_manager_log: MbManagerLog) -> MbManagerLog:
        return self.db.get(
            MbManagerLog, (mb_manager_log.LogKey)
        )

    def create(self, mb_manager_log: MbManagerLog) -> MbManagerLog:
        self.db.add(mb_manager_log)
        self.db.commit()
        self.db.refresh(mb_manager_log)
        return mb_manager_log

    def update(self, mb_manager_log: MbManagerLog) -> MbManagerLog:
        self.db.merge(mb_manager_log)
        self.db.commit()
        return mb_manager_log

    def delete(self, mb_manager_log: MbManagerLog) -> None:
        self.db.delete(mb_manager_log)
        self.db.commit()
        self.db.flush()
