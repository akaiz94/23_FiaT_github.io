from typing import List, Optional

from fastapi import APIRouter, Depends, status, UploadFile, File, Body, Request

from configs.OAuth import get_current_user, TokenData
from schemas.pydantic.cms.CmsContentsSchema import (
    CmsContentsSchema, CmsContentsResponseSchema, CmsBoardPostReqSchema, CmsBoardSearchReqSchema,
)
from schemas.pydantic.cms.CmsFileSchema import CmsFileSchema
from services.cms.CmsContentsService import CmsContentsService
from services.cms.CmsFileService import CmsFileService
from services.mb.UserService import UserService

CmsBoardRouter = APIRouter(prefix="/v1/cms/board", tags=["cms_board"])


@CmsBoardRouter.get("/search/", response_model=List[CmsContentsResponseSchema])
def search(
        request_schema: CmsBoardSearchReqSchema = Depends(),
        cmsContentsService: CmsContentsService = Depends(),
):
    result_list = []
    count = cmsContentsService.countWithRequest(request_schema)
    print(request_schema)
    print('count:',count)
    return result_list

@CmsBoardRouter.get("/", response_model=List[CmsContentsResponseSchema])
def index(
        surveyNo: Optional[int] = None,
        cont_div_cd: Optional[str] = 'REPORT',
        pageSize: Optional[int] = 10,
        startIndex: Optional[int] = 0,
        cmsContentsService: CmsContentsService = Depends(),
        # userService: UserService = Depends(),
        cmsFileService: CmsFileService = Depends(),
):
    result_list = []
    count = cmsContentsService.count(surveyNo, cont_div_cd)
    for data in cmsContentsService.list(surveyNo, cont_div_cd, pageSize, startIndex):
        user = None
        # if data.surveyNo is not None and data.surveyNo != 0:
#            user = userService.get(data.surveyNo)
        files = cmsFileService.list_by_ref_id(data.id, 100, 0)
        scheam = CmsContentsResponseSchema(
            **{**data.__dict__, 'user': user, 'files': files, 'total_count': count}
        )
        result_list.append(scheam)
    return result_list


@CmsBoardRouter.post(
    "/upload/",
    response_model=List[CmsFileSchema],
    status_code=status.HTTP_201_CREATED,
)
async def board_file_upload(
        files: List[UploadFile] = File(...),
        file_div_cd: str = Body(...),
        ref_id: int = 0,
        cmsFileService: CmsFileService = Depends(),
):
    return await cmsFileService.upload_files(file_div_cd, ref_id, 0, files)


@CmsBoardRouter.get("/{id}", response_model=CmsContentsResponseSchema)
def get(id: int,
        cmsContentsService: CmsContentsService = Depends(),
        ):
    return cmsContentsService.get(id)


@CmsBoardRouter.post(
    "/",
    response_model=CmsContentsSchema,
    status_code=status.HTTP_201_CREATED,
)
def create(
        cmsContents: CmsBoardPostReqSchema,
        cmsContentsService: CmsContentsService = Depends(),
):
    return cmsContentsService.create_with_file(cmsContents)


@CmsBoardRouter.patch("/{id}", response_model=CmsContentsSchema)
def update(
        id: int,
        cmsContents: CmsBoardPostReqSchema,
        cmsContentsService: CmsContentsService = Depends(),
):
    return cmsContentsService.update(id, cmsContents)


@CmsBoardRouter.delete(
    "/{id}", status_code=status.HTTP_204_NO_CONTENT
)
def delete(id: int,
           cmsContentsService: CmsContentsService = Depends(),
           # current_user: TokenData = Depends(get_current_user),
           userService: UserService = Depends(),
           ):
    user = userService.get(current_user.surveyNo)
    return cmsContentsService.delete(id)
