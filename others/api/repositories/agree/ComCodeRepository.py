from typing import List, Optional

from fastapi import Depends
from sqlalchemy.orm import Session

from configs.Database import (
    get_db_connection,
)
from models.agree.ComCodeModel import ComCode


class ComCodeRepository:
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
    ) -> List[ComCode]:
        query = self.db.query(ComCode)

        if name:
            query = query.filter_by(surveyNo=surveyNo)
        query = query.order_by(ComCode.surveyNo.desc())
        return query.offset(start).limit(limit).all()

    def count(
            self,
            user_id: Optional[int]
    ) -> int:
        query = self.db.query(ComCode)

        if user_id:
            query = query.filter_by(user_id=user_id)

        return query.count()

    def get(self, com_code: ComCode) -> ComCode:
        return self.db.get(
            ComCode, (com_code.id)
        )

    def create(self, com_code: ComCode) -> ComCode:
        self.db.add(com_code)
        self.db.commit()
        self.db.refresh(com_code)
        return com_code

    def update(self, com_code: ComCode) -> ComCode:
        self.db.merge(com_code)
        self.db.commit()
        return com_code

    def delete(self, com_code: ComCode) -> None:
        self.db.delete(com_code)
        self.db.commit()
        self.db.flush()
