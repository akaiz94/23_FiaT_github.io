from typing import List, Optional

from fastapi import APIRouter, Depends, status

from configs.OAuth import get_current_user, TokenData
from schemas.pydantic.cms.CmsContentsSchema import (
    CmsContentsPostRequestSchema,
    CmsContentsSchema, CmsContentsResponseSchema,
)
from services.cms.CmsContentsService import CmsContentsService
from services.mb.UserService import UserService

CmsContentsRouter = APIRouter(prefix="/v1/cms/contents", tags=["cms_contents"])


@CmsContentsRouter.get("/", response_model=List[CmsContentsResponseSchema])
def index(
        surveyNo: Optional[int] = None,
        cont_div_cd: Optional[str] = None,
        pageSize: Optional[int] = 10,
        startIndex: Optional[int] = 0,
        cmsContentsService: CmsContentsService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.surveyNo)
    result_list = []
    for data in cmsContentsService.list(surveyNo, cont_div_cd, pageSize, startIndex):
        scheam = CmsContentsResponseSchema(
            **{**data.__dict__}
        )
        result_list.append(scheam)
    return result_list


@CmsContentsRouter.get("/{id}", response_model=CmsContentsSchema)
def get(id: int,
        cmsContentsService: CmsContentsService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
        ):
    user = userService.get(current_user.surveyNo)
    return cmsContentsService.get(id)


@CmsContentsRouter.post(
    "/",
    response_model=CmsContentsSchema,
    status_code=status.HTTP_201_CREATED,
)
def create(
        cmsContents: CmsContentsPostRequestSchema,
        cmsContentsService: CmsContentsService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    user = userService.get(current_user.surveyNo)
    return cmsContentsService.create(cmsContents)


@CmsContentsRouter.patch("/{id}", response_model=CmsContentsSchema)
def update(
        id: int,
        cmsContents: CmsContentsPostRequestSchema,
        cmsContentsService: CmsContentsService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    user = userService.get(current_user.surveyNo)
    return cmsContentsService.update(id, cmsContents)


@CmsContentsRouter.delete(
    "/{id}", status_code=status.HTTP_204_NO_CONTENT
)
def delete(id: int,
           cmsContentsService: CmsContentsService = Depends(),
           # current_user: TokenData = Depends(get_current_user),
           userService: UserService = Depends(),
           ):
    user = userService.get(current_user.surveyNo)
    return cmsContentsService.delete(id)
