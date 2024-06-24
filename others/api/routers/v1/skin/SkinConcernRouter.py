from typing import List, Optional

from fastapi import APIRouter, Depends, status

from configs.OAuth import get_current_user, TokenData
from schemas.pydantic.skin.SkinConcernSchema import (
    SkinConcernPostRequestSchema,
    SkinConcernSchema, SkinConcernResponseSchema,
)
from services.mb.UserService import UserService
from services.skin.SkinConcernService import SkinConcernService

SkinConcernRouter = APIRouter(prefix="/v1/skin/concern", tags=["skin_concern"])


@SkinConcernRouter.get("/", response_model=List[SkinConcernResponseSchema])
def index(
        surveyNo: Optional[int] = None,
        userKey: Optional[int] = None,
        pageSize: Optional[int] = 10,
        startIndex: Optional[int] = 0,
        skinConcernService: SkinConcernService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    result_list = []
    count = skinConcernService.count(surveyNo, userKey)
    for data in skinConcernService.list(surveyNo, userKey, pageSize, startIndex):
        user = None
        # if data.idx is not None and data.idx != 0:
#            user = userService.get(data.idx)
        scheam = SkinConcernResponseSchema(
            **{**data.__dict__, 'total_count': count}
        )
        result_list.append(scheam)
    return result_list


@SkinConcernRouter.get("/{idx}", response_model=SkinConcernSchema)
def get(idx: int,
        skinConcernService: SkinConcernService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
        ):
    return skinConcernService.get(idx)


@SkinConcernRouter.post(
    "/",
    response_model=SkinConcernSchema,
    status_code=status.HTTP_201_CREATED,
)
def create(
        skinConcern: SkinConcernPostRequestSchema,
        skinConcernService: SkinConcernService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.idx)
    return skinConcernService.create(skinConcern)


@SkinConcernRouter.patch("/{idx}", response_model=SkinConcernSchema)
def update(
        idx: int,
        skinConcern: SkinConcernPostRequestSchema,
        skinConcernService: SkinConcernService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.idx)
    return skinConcernService.update(idx, skinConcern)


@SkinConcernRouter.delete(
    "/{idx}", status_code=status.HTTP_204_NO_CONTENT
)
def delete(idx: int,
           skinConcernService: SkinConcernService = Depends(),
           # current_user: TokenData = Depends(get_current_user),
           userService: UserService = Depends(),
           ):
    # user = userService.get(current_user.idx)
    return skinConcernService.delete(idx)
