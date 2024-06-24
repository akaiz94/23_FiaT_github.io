from typing import List, Optional

from fastapi import Depends
from sqlalchemy.orm import Session

from configs.Database import (
    get_db_connection,
)
from models.agree.AgreePrivateModel import AgreePrivate


class AgreePrivateRepository:
    db: Session

    def __init__(
            self, db: Session = Depends(get_db_connection)
    ) -> None:
        self.db = db

    def list(
            self,
            visitkey: Optional[str],
            limit: Optional[int],
            start: Optional[int],
    ) -> List[AgreePrivate]:
        query = self.db.query(AgreePrivate)

        if visitkey:
            query = query.filter_by(visitkey=visitkey)
        query = query.order_by(AgreePrivate.visitkey.desc())
        return query.offset(start).limit(limit).all()

    def count(
            self,
            visitkey: Optional[int]
    ) -> int:
        query = self.db.query(AgreePrivate)

        if visitkey:
            query = query.filter_by(visitkey=visitkey)

        return query.count()

    def get(self, agree_private: AgreePrivate) -> AgreePrivate:
        return self.db.get(
            AgreePrivate, (agree_private.visitkey)
        )

    def create(self, agree_private: AgreePrivate) -> AgreePrivate:
        self.db.add(agree_private)
        self.db.commit()
        self.db.refresh(agree_private)
        return agree_private

    def update(self, agree_private: AgreePrivate) -> AgreePrivate:
        self.db.merge(agree_private)
        self.db.commit()
        return agree_private

    def delete(self, agree_private: AgreePrivate) -> None:
        self.db.delete(agree_private)
        self.db.commit()
        self.db.flush()
