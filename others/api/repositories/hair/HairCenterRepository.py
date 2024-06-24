from typing import List, Optional

from fastapi import Depends
from sqlalchemy.orm import Session

from configs.Database import (
    get_db_connection,
)
from models.hair.HairCenterModel import HairCenter


class HairCenterRepository:
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
    ) -> List[HairCenter]:
        query = self.db.query(HairCenter)

        if surveyNo:
            query = query.filter_by(surveyNo=surveyNo)
        if userKey:
            query = query.filter_by(userKey=userKey)
        if Name:
            query = query.filter_by(Name=Name)
        query = query.order_by(HairCenter.idx.desc())
        return query.offset(start).limit(limit).all()

    def count(
            self,
            surveyNo: Optional[int],
            userKey: Optional[int],
            Name: Optional[str],
    ) -> int:
        query = self.db.query(HairCenter)

        if surveyNo:
            query = query.filter_by(surveyNo=surveyNo)
        if userKey:
            query = query.filter_by(userKey=userKey)
        if Name:
            query = query.filter_by(Name=Name)

        return query.count()

    def get(self, hair_center: HairCenter) -> HairCenter:
        return self.db.get(
            HairCenter, (hair_center.idx)
        )

    def create(self, hair_center: HairCenter) -> HairCenter:
        self.db.add(hair_center)
        self.db.commit()
        self.db.refresh(hair_center)
        return hair_center

    def update(self, hair_center: HairCenter) -> HairCenter:
        self.db.merge(hair_center)
        self.db.commit()
        return hair_center

    def delete(self, hair_center: HairCenter) -> None:
        self.db.delete(hair_center)
        self.db.commit()
        self.db.flush()
