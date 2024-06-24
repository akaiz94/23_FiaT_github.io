from typing import List, Optional

from fastapi import Depends
from sqlalchemy.orm import Session

from configs.Database import (
    get_db_connection,
)
from models.cms.CmsMetaModel import CmsMeta


class CmsMetaRepository:
    db: Session

    def __init__(
            self, db: Session = Depends(get_db_connection)
    ) -> None:
        self.db = db

    def list(
            self,
            user_id: Optional[int],
            limit: Optional[int],
            start: Optional[int],
    ) -> List[CmsMeta]:
        query = self.db.query(CmsMeta)

        if user_id:
            query = query.filter_by(user_id=user_id)
        query = query.order_by(CmsMeta.surveyNo.desc())
        return query.offset(start).limit(limit).all()

    def get(self, cms_meta: CmsMeta) -> CmsMeta:
        return self.db.get(
            CmsMeta, cms_meta.id
        )

    def create(self, cms_meta: CmsMeta) -> CmsMeta:
        self.db.add(cms_meta)
        self.db.commit()
        self.db.refresh(cms_meta)
        return cms_meta

    def update(self, id: int, cms_meta: CmsMeta) -> CmsMeta:
        cms_meta.id = id
        self.db.merge(cms_meta)
        self.db.commit()
        return cms_meta

    def delete(self, cms_meta: CmsMeta) -> None:
        self.db.delete(cms_meta)
        self.db.commit()
        self.db.flush()
