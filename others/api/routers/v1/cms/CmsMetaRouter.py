from typing import List, Optional

from fastapi import APIRouter, Depends, status

from configs.OAuth import get_current_user, TokenData
from schemas.pydantic.cms.CmsMetaSchema import (
    CmsMetaPostRequestSchema,
    CmsMetaSchema, CmsMetaResponseSchema,
)
from services.cms.CmsMetaService import CmsMetaService
from services.mb.UserService import UserService

CmsMetaRouter = APIRouter(prefix="/v1/cms/message", tags=["cms_meta"])


@CmsMetaRouter.get("/", response_model=List[CmsMetaResponseSchema])
def index(
        pageSize: Optional[int] = 10,
        startIndex: Optional[int] = 0,
        cmsMetaService: CmsMetaService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    user = userService.get(current_user.surveyNo)

    result_list = []
    for data in cmsMetaService.list(user.id, pageSize, startIndex):
        scheam = CmsMetaResponseSchema(
            **{**data.__dict__, 'user': userService.get(data.surveyNo)}
        )
        result_list.append(scheam)
    return result_list


@CmsMetaRouter.get("/{id}", response_model=CmsMetaSchema)
def get(id: int,
        cmsMetaService: CmsMetaService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
        ):
    user = userService.get(current_user.surveyNo)
    return cmsMetaService.get(id)


@CmsMetaRouter.post(
    "/",
    response_model=CmsMetaSchema,
    status_code=status.HTTP_201_CREATED,
)
def create(
        cmsMeta: CmsMetaPostRequestSchema,
        cmsMetaService: CmsMetaService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    user = userService.get(current_user.surveyNo)
    return cmsMetaService.create(cmsMeta)


@CmsMetaRouter.patch("/{id}", response_model=CmsMetaSchema)
def update(
        id: int,
        cmsMeta: CmsMetaPostRequestSchema,
        cmsMetaService: CmsMetaService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    user = userService.get(current_user.surveyNo)
    return cmsMetaService.update(id, cmsMeta)


@CmsMetaRouter.delete(
    "/{id}", status_code=status.HTTP_204_NO_CONTENT
)
def delete(id: int,
           cmsMetaService: CmsMetaService = Depends(),
           # current_user: TokenData = Depends(get_current_user),
           userService: UserService = Depends(),
           ):
    user = userService.get(current_user.surveyNo)
    return cmsMetaService.delete(id)
