from datetime import datetime
from typing import List, Optional

from fastapi import Depends

# from models.AuthorModel import Author
from models.cms.CmsShareModel import CmsShare
# from repositories.AuthorRepository import AuthorRepository
from repositories.cms.CmsShareRepository import CmsShareRepository
# from schemas.pydantic.AuthorSchema import AuthorSchema
from schemas.pydantic.cms.CmsShareSchema import (
    CmsShareSchema,
)


class CmsShareService:
    cmsShareRepository: CmsShareRepository

    def __init__(
            self,
            cmsShareRepository: CmsShareRepository = Depends(),
    ) -> None:
        self.cmsShareRepository = cmsShareRepository

    def create(self, cms_share_body: CmsShareSchema) -> CmsShare:
        return self.cmsShareRepository.create(
            CmsShare(**cms_share_body.dict())
        )

    def deleteForce(self, cms_share_id: int) -> None:
        return self.cmsShareRepository.delete(CmsShare(id=cms_share_id))

    def delete(self, cms_share_id: int) -> None:
        self.update(cms_share_id, CmsShare(deleted_at=datetime.now()))

    def get(self, cms_share_id: int) -> CmsShare:
        return self.cmsShareRepository.get(CmsShare(id=cms_share_id))

    def list(
            self,
            surveyNo: Optional[int] = None,
            pageSize: Optional[int] = 10,
            startIndex: Optional[int] = 0,
    ) -> List[CmsShare]:
        return self.cmsShareRepository.list(
            surveyNo, pageSize, startIndex
        )

    #     def update(
    #         self, cms_share_id: int, cms_share_body: CmsShareSchema
    #     ) -> CmsShare:
    #         return self.cmsShareRepository.update(
    #             cms_share_id, CmsShare(**cms_share_body.dict())
    #         )

    def update(
            self, cms_share_id: int, cms_share_body: CmsShareSchema
    ) -> CmsShare:
        cms_share = self.get(cms_share_id)

        update_fields = []
        for field in cms_share_body.__dict__:
            if field in cms_share.__dict__:
                update_fields.append(field)

        for field in update_fields:
            if field != '_sa_instance_state':
                setattr(cms_share, field, getattr(cms_share_body, field))

        return self.cmsShareRepository.update(cms_share_id, cms_share)
