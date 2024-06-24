from typing import List, Optional

from fastapi import APIRouter, Depends, status

from configs.OAuth import get_current_user, TokenData
from schemas.pydantic.skin.SkinMarkvuResultSchema import (
    SkinMarkvuResultPostRequestSchema,
    SkinMarkvuResultSchema, SkinMarkvuResultResponseSchema,
)
from services.mb.UserService import UserService
from services.skin.SkinMarkvuResultService import SkinMarkvuResultService

SkinMarkvuResultRouter = APIRouter(prefix="/v1/skin/markvu/result", tags=["skin_markvu_result"])


@SkinMarkvuResultRouter.get("/", response_model=List[SkinMarkvuResultResponseSchema])
def index(
        surveyNo: Optional[int] = None,
        userkey: Optional[int] = None,
        pageSize: Optional[int] = 10,
        startIndex: Optional[int] = 0,
        skinMarkvuResultService: SkinMarkvuResultService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    result_list = []
    count = skinMarkvuResultService.count(surveyNo, userkey)
    for data in skinMarkvuResultService.list(surveyNo, userkey, pageSize, startIndex):
        user = None
        # if data.idx is not None and data.idx != 0:
#            user = userService.get(data.idx)
        scheam = SkinMarkvuResultResponseSchema(
            **{**data.__dict__, 'total_count': count}
        )
        result_list.append(scheam)
    return result_list


@SkinMarkvuResultRouter.get("/{idx}", response_model=SkinMarkvuResultSchema)
def get(idx: int,
        skinMarkvuResultService: SkinMarkvuResultService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
        ):
    return skinMarkvuResultService.get(idx)


@SkinMarkvuResultRouter.post(
    "/",
    response_model=SkinMarkvuResultSchema,
    status_code=status.HTTP_201_CREATED,
)
def create(
        skinMarkvuResult: SkinMarkvuResultPostRequestSchema,
        skinMarkvuResultService: SkinMarkvuResultService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.idx)
    return skinMarkvuResultService.create(skinMarkvuResult)


@SkinMarkvuResultRouter.patch("/{idx}", response_model=SkinMarkvuResultSchema)
def update(
        idx: int,
        skinMarkvuResult: SkinMarkvuResultPostRequestSchema,
        skinMarkvuResultService: SkinMarkvuResultService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.idx)
    return skinMarkvuResultService.update(idx, skinMarkvuResult)


@SkinMarkvuResultRouter.delete(
    "/{idx}", status_code=status.HTTP_204_NO_CONTENT
)
def delete(idx: int,
           skinMarkvuResultService: SkinMarkvuResultService = Depends(),
           # current_user: TokenData = Depends(get_current_user),
           userService: UserService = Depends(),
           ):
    # user = userService.get(current_user.idx)
    return skinMarkvuResultService.delete(idx)
