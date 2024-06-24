from typing import List, Optional

from fastapi import Depends
from sqlalchemy.orm import Session

from configs.Database import (
    get_db_connection,
)
from models.cms.CmsContentsModel import CmsContents
from schemas.pydantic.cms.CmsContentsSchema import CmsBoardSearchReqSchema


class CmsContentsRepository:
    db: Session

    def __init__(
            self, db: Session = Depends(get_db_connection)
    ) -> None:
        self.db = db

    def list(
            self,
            user_id: Optional[int],
            cont_div_cd: Optional[str],
            limit: Optional[int],
            start: Optional[int],
    ) -> List[CmsContents]:
        query = self.db.query(CmsContents)

        if user_id:
            query = query.filter_by(user_id=user_id)
        if cont_div_cd:
            query = query.filter_by(cont_div_cd=cont_div_cd)

        query = query.order_by(CmsContents.surveyNo.desc())
        return query.offset(start).limit(limit).all()

    def countWithRequest(
            self,
            request_schema: CmsBoardSearchReqSchema
    ) -> int:
        query = self.db.query(CmsContents)

        if request_schema.user_id:
            query = query.filter_by(user_id=request_schema.user_id)
        if request_schema.cont_div_cd:
            query = query.filter_by(cont_div_cd=request_schema.cont_div_cd)
        return query.count()

    def count(
            self,
            user_id: Optional[int],
            cont_div_cd: Optional[str],
    ) -> int:
        query = self.db.query(CmsContents)

        if user_id:
            query = query.filter_by(user_id=user_id)
        if cont_div_cd:
            query = query.filter_by(cont_div_cd=cont_div_cd)

        return query.count()

    def get(self, cms_contents: CmsContents) -> CmsContents:
        return self.db.get(
            CmsContents, cms_contents.id
        )

    def create(self, cms_contents: CmsContents) -> CmsContents:
        self.db.add(cms_contents)
        self.db.commit()
        self.db.refresh(cms_contents)
        return cms_contents

    def update(self, id: int, cms_contents: CmsContents) -> CmsContents:
        cms_contents.id = id
        self.db.merge(cms_contents)
        self.db.commit()
        return cms_contents

    def delete(self, cms_contents: CmsContents) -> None:
        self.db.delete(cms_contents)
        self.db.commit()
        self.db.flush()
