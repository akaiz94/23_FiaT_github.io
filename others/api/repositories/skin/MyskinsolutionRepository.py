from typing import List, Optional

from fastapi import Depends
from sqlalchemy.orm import Session, lazyload

from configs.Database import (
    get_db_connection,
)
from models.skin.MyskinsolutionModel import Myskinsolution
from schemas.pydantic.skin.MyskinsolutionSchema import (
    MyskinsolutionSearchReqSchema,
)

class MyskinsolutionRepository:
    db: Session

    def __init__(
        self, db: Session = Depends(get_db_connection)
    ) -> None:
        self.db = db

    def list(
        self,
            idx: Optional[int],
            surveyNo: Optional[int],
            userKey: Optional[int],
            name: Optional[str],
            limit: Optional[int],
            start: Optional[int],
    ) -> List[Myskinsolution]:
        query = self.db.query(Myskinsolution)
        if idx:
            query = query.filter_by(idx=idx)
        if surveyNo:
            query = query.filter_by(surveyNo=surveyNo)
        if userKey:
            query = query.filter_by(userKey=userKey)
        if name:
            query = query.filter_by(name=name)
        query = query.order_by(Myskinsolution.idx.desc())
        return query.offset(start).limit(limit).all()

    def count(self,
              idx: Optional[int],
            surveyNo: Optional[int],
            userKey: Optional[int],
            name: Optional[str]) -> int:
        query = self.db.query(Myskinsolution)
        if idx:
            query = query.filter_by(idx=idx)
        if surveyNo:
            query = query.filter_by(surveyNo=surveyNo)
        if userKey:
            query = query.filter_by(userKey=userKey)
        if name:
            query = query.filter_by(name=name)

        return query.count()

    def get(self, tbCMyskinsolution: Myskinsolution) -> Myskinsolution:
        return self.db.get(
            Myskinsolution, (
              tbCMyskinsolution.idx
            )
        )

    def create(self, tbCMyskinsolution: Myskinsolution) -> Myskinsolution:
        self.db.add(tbCMyskinsolution)
        self.db.commit()
        self.db.refresh(tbCMyskinsolution)
        return tbCMyskinsolution

    def update(self, tbCMyskinsolution: Myskinsolution) -> Myskinsolution:
        self.db.merge(tbCMyskinsolution)
        self.db.commit()
        return tbCMyskinsolution

    def delete(self, tbCMyskinsolution: Myskinsolution) -> None:
        self.db.delete(tbCMyskinsolution)
        self.db.commit()
        self.db.flush()
