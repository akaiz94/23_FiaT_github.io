from typing import List, Optional

from fastapi import Depends
from sqlalchemy.orm import Session

from configs.Database import (
    get_db_connection,
)
from models.hair.HairLeftHairLineModel import HairLeftHairLine


class HairLeftHairLineRepository:
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
    ) -> List[HairLeftHairLine]:
        query = self.db.query(HairLeftHairLine)

        if surveyNo:
            query = query.filter_by(surveyNo=surveyNo)
        if userKey:
            query = query.filter_by(userKey=userKey)
        if Name:
            query = query.filter_by(Name=Name)
        query = query.order_by(HairLeftHairLine.idx.desc())
        return query.offset(start).limit(limit).all()

    def count(
            self,
            surveyNo: Optional[int],
            userKey: Optional[int],
            Name: Optional[str],
    ) -> int:
        query = self.db.query(HairLeftHairLine)

        if surveyNo:
            query = query.filter_by(surveyNo=surveyNo)
        if userKey:
            query = query.filter_by(userKey=userKey)
        if Name:
            query = query.filter_by(Name=Name)

        return query.count()

    def get(self, hair_left_hair_line: HairLeftHairLine) -> HairLeftHairLine:
        return self.db.get(
            HairLeftHairLine, (hair_left_hair_line.idx)
        )

    def create(self, hair_left_hair_line: HairLeftHairLine) -> HairLeftHairLine:
        self.db.add(hair_left_hair_line)
        self.db.commit()
        self.db.refresh(hair_left_hair_line)
        return hair_left_hair_line

    def update(self, hair_left_hair_line: HairLeftHairLine) -> HairLeftHairLine:
        self.db.merge(hair_left_hair_line)
        self.db.commit()
        return hair_left_hair_line

    def delete(self, hair_left_hair_line: HairLeftHairLine) -> None:
        self.db.delete(hair_left_hair_line)
        self.db.commit()
        self.db.flush()
