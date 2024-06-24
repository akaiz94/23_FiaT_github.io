from typing import List, Optional

from fastapi import APIRouter, Depends, status

from configs.OAuth import get_current_user, TokenData
from schemas.pydantic.skin.SkinMarkvuCompleteSchema import (
    SkinMarkvuCompletePostRequestSchema,
    SkinMarkvuCompleteSchema, SkinMarkvuCompleteResponseSchema,
)
from services.mb.UserService import UserService
from services.skin.SkinMarkvuCompleteService import SkinMarkvuCompleteService

SkinMarkvuCompleteRouter = APIRouter(prefix="/v1/skin/markvu/complete", tags=["skin_markvu_complete"])


@SkinMarkvuCompleteRouter.get("/", response_model=List[SkinMarkvuCompleteResponseSchema])
def index(
        surveyNo: Optional[int] = None,
        userKey: Optional[int] = None,
        pageSize: Optional[int] = 10,
        startIndex: Optional[int] = 0,
        skinMarkvuCompleteService: SkinMarkvuCompleteService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    result_list = []
    count = skinMarkvuCompleteService.count(surveyNo, userKey)
    for data in skinMarkvuCompleteService.list(surveyNo, userKey, pageSize, startIndex):
        user = None
        # if data.idx is not None and data.idx != 0:
#            user = userService.get(data.idx)
        scheam = SkinMarkvuCompleteResponseSchema(
            **{**data.__dict__, 'total_count': count}
        )
        result_list.append(scheam)
    return result_list


@SkinMarkvuCompleteRouter.get("/{idx}", response_model=SkinMarkvuCompleteSchema)
def get(idx: int,
        skinMarkvuCompleteService: SkinMarkvuCompleteService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
        ):
    return skinMarkvuCompleteService.get(idx)


@SkinMarkvuCompleteRouter.post(
    "/",
    response_model=SkinMarkvuCompleteSchema,
    status_code=status.HTTP_201_CREATED,
)
def create(
        skinMarkvuComplete: SkinMarkvuCompletePostRequestSchema,
        skinMarkvuCompleteService: SkinMarkvuCompleteService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.idx)
    return skinMarkvuCompleteService.create(skinMarkvuComplete)


@SkinMarkvuCompleteRouter.patch("/{idx}", response_model=SkinMarkvuCompleteSchema)
def update(
        idx: int,
        skinMarkvuComplete: SkinMarkvuCompletePostRequestSchema,
        skinMarkvuCompleteService: SkinMarkvuCompleteService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.idx)
    return skinMarkvuCompleteService.update(idx, skinMarkvuComplete)


@SkinMarkvuCompleteRouter.delete(
    "/{idx}", status_code=status.HTTP_204_NO_CONTENT
)
def delete(idx: int,
           skinMarkvuCompleteService: SkinMarkvuCompleteService = Depends(),
           # current_user: TokenData = Depends(get_current_user),
           # userService: UserService = Depends(),
           ):
    # user = userService.get(current_user.idx)
    return skinMarkvuCompleteService.delete(idx)
