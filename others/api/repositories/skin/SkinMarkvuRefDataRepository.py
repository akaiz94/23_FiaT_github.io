from typing import List, Optional

from fastapi import Depends
from sqlalchemy.orm import Session

from configs.Database import (
    get_db_connection,
)
from models.skin.SkinMarkvuRefDataModel import SkinMarkvuRefData


class SkinMarkvuRefDataRepository:
    db: Session

    def __init__(
            self, db: Session = Depends(get_db_connection)
    ) -> None:
        self.db = db

    def list(
            self,
            Gubun: Optional[str],
            limit: Optional[int],
            start: Optional[int],
    ) -> List[SkinMarkvuRefData]:
        query = self.db.query(SkinMarkvuRefData)

        if Gubun:
            query = query.filter_by(Gubun=Gubun)
        query = query.order_by(SkinMarkvuRefData.Gubun.desc())
        return query.offset(start).limit(limit).all()

    def count(
            self,
            Gubun: Optional[str]
    ) -> int:
        query = self.db.query(SkinMarkvuRefData)

        if Gubun:
            query = query.filter_by(Gubun=Gubun)

        return query.count()

    def get(self, skin_markvu_ref_data: SkinMarkvuRefData) -> SkinMarkvuRefData:
        return self.db.get(
            SkinMarkvuRefData, (skin_markvu_ref_data.Gubun)
        )

    def create(self, skin_markvu_ref_data: SkinMarkvuRefData) -> SkinMarkvuRefData:
        self.db.add(skin_markvu_ref_data)
        self.db.commit()
        self.db.refresh(skin_markvu_ref_data)
        return skin_markvu_ref_data

    def update(self, skin_markvu_ref_data: SkinMarkvuRefData) -> SkinMarkvuRefData:
        self.db.merge(skin_markvu_ref_data)
        self.db.commit()
        return skin_markvu_ref_data

    def delete(self, skin_markvu_ref_data: SkinMarkvuRefData) -> None:
        self.db.delete(skin_markvu_ref_data)
        self.db.commit()
        self.db.flush()
