from typing import List, Optional

from fastapi import APIRouter, Depends, status

from configs.OAuth import get_current_user, TokenData
from schemas.pydantic.skin.SkinAnteraSchema import (
    SkinAnteraPostRequestSchema,
    SkinAnteraSchema, SkinAnteraResponseSchema,
)
from services.mb.UserService import UserService
from services.skin.SkinAnteraService import SkinAnteraService

SkinAnteraRouter = APIRouter(prefix="/v1/skin/antera", tags=["skin_antera"])


@SkinAnteraRouter.get("/", response_model=List[SkinAnteraResponseSchema])
def index(
        surveyNo: Optional[int] = None,
        userKey: Optional[int] = None,
        pageSize: Optional[int] = 10,
        startIndex: Optional[int] = 0,
        skinAnteraService: SkinAnteraService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    result_list = []
    count = skinAnteraService.count(surveyNo, userKey)
    for data in skinAnteraService.list(surveyNo, userKey, pageSize, startIndex):
        user = None
        # if data.idx is not None and data.idx != 0:
#            user = userService.get(data.idx)
        scheam = SkinAnteraResponseSchema(
            **{**data.__dict__, 'total_count': count}
        )
        result_list.append(scheam)
    return result_list


@SkinAnteraRouter.get("/{idx}", response_model=SkinAnteraSchema)
def get(idx: int,
        skinAnteraService: SkinAnteraService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
        ):
    return skinAnteraService.get(idx)


@SkinAnteraRouter.post(
    "/",
    response_model=SkinAnteraSchema,
    status_code=status.HTTP_201_CREATED,
)
def create(
        skinAntera: SkinAnteraPostRequestSchema,
        skinAnteraService: SkinAnteraService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.idx)
    return skinAnteraService.create(skinAntera)


@SkinAnteraRouter.patch("/{idx}", response_model=SkinAnteraSchema)
def update(
        idx: int,
        skinAntera: SkinAnteraPostRequestSchema,
        skinAnteraService: SkinAnteraService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.idx)
    return skinAnteraService.update(idx, skinAntera)


@SkinAnteraRouter.delete(
    "/{idx}", status_code=status.HTTP_204_NO_CONTENT
)
def delete(idx: int,
           skinAnteraService: SkinAnteraService = Depends(),
           # current_user: TokenData = Depends(get_current_user),
           userService: UserService = Depends(),
           ):
    # user = userService.get(current_user.idx)
    return skinAnteraService.delete(idx)
