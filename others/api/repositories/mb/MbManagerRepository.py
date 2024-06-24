from typing import List, Optional

from fastapi import Depends
from sqlalchemy.orm import Session

from configs.Database import (
    get_db_connection,
)
from models.mb.MbManagerModel import MbManager


class MbManagerRepository:
    db: Session

    def __init__(
            self, db: Session = Depends(get_db_connection)
    ) -> None:
        self.db = db

    def list(
            self,
            ManagerID: Optional[str],
            limit: Optional[int],
            start: Optional[int],
    ) -> List[MbManager]:
        query = self.db.query(MbManager)

        if ManagerID:
            query = query.filter_by(ManagerID=ManagerID)
        query = query.order_by(MbManager.ManagerKey.desc())
        return query.offset(start).limit(limit).all()

    def count(
            self,
            user_id: Optional[int]
    ) -> int:
        query = self.db.query(MbManager)

        if user_id:
            query = query.filter_by(user_id=user_id)

        return query.count()

    def findById(self, managerId: str) -> MbManager:
        query =  self.db.query(MbManager).filter(MbManager.ManagerID == managerId)
        result = query.first()
        return result

    def get(self, mb_manager: MbManager) -> MbManager:
        return self.db.get(
            MbManager, (mb_manager.ManagerKey)
        )

    def create(self, mb_manager: MbManager) -> MbManager:
        self.db.add(mb_manager)
        self.db.commit()
        self.db.refresh(mb_manager)
        return mb_manager

    def update(self, mb_manager: MbManager) -> MbManager:
        self.db.merge(mb_manager)
        self.db.commit()
        return mb_manager

    def delete(self, mb_manager: MbManager) -> None:
        self.db.delete(mb_manager)
        self.db.commit()
        self.db.flush()
