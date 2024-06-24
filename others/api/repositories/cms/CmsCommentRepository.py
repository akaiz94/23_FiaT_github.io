from typing import List, Optional

from fastapi import Depends
from sqlalchemy.orm import Session

from configs.Database import (
    get_db_connection,
)
from models.cms.CmsCommentModel import CmsComment


class CmsCommentRepository:
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
    ) -> List[CmsComment]:
        query = self.db.query(CmsComment)

        if user_id:
            query = query.filter_by(user_id=user_id)
        query = query.order_by(CmsComment.surveyNo.desc())
        return query.offset(start).limit(limit).all()

    def get(self, cms_comment: CmsComment) -> CmsComment:
        return self.db.get(
            CmsComment, cms_comment.id
        )

    def create(self, cms_comment: CmsComment) -> CmsComment:
        self.db.add(cms_comment)
        self.db.commit()
        self.db.refresh(cms_comment)
        return cms_comment

    def update(self, id: int, cms_comment: CmsComment) -> CmsComment:
        cms_comment.id = id
        self.db.merge(cms_comment)
        self.db.commit()
        return cms_comment

    def delete(self, cms_comment: CmsComment) -> None:
        self.db.delete(cms_comment)
        self.db.commit()
        self.db.flush()
