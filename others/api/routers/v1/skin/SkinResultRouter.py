from typing import List, Optional

from fastapi import APIRouter, Depends, status

from configs.OAuth import get_current_user, TokenData
from schemas.pydantic.skin.SkinResultSchema import (
    SkinResultPostRequestSchema,
    SkinResultSchema, SkinResultResponseSchema,
)
from services.mb.UserService import UserService
from services.skin.SkinResultService import SkinResultService

SkinResultRouter = APIRouter(prefix="/v1/skin/result", tags=["skin_result"])


@SkinResultRouter.get("/", response_model=List[SkinResultResponseSchema])
def index(
        surveyNo: Optional[int] = None,
        userKey: Optional[int] = None,
        pageSize: Optional[int] = 10,
        startIndex: Optional[int] = 0,
        skinResultService: SkinResultService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    result_list = []
    count = skinResultService.count(surveyNo, userKey)
    for data in skinResultService.list(surveyNo, userKey, pageSize, startIndex):
        user = None
        # if data.idx is not None and data.idx != 0:
#            user = userService.get(data.idx)
        scheam = SkinResultResponseSchema(
            **{**data.__dict__, 'total_count': count}
        )
        result_list.append(scheam)
    return result_list


@SkinResultRouter.get("/{id}", response_model=SkinResultSchema)
def get(idx: int,
        skinResultService: SkinResultService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
        ):
    return skinResultService.get(idx)


@SkinResultRouter.post(
    "/",
    response_model=SkinResultSchema,
    status_code=status.HTTP_201_CREATED,
)
def create(
        skinResult: SkinResultPostRequestSchema,
        skinResultService: SkinResultService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.idx)
    return skinResultService.create(skinResult)


@SkinResultRouter.patch("/{idx}", response_model=SkinResultSchema)
def update(
        idx: int,
        skinResult: SkinResultPostRequestSchema,
        skinResultService: SkinResultService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.idx)
    return skinResultService.update(idx, skinResult)


@SkinResultRouter.delete(
    "/{idx}", status_code=status.HTTP_204_NO_CONTENT
)
def delete(idx: int,
           skinResultService: SkinResultService = Depends(),
           # current_user: TokenData = Depends(get_current_user),
           userService: UserService = Depends(),
           ):
    # user = userService.get(current_user.idx)
    return skinResultService.delete(idx)
