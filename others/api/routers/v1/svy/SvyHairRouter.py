from typing import List, Optional

from fastapi import APIRouter, Depends, status

from configs.OAuth import get_current_user, TokenData
from schemas.pydantic.svy.SvyHairSchema import (
    SvyHairPostRequestSchema,
    SvyHairSchema, SvyHairResponseSchema,
)
from services.mb.UserService import UserService
from services.svy.SvyHairService import SvyHairService

SvyHairRouter = APIRouter(prefix="/v1/svy/hair", tags=["svy_hair"])


@SvyHairRouter.get("/", response_model=List[SvyHairResponseSchema])
def index(
        surveyNo: Optional[int] = None,
        surveyDate: Optional[str] = None,
        userkey: Optional[int] = None,
        pageSize: Optional[int] = 10,
        startIndex: Optional[int] = 0,
        svyHairService: SvyHairService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    result_list = []
    count = svyHairService.count(surveyNo, surveyDate, userkey)
    for data in svyHairService.list(surveyNo, surveyDate, userkey, pageSize, startIndex):
        user = None
        # if data.surveyNo is not None and data.surveyNo != 0:
#            user = userService.get(data.surveyNo)
        scheam = SvyHairResponseSchema(
            **{**data.__dict__, 'total_count': count}
        )
        result_list.append(scheam)
    return result_list


@SvyHairRouter.get("/{surveyNo}", response_model=SvyHairSchema)
def get(surveyNo: int,
        svyHairService: SvyHairService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
        ):
    return svyHairService.get(surveyNo)


@SvyHairRouter.post(
    "/",
    response_model=SvyHairSchema,
    status_code=status.HTTP_201_CREATED,
)
def create(
        svyHair: SvyHairPostRequestSchema,
        svyHairService: SvyHairService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.surveyNo)
    return svyHairService.create(svyHair)


@SvyHairRouter.patch("/{surveyNo}", response_model=SvyHairSchema)
def update(
        surveyNo: int,
        svyHair: SvyHairPostRequestSchema,
        svyHairService: SvyHairService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.surveyNo)
    return svyHairService.update(surveyNo, svyHair)


@SvyHairRouter.delete(
    "/{surveyNo}", status_code=status.HTTP_204_NO_CONTENT
)
def delete(surveyNo: int,
           svyHairService: SvyHairService = Depends(),
           # current_user: TokenData = Depends(get_current_user),
           userService: UserService = Depends(),
           ):
    # user = userService.get(current_user.surveyNo)
    return svyHairService.delete(surveyNo)
