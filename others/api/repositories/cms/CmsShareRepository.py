from typing import List, Optional

from fastapi import Depends
from sqlalchemy.orm import Session

from configs.Database import (
    get_db_connection,
)
from models.cms.CmsShareModel import CmsShare


class CmsShareRepository:
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
    ) -> List[CmsShare]:
        query = self.db.query(CmsShare)

        if user_id:
            query = query.filter_by(user_id=user_id)
        query = query.order_by(CmsShare.surveyNo.desc())
        return query.offset(start).limit(limit).all()

    def get(self, cms_share: CmsShare) -> CmsShare:
        return self.db.get(
            CmsShare, cms_share.id
        )

    def create(self, cms_share: CmsShare) -> CmsShare:
        self.db.add(cms_share)
        self.db.commit()
        self.db.refresh(cms_share)
        return cms_share

    def update(self, id: int, cms_share: CmsShare) -> CmsShare:
        cms_share.id = id
        self.db.merge(cms_share)
        self.db.commit()
        return cms_share

    def delete(self, cms_share: CmsShare) -> None:
        self.db.delete(cms_share)
        self.db.commit()
        self.db.flush()
