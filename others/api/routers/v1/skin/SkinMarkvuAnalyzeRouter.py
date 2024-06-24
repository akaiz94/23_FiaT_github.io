from typing import List, Optional

from fastapi import APIRouter, Depends, status

from configs.OAuth import get_current_user, TokenData
from schemas.pydantic.skin.SkinMarkvuAnalyzeSchema import (
    SkinMarkvuAnalyzePostRequestSchema,
    SkinMarkvuAnalyzeSchema, SkinMarkvuAnalyzeResponseSchema,
)
from services.mb.UserService import UserService
from services.skin.SkinMarkvuAnalyzeService import SkinMarkvuAnalyzeService

SkinMarkvuAnalyzeRouter = APIRouter(prefix="/v1/skin/markvu/analyze", tags=["skin_markvu_analyze"])


@SkinMarkvuAnalyzeRouter.get("/", response_model=List[SkinMarkvuAnalyzeResponseSchema])
def index(
        userkey: Optional[int] = None,
        pageSize: Optional[int] = 10,
        startIndex: Optional[int] = 0,
        skinMarkvuAnalyzeService: SkinMarkvuAnalyzeService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    result_list = []
    count = skinMarkvuAnalyzeService.count(userkey)
    for data in skinMarkvuAnalyzeService.list(userkey, pageSize, startIndex):
        user = None
        # if data.idx is not None and data.idx != 0:
#            user = userService.get(data.idx)
        scheam = SkinMarkvuAnalyzeResponseSchema(
            **{**data.__dict__, 'total_count': count}
        )
        result_list.append(scheam)
    return result_list


@SkinMarkvuAnalyzeRouter.get("/{idx}", response_model=SkinMarkvuAnalyzeSchema)
def get(idx: int,
        skinMarkvuAnalyzeService: SkinMarkvuAnalyzeService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
        ):
    return skinMarkvuAnalyzeService.get(idx)


@SkinMarkvuAnalyzeRouter.post(
    "/",
    response_model=SkinMarkvuAnalyzeSchema,
    status_code=status.HTTP_201_CREATED,
)
def create(
        skinMarkvuAnalyze: SkinMarkvuAnalyzePostRequestSchema,
        skinMarkvuAnalyzeService: SkinMarkvuAnalyzeService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.idx)
    return skinMarkvuAnalyzeService.create(skinMarkvuAnalyze)


@SkinMarkvuAnalyzeRouter.patch("/{idx}", response_model=SkinMarkvuAnalyzeSchema)
def update(
        idx: int,
        skinMarkvuAnalyze: SkinMarkvuAnalyzePostRequestSchema,
        skinMarkvuAnalyzeService: SkinMarkvuAnalyzeService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.idx)
    return skinMarkvuAnalyzeService.update(idx, skinMarkvuAnalyze)


@SkinMarkvuAnalyzeRouter.delete(
    "/{idx}", status_code=status.HTTP_204_NO_CONTENT
)
def delete(id: int,
           skinMarkvuAnalyzeService: SkinMarkvuAnalyzeService = Depends(),
           # current_user: TokenData = Depends(get_current_user),
           userService: UserService = Depends(),
           ):
    # user = userService.get(current_user.idx)
    return skinMarkvuAnalyzeService.delete(idx)
