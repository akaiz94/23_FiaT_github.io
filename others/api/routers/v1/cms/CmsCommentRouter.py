from typing import List, Optional

from fastapi import APIRouter, Depends, status

from configs.OAuth import get_current_user, TokenData
from schemas.pydantic.cms.CmsCommentSchema import (
    CmsCommentPostRequestSchema,
    CmsCommentSchema, CmsCommentResponseSchema,
)
from services.cms.CmsCommentService import CmsCommentService
from services.mb.UserService import UserService

CmsCommentRouter = APIRouter(prefix="/v1/cms/comment", tags=["cms_comment"])


@CmsCommentRouter.get("/", response_model=List[CmsCommentResponseSchema])
def index(
        pageSize: Optional[int] = 10,
        startIndex: Optional[int] = 0,
        cmsCommentService: CmsCommentService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    user = userService.get(current_user.surveyNo)

    result_list = []
    for data in cmsCommentService.list(user.id, pageSize, startIndex):
        scheam = CmsCommentResponseSchema(
            **{**data.__dict__, 'user': userService.get(data.surveyNo)}
        )
        result_list.append(scheam)
    return result_list


@CmsCommentRouter.get("/{id}", response_model=CmsCommentSchema)
def get(id: int,
        cmsCommentService: CmsCommentService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
        ):
    user = userService.get(current_user.surveyNo)
    return cmsCommentService.get(id)


@CmsCommentRouter.post(
    "/",
    response_model=CmsCommentSchema,
    status_code=status.HTTP_201_CREATED,
)
def create(
        cmsComment: CmsCommentPostRequestSchema,
        cmsCommentService: CmsCommentService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    user = userService.get(current_user.surveyNo)
    return cmsCommentService.create(cmsComment)


@CmsCommentRouter.patch("/{id}", response_model=CmsCommentSchema)
def update(
        id: int,
        cmsComment: CmsCommentPostRequestSchema,
        cmsCommentService: CmsCommentService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    user = userService.get(current_user.surveyNo)
    return cmsCommentService.update(id, cmsComment)


@CmsCommentRouter.delete(
    "/{id}", status_code=status.HTTP_204_NO_CONTENT
)
def delete(id: int,
           cmsCommentService: CmsCommentService = Depends(),
           # current_user: TokenData = Depends(get_current_user),
           userService: UserService = Depends(),
           ):
    user = userService.get(current_user.surveyNo)
    return cmsCommentService.delete(id)
