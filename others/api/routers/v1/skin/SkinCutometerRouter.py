from typing import List, Optional

from fastapi import APIRouter, Depends, status

from configs.OAuth import get_current_user, TokenData
from schemas.pydantic.skin.SkinCutometerSchema import (
    SkinCutometerPostRequestSchema,
    SkinCutometerSchema, SkinCutometerResponseSchema,
)
from services.mb.UserService import UserService
from services.skin.SkinCutometerService import SkinCutometerService

SkinCutometerRouter = APIRouter(prefix="/v1/skin/cutometer", tags=["skin_cutometer"])


@SkinCutometerRouter.get("/", response_model=List[SkinCutometerResponseSchema])
def index(
        surveyNo: Optional[int] = None,
        userKey: Optional[int] = None,
        pageSize: Optional[int] = 10,
        startIndex: Optional[int] = 0,
        skinCutometerService: SkinCutometerService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    result_list = []
    count = skinCutometerService.count(surveyNo, userKey)
    for data in skinCutometerService.list(surveyNo, userKey, pageSize, startIndex):
        user = None
        # if data.idx is not None and data.idx != 0:
#            user = userService.get(data.idx)
        scheam = SkinCutometerResponseSchema(
            **{**data.__dict__, 'total_count': count}
        )
        result_list.append(scheam)
    return result_list


@SkinCutometerRouter.get("/{idx}", response_model=SkinCutometerSchema)
def get(idx: int,
        skinCutometerService: SkinCutometerService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
        ):
    return skinCutometerService.get(idx)


@SkinCutometerRouter.post(
    "/",
    response_model=SkinCutometerSchema,
    status_code=status.HTTP_201_CREATED,
)
def create(
        skinCutometer: SkinCutometerPostRequestSchema,
        skinCutometerService: SkinCutometerService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.idx)
    return skinCutometerService.create(skinCutometer)


@SkinCutometerRouter.patch("/{idx}", response_model=SkinCutometerSchema)
def update(
        idx: int,
        skinCutometer: SkinCutometerPostRequestSchema,
        skinCutometerService: SkinCutometerService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.idx)
    return skinCutometerService.update(idx, skinCutometer)


@SkinCutometerRouter.delete(
    "/{idx}", status_code=status.HTTP_204_NO_CONTENT
)
def delete(idx: int,
           skinCutometerService: SkinCutometerService = Depends(),
           # current_user: TokenData = Depends(get_current_user),
           userService: UserService = Depends(),
           ):
    # user = userService.get(current_user.idx)
    return skinCutometerService.delete(idx)
