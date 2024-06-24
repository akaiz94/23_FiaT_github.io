from typing import List, Optional

from fastapi import Depends
from sqlalchemy.orm import Session

from configs.Database import (
    get_db_connection,
)
from models.cms.CmsFileModel import CmsFile


class CmsFileRepository:
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
    ) -> List[CmsFile]:
        query = self.db.query(CmsFile)

        if user_id:
            query = query.filter_by(user_id=user_id)
        query = query.order_by(CmsFile.surveyNo.desc())
        return query.offset(start).limit(limit).all()

    def list_by_ref_id(
            self,
            ref_id: Optional[int],
            limit: Optional[int],
            start: Optional[int],
    ) -> List[CmsFile]:
        query = self.db.query(CmsFile)

        if ref_id:
            query = query.filter_by(ref_id=ref_id)
        query = query.order_by(CmsFile.surveyNo.desc())
        return query.offset(start).limit(limit).all()

    def get(self, cms_file: CmsFile) -> CmsFile:
        return self.db.get(
            CmsFile, cms_file.id
        )

    def getProfileImage(self, user_id: int) -> CmsFile:
        query = self.db.query(CmsFile)
        query = query.filter_by(ref_id=user_id)
        query = query.filter_by(file_div_cd='PROFILE')
        query = query.order_by(CmsFile.surveyNo.desc())
        result = query.first()
        return result

    def create(self, cms_file: CmsFile) -> CmsFile:
        self.db.add(cms_file)
        self.db.commit()
        self.db.refresh(cms_file)
        return cms_file

    def update(self, id: int, cms_file: CmsFile) -> CmsFile:
        cms_file.id = id
        self.db.merge(cms_file)
        self.db.commit()
        return cms_file

    def delete(self, cms_file: CmsFile) -> None:
        self.db.delete(cms_file)
        self.db.commit()
        self.db.flush()
