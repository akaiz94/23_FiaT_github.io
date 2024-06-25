from typing import List, Optional

from fastapi import Depends
from sqlalchemy.orm import Session

from configs.Database import (
    get_db_connection,
)
from models.hair.HairFrontHairLineModel import HairFrontHairLine


class HairFrontHairLineRepository:
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
    ) -> List[HairFrontHairLine]:
        query = self.db.query(HairFrontHairLine)

        if surveyNo:
            query = query.filter_by(surveyNo=surveyNo)
        if userKey:
            query = query.filter_by(userKey=userKey)
        if Name:
            query = query.filter_by(Name=Name)
        query = query.order_by(HairFrontHairLine.idx.desc())
        return query.offset(start).limit(limit).all()

    def count(
            self,
            surveyNo: Optional[int],
            userKey: Optional[int],
            Name: Optional[str],
    ) -> int:
        query = self.db.query(HairFrontHairLine)

        if surveyNo:
            query = query.filter_by(surveyNo=surveyNo)
        if userKey:
            query = query.filter_by(userKey=userKey)
        if Name:
            query = query.filter_by(Name=Name)

        return query.count()

    def get(self, hair_front_hair_line: HairFrontHairLine) -> HairFrontHairLine:
        return self.db.get(
            HairFrontHairLine, (hair_front_hair_line.idx)
        )

    def create(self, hair_front_hair_line: HairFrontHairLine) -> HairFrontHairLine:
        self.db.add(hair_front_hair_line)
        self.db.commit()
        self.db.refresh(hair_front_hair_line)
        return hair_front_hair_line

    def update(self, hair_front_hair_line: HairFrontHairLine) -> HairFrontHairLine:
        self.db.merge(hair_front_hair_line)
        self.db.commit()
        return hair_front_hair_line

    def delete(self, hair_front_hair_line: HairFrontHairLine) -> None:
        self.db.delete(hair_front_hair_line)
        self.db.commit()
        self.db.flush()
