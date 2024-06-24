from typing import List, Optional

from fastapi import Depends
from sqlalchemy.orm import Session

from configs.Database import (
    get_db_connection,
)
from models.hair.HairRightHairLineModel import HairRightHairLine


class HairRightHairLineRepository:
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
    ) -> List[HairRightHairLine]:
        query = self.db.query(HairRightHairLine)

        if surveyNo:
            query = query.filter_by(surveyNo=surveyNo)
        if userKey:
            query = query.filter_by(userKey=userKey)
        if Name:
            query = query.filter_by(Name=Name)
        query = query.order_by(HairRightHairLine.idx.desc())
        return query.offset(start).limit(limit).all()

    def count(
            self,
            surveyNo: Optional[int],
            userKey: Optional[int],
            Name: Optional[str],
    ) -> int:
        query = self.db.query(HairRightHairLine)

        if surveyNo:
            query = query.filter_by(surveyNo=surveyNo)
        if userKey:
            query = query.filter_by(userKey=userKey)
        if Name:
            query = query.filter_by(Name=Name)

        return query.count()

    def get(self, hair_right_hair_line: HairRightHairLine) -> HairRightHairLine:
        return self.db.get(
            HairRightHairLine, (hair_right_hair_line.idx)
        )

    def create(self, hair_right_hair_line: HairRightHairLine) -> HairRightHairLine:
        self.db.add(hair_right_hair_line)
        self.db.commit()
        self.db.refresh(hair_right_hair_line)
        return hair_right_hair_line

    def update(self, hair_right_hair_line: HairRightHairLine) -> HairRightHairLine:
        self.db.merge(hair_right_hair_line)
        self.db.commit()
        return hair_right_hair_line

    def delete(self, hair_right_hair_line: HairRightHairLine) -> None:
        self.db.delete(hair_right_hair_line)
        self.db.commit()
        self.db.flush()
