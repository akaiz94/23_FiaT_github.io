from typing import List, Optional

from fastapi import APIRouter, Depends, status, File, Body, UploadFile

from configs.OAuth import get_current_user, TokenData
from schemas.pydantic.cms.CmsFileSchema import (
    CmsFilePostRequestSchema,
    CmsFileSchema, CmsFileResponseSchema,
)
from services.cms.CmsFileService import CmsFileService
from services.mb.UserService import UserService

CmsFileRouter = APIRouter(prefix="/v1/cms/file", tags=["cms_file"])


# sys.set_int_max_str_digits(2097152)  # Set maximum limit to 2097152 digits
@CmsFileRouter.get("/", response_model=List[CmsFileResponseSchema])
def index(
        pageSize: Optional[int] = 10,
        startIndex: Optional[int] = 0,
        cmsFileService: CmsFileService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    user = userService.get(current_user.surveyNo)

    result_list = []
    for data in cmsFileService.list(user.id, pageSize, startIndex):
        scheam = CmsFileResponseSchema(
            **{**data.__dict__, 'user': userService.get(data.surveyNo)}
        )
        result_list.append(scheam)
    return result_list


@CmsFileRouter.get("/{id}", response_model=CmsFileSchema)
def get(id: int,
        cmsFileService: CmsFileService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
        ):
    user = userService.get(current_user.surveyNo)
    return cmsFileService.get(id)


@CmsFileRouter.post(
    "/upload",
    response_model=List[CmsFileSchema],
    status_code=status.HTTP_201_CREATED,
    description="파일 업로드",
)
async def file_upload(
        files: List[UploadFile] = File(...),
        file_div_cd: str = Body(...),
        ref_id: int = 0,
        # current_user: TokenData = Depends(get_current_user),
        cmsFileService: CmsFileService = Depends(),
        # userService: UserService = Depends(),
):
    # Check if token exists
    user = userService.get(current_user.surveyNo)

    return await cmsFileService.upload_files(file_div_cd, ref_id, user.id, files)


@CmsFileRouter.post(
    "/upload/profile",
    response_model=List[CmsFileSchema],
    status_code=status.HTTP_201_CREATED,
)
async def profile_upload(
        files: List[UploadFile] = File(...),
        file_div_cd: str = Body(...),
        cmsFileService: CmsFileService = Depends(),
):
    return await cmsFileService.upload_files(file_div_cd, 0, 0, files)


@CmsFileRouter.post(
    "/",
    response_model=CmsFileSchema,
    status_code=status.HTTP_201_CREATED,
)
def create(
        cmsFile: CmsFilePostRequestSchema,
        cmsFileService: CmsFileService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    user = userService.get(current_user.surveyNo)
    return cmsFileService.create(cmsFile)


@CmsFileRouter.patch("/{id}", response_model=CmsFileSchema)
def update(
        id: int,
        cmsFile: CmsFilePostRequestSchema,
        cmsFileService: CmsFileService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    user = userService.get(current_user.surveyNo)
    return cmsFileService.update(id, cmsFile)


@CmsFileRouter.delete(
    "/{id}", status_code=status.HTTP_204_NO_CONTENT
)
def delete(id: int,
           cmsFileService: CmsFileService = Depends(),
           # current_user: TokenData = Depends(get_current_user),
           userService: UserService = Depends(),
           ):
    user = userService.get(current_user.surveyNo)
    return cmsFileService.delete(id)
