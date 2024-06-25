from typing import List, Optional

from fastapi import Depends
from sqlalchemy.orm import Session

from configs.Database import (
    get_db_connection,
)
from models.hair.HairFrontCenterModel import HairFrontCenter


class HairFrontCenterRepository:
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
    ) -> List[HairFrontCenter]:
        query = self.db.query(HairFrontCenter)

        if surveyNo:
            query = query.filter_by(surveyNo=surveyNo)
        if userKey:
            query = query.filter_by(userKey=userKey)
        if Name:
            query = query.filter_by(Name=Name)
        query = query.order_by(HairFrontCenter.idx.desc())
        return query.offset(start).limit(limit).all()

    def count(
            self,
            surveyNo: Optional[int],
            userKey: Optional[int],
            Name: Optional[str],
    ) -> int:
        query = self.db.query(HairFrontCenter)

        if surveyNo:
            query = query.filter_by(surveyNo=surveyNo)
        if userKey:
            query = query.filter_by(userKey=userKey)
        if Name:
            query = query.filter_by(Name=Name)

        return query.count()

    def get(self, hair_front_center: HairFrontCenter) -> HairFrontCenter:
        return self.db.get(
            HairFrontCenter, (hair_front_center.idx)
        )

    def create(self, hair_front_center: HairFrontCenter) -> HairFrontCenter:
        self.db.add(hair_front_center)
        self.db.commit()
        self.db.refresh(hair_front_center)
        return hair_front_center

    def update(self, hair_front_center: HairFrontCenter) -> HairFrontCenter:
        self.db.merge(hair_front_center)
        self.db.commit()
        return hair_front_center

    def delete(self, hair_front_center: HairFrontCenter) -> None:
        self.db.delete(hair_front_center)
        self.db.commit()
        self.db.flush()
