from typing import List, Optional

from fastapi import Depends
from sqlalchemy.orm import Session

from configs.Database import (
    get_db_connection,
)
from models.hair.HairImageModel import HairImage


class HairImageRepository:
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
    ) -> List[HairImage]:
        query = self.db.query(HairImage)

        if surveyNo:
            query = query.filter_by(surveyNo=surveyNo)
        if userKey:
            query = query.filter_by(userKey=userKey)
        if Name:
            query = query.filter_by(Name=Name)
        query = query.order_by(HairImage.idx.desc())
        return query.offset(start).limit(limit).all()

    def count(
            self,
            surveyNo: Optional[int],
            userKey: Optional[int],
            Name: Optional[str],
    ) -> int:
        query = self.db.query(HairImage)

        if surveyNo:
            query = query.filter_by(surveyNo=surveyNo)
        if userKey:
            query = query.filter_by(userKey=userKey)
        if Name:
            query = query.filter_by(Name=Name)

        return query.count()

    def get(self, hair_image: HairImage) -> HairImage:
        return self.db.get(
            HairImage, (hair_image.idx)
        )

    def create(self, hair_image: HairImage) -> HairImage:
        self.db.add(hair_image)
        self.db.commit()
        self.db.refresh(hair_image)
        return hair_image

    def update(self, hair_image: HairImage) -> HairImage:
        self.db.merge(hair_image)
        self.db.commit()
        return hair_image

    def delete(self, hair_image: HairImage) -> None:
        self.db.delete(hair_image)
        self.db.commit()
        self.db.flush()
