from datetime import datetime
from typing import List, Optional

from fastapi import Depends

# from models.AuthorModel import Author
from models.cms.CmsContentsModel import CmsContents
# from repositories.AuthorRepository import AuthorRepository
from repositories.cms.CmsContentsRepository import CmsContentsRepository
# from schemas.pydantic.AuthorSchema import AuthorSchema
from schemas.pydantic.cms.CmsContentsSchema import (
    CmsContentsSchema, CmsBoardPostReqSchema, CmsBoardSearchReqSchema,
)
from services.cms.CmsFileService import CmsFileService


class CmsContentsService:
    cmsContentsRepository: CmsContentsRepository

    def __init__(
            self,
            cmsContentsRepository: CmsContentsRepository = Depends(),
            cmsFileService: CmsFileService = Depends()
    ) -> None:
        self.cmsContentsRepository = cmsContentsRepository
        self.cmsFileService = cmsFileService

    def create(self, cms_contents_body: CmsContentsSchema) -> CmsContents:
        return self.cmsContentsRepository.create(
            CmsContents(**cms_contents_body.dict())
        )

    def create_with_file(self, cms_contents_body: CmsBoardPostReqSchema) -> CmsContents:
        contents_body = cms_contents_body.copy()
        contents_body_dict = contents_body.__dict__
        del contents_body_dict["files"]

        result = self.cmsContentsRepository.create(
            CmsContents(**contents_body_dict)
        )
        if result is not None:
            if cms_contents_body.files is not None:
                for option in cms_contents_body.files:
                    option.ref_id = result.id
                    option.surveyNo = result.surveyNo
                    self.cmsFileService.update(option.id, option)
        return result

    def deleteForce(self, cms_contents_id: int) -> None:
        return self.cmsContentsRepository.delete(CmsContents(id=cms_contents_id))

    def delete(self, cms_contents_id: int) -> None:
        self.update(cms_contents_id, CmsContents(deleted_at=datetime.now()))

    def get(self, cms_contents_id: int) -> CmsContents:
        data = self.cmsContentsRepository.get(CmsContents(id=cms_contents_id))
        data.read_cnt = data.read_cnt + 1
        self.cmsContentsRepository.update(cms_contents_id, data)
        return data

    def getItem(self, cms_contents_id: int) -> CmsContents:
        data = self.cmsContentsRepository.get(CmsContents(id=cms_contents_id))
        return data

    def list(
            self,
            surveyNo: Optional[int] = None,
            cont_div_cd: Optional[str] = None,
            pageSize: Optional[int] = 10,
            startIndex: Optional[int] = 0,
    ) -> List[CmsContents]:
        return self.cmsContentsRepository.list(
            surveyNo, cont_div_cd, pageSize, startIndex
        )

    def countWithRequest(
            self,
            request_schema: CmsBoardSearchReqSchema
    ) -> int:
        return self.cmsContentsRepository.countWithRequest(
            request_schema
        )

    def count(
            self,
            surveyNo: Optional[int] = None,
            cont_div_cd: Optional[str] = None,
    ) -> int:
        return self.cmsContentsRepository.count(
            surveyNo, cont_div_cd
        )

    def update(
            self, cms_contents_id: int, cms_contents_body: CmsContentsSchema
    ) -> CmsContents:
        cms_contents = self.getItem(cms_contents_id)

        update_fields = []
        print(f"## cms_contents_id:{cms_contents_id}")
        print(f"## cms_contents_body:{cms_contents_body}")

        for field in cms_contents_body.__dict__:
            print(f"## field:{field}")
            if field in cms_contents.__dict__:
                update_fields.append(field)

        print(f"## update_fields:{update_fields}")
        for field in update_fields:
            if field != '_sa_instance_state':
                setattr(cms_contents, field, getattr(cms_contents_body, field))

        return self.cmsContentsRepository.update(cms_contents_id, cms_contents)
