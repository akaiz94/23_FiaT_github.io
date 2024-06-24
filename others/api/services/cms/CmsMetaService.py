from datetime import datetime
from typing import List, Optional

from fastapi import Depends

# from models.AuthorModel import Author
from models.cms.CmsMetaModel import CmsMeta
# from repositories.AuthorRepository import AuthorRepository
from repositories.cms.CmsMetaRepository import CmsMetaRepository
# from schemas.pydantic.AuthorSchema import AuthorSchema
from schemas.pydantic.cms.CmsMetaSchema import (
    CmsMetaSchema,
)


class CmsMetaService:
    cmsMetaRepository: CmsMetaRepository

    def __init__(
            self,
            cmsMetaRepository: CmsMetaRepository = Depends(),
    ) -> None:
        self.cmsMetaRepository = cmsMetaRepository

    def create(self, cms_meta_body: CmsMetaSchema) -> CmsMeta:
        return self.cmsMetaRepository.create(
            CmsMeta(**cms_meta_body.dict())
        )

    def deleteForce(self, cms_meta_id: int) -> None:
        return self.cmsMetaRepository.delete(CmsMeta(id=cms_meta_id))

    def delete(self, cms_meta_id: int) -> None:
        self.update(cms_meta_id, CmsMeta(deleted_at=datetime.now()))

    def get(self, cms_meta_id: int) -> CmsMeta:
        return self.cmsMetaRepository.get(CmsMeta(id=cms_meta_id))

    def list(
            self,
            surveyNo: Optional[int] = None,
            pageSize: Optional[int] = 10,
            startIndex: Optional[int] = 0,
    ) -> List[CmsMeta]:
        return self.cmsMetaRepository.list(
            surveyNo, pageSize, startIndex
        )

    #     def update(
    #         self, cms_meta_id: int, cms_meta_body: CmsMetaSchema
    #     ) -> CmsMeta:
    #         return self.cmsMetaRepository.update(
    #             cms_meta_id, CmsMeta(**cms_meta_body.dict())
    #         )

    def update(
            self, cms_meta_id: int, cms_meta_body: CmsMetaSchema
    ) -> CmsMeta:
        cms_meta = self.get(cms_meta_id)

        update_fields = []
        for field in cms_meta_body.__dict__:
            if field in cms_meta.__dict__:
                update_fields.append(field)

        for field in update_fields:
            if field != '_sa_instance_state':
                setattr(cms_meta, field, getattr(cms_meta_body, field))

        return self.cmsMetaRepository.update(cms_meta_id, cms_meta)
