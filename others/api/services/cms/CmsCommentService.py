from datetime import datetime
from typing import List, Optional

from fastapi import Depends

# from models.AuthorModel import Author
from models.cms.CmsCommentModel import CmsComment
# from repositories.AuthorRepository import AuthorRepository
from repositories.cms.CmsCommentRepository import CmsCommentRepository
# from schemas.pydantic.AuthorSchema import AuthorSchema
from schemas.pydantic.cms.CmsCommentSchema import (
    CmsCommentSchema,
)


class CmsCommentService:
    cmsCommentRepository: CmsCommentRepository

    def __init__(
            self,
            cmsCommentRepository: CmsCommentRepository = Depends(),
    ) -> None:
        self.cmsCommentRepository = cmsCommentRepository

    def create(self, cms_comment_body: CmsCommentSchema) -> CmsComment:
        return self.cmsCommentRepository.create(
            CmsComment(**cms_comment_body.dict())
        )

    def deleteForce(self, cms_comment_id: int) -> None:
        return self.cmsCommentRepository.delete(CmsComment(id=cms_comment_id))

    def delete(self, cms_comment_id: int) -> None:
        self.update(cms_comment_id, CmsComment(deleted_at=datetime.now()))

    def get(self, cms_comment_id: int) -> CmsComment:
        return self.cmsCommentRepository.get(CmsComment(id=cms_comment_id))

    def list(
            self,
            surveyNo: Optional[int] = None,
            pageSize: Optional[int] = 10,
            startIndex: Optional[int] = 0,
    ) -> List[CmsComment]:
        return self.cmsCommentRepository.list(
            surveyNo, pageSize, startIndex
        )

    #     def update(
    #         self, cms_comment_id: int, cms_comment_body: CmsCommentSchema
    #     ) -> CmsComment:
    #         return self.cmsCommentRepository.update(
    #             cms_comment_id, CmsComment(**cms_comment_body.dict())
    #         )

    def update(
            self, cms_comment_id: int, cms_comment_body: CmsCommentSchema
    ) -> CmsComment:
        cms_comment = self.get(cms_comment_id)

        update_fields = []
        for field in cms_comment_body.__dict__:
            if field in cms_comment.__dict__:
                update_fields.append(field)

        for field in update_fields:
            if field != '_sa_instance_state':
                setattr(cms_comment, field, getattr(cms_comment_body, field))

        return self.cmsCommentRepository.update(cms_comment_id, cms_comment)
