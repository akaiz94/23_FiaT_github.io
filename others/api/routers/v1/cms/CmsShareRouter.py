from typing import List, Optional

from fastapi import APIRouter, Depends, status

from configs.OAuth import get_current_user, TokenData
from schemas.pydantic.cms.CmsShareSchema import (
    CmsSharePostRequestSchema,
    CmsShareSchema, CmsShareResponseSchema,
)
from services.cms.CmsShareService import CmsShareService
from services.mb.UserService import UserService

CmsShareRouter = APIRouter(prefix="/v1/cms/share", tags=["cms_share"])


@CmsShareRouter.get("/", response_model=List[CmsShareResponseSchema])
def index(
        surveyNo: Optional[int] = None,
        pageSize: Optional[int] = 10,
        startIndex: Optional[int] = 0,
        cmsShareService: CmsShareService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    user = userService.get(current_user.surveyNo)

    result_list = []
    for data in cmsShareService.list(user.id, pageSize, startIndex):
        scheam = CmsShareResponseSchema(
            **{**data.__dict__, 'user': userService.get(data.surveyNo)}
        )
        result_list.append(scheam)
    return result_list


@CmsShareRouter.get("/{id}", response_model=CmsShareSchema)
def get(id: int,
        cmsShareService: CmsShareService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
        ):
    user = userService.get(current_user.surveyNo)
    return cmsShareService.get(id)


@CmsShareRouter.post(
    "/",
    response_model=CmsShareSchema,
    status_code=status.HTTP_201_CREATED,
)
def create(
        cmsShare: CmsSharePostRequestSchema,
        cmsShareService: CmsShareService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    user = userService.get(current_user.surveyNo)
    return cmsShareService.create(cmsShare)


@CmsShareRouter.patch("/{id}", response_model=CmsShareSchema)
def update(
        id: int,
        cmsShare: CmsSharePostRequestSchema,
        cmsShareService: CmsShareService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    user = userService.get(current_user.surveyNo)
    return cmsShareService.update(id, cmsShare)


@CmsShareRouter.delete(
    "/{id}", status_code=status.HTTP_204_NO_CONTENT
)
def delete(id: int,
           cmsShareService: CmsShareService = Depends(),
           # current_user: TokenData = Depends(get_current_user),
           userService: UserService = Depends(),
           ):
    user = userService.get(current_user.surveyNo)
    return cmsShareService.delete(id)
