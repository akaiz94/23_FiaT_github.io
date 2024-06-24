from typing import List, Optional

from fastapi import APIRouter, Depends, status

from configs.OAuth import get_current_user, TokenData
from schemas.pydantic.skin.SkinVapometerSchema import (
    SkinVapometerPostRequestSchema,
    SkinVapometerSchema, SkinVapometerResponseSchema,
)
from services.mb.UserService import UserService
from services.skin.SkinVapometerService import SkinVapometerService

SkinVapometerRouter = APIRouter(prefix="/v1/skin/vapometer", tags=["skin_vapometer"])


@SkinVapometerRouter.get("/", response_model=List[SkinVapometerResponseSchema])
def index(
        surveyNo: Optional[int] = None,
        userKey: Optional[int] = None,
        pageSize: Optional[int] = 10,
        startIndex: Optional[int] = 0,
        skinVapometerService: SkinVapometerService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    result_list = []
    count = skinVapometerService.count(surveyNo, userKey)
    for data in skinVapometerService.list(surveyNo, userKey, pageSize, startIndex):
        user = None
        # if data.idx is not None and data.idx != 0:
#            user = userService.get(data.idx)
        scheam = SkinVapometerResponseSchema(
            **{**data.__dict__, 'total_count': count}
        )
        result_list.append(scheam)
    return result_list


@SkinVapometerRouter.get("/{idx}", response_model=SkinVapometerSchema)
def get(idx: int,
        skinVapometerService: SkinVapometerService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
        ):
    return skinVapometerService.get(idx)


@SkinVapometerRouter.post(
    "/",
    response_model=SkinVapometerSchema,
    status_code=status.HTTP_201_CREATED,
)
def create(
        skinVapometer: SkinVapometerPostRequestSchema,
        skinVapometerService: SkinVapometerService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.idx)
    return skinVapometerService.create(skinVapometer)


@SkinVapometerRouter.patch("/{surveyNo}", response_model=SkinVapometerSchema)
def update(
        surveyNo: int,
        skinVapometer: SkinVapometerPostRequestSchema,
        skinVapometerService: SkinVapometerService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.idx)
    return skinVapometerService.update(surveyNo, skinVapometer)


@SkinVapometerRouter.delete(
    "/{idx}", status_code=status.HTTP_204_NO_CONTENT
)
def delete(idx: int,
           skinVapometerService: SkinVapometerService = Depends(),
           # current_user: TokenData = Depends(get_current_user),
           userService: UserService = Depends(),
           ):
    # user = userService.get(current_user.idx)
    return skinVapometerService.delete(idx)
