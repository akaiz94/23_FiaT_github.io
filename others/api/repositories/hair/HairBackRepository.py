from typing import List, Optional

from fastapi import Depends
from sqlalchemy.orm import Session

from configs.Database import (
    get_db_connection,
)
from models.hair.HairBackModel import HairBack


class HairBackRepository:
    db: Session

    def __init__(
            self, db: Session = Depends(get_db_connection)
    ) -> None:
        self.db = db

    def list(
            self,
            surveyNo: Optional[int],
            userKey: Optional[int],
            Name: Optional[str],
            limit: Optional[int],
            start: Optional[int],
    ) -> List[HairBack]:
        query = self.db.query(HairBack)

        if surveyNo:
            query = query.filter_by(surveyNo=surveyNo)
        if userKey:
            query = query.filter_by(userKey=userKey)
        if Name:
            query = query.filter_by(Name=Name)
        query = query.order_by(HairBack.idx.desc())
        return query.offset(start).limit(limit).all()

    def count(
            self,
            surveyNo: Optional[int],
            userKey: Optional[int],
            Name: Optional[str],
    ) -> int:
        query = self.db.query(HairBack)

        if surveyNo:
            query = query.filter_by(surveyNo=surveyNo)
        if userKey:
            query = query.filter_by(userKey=userKey)
        if Name:
            query = query.filter_by(Name=Name)

        return query.count()

    def get(self, hair_back: HairBack) -> HairBack:
        return self.db.get(
            HairBack, (hair_back.idx)
        )

    def create(self, hair_back: HairBack) -> HairBack:
        self.db.add(hair_back)
        self.db.commit()
        self.db.refresh(hair_back)
        return hair_back

    def update(self, hair_back: HairBack) -> HairBack:
        self.db.merge(hair_back)
        self.db.commit()
        return hair_back

    def delete(self, hair_back: HairBack) -> None:
        self.db.delete(hair_back)
        self.db.commit()
        self.db.flush()
