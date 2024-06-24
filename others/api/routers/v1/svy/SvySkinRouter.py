from typing import List, Optional

from fastapi import APIRouter, Depends, status

from configs.OAuth import get_current_user, TokenData
from schemas.pydantic.svy.SvySkinSchema import (
    SvySkinPostRequestSchema,
    SvySkinSchema, SvySkinResponseSchema,
)
from services.mb.UserService import UserService
from services.svy.SvySkinService import SvySkinService

SvySkinRouter = APIRouter(prefix="/v1/svy/skin", tags=["svy_skin"])


@SvySkinRouter.get("/", response_model=List[SvySkinResponseSchema])
def index(
        surveyNo: Optional[int] = None,
        surveyDate: Optional[str] = None,
        userkey: Optional[int] = None,
        pageSize: Optional[int] = 10,
        startIndex: Optional[int] = 0,
        svySkinService: SvySkinService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    result_list = []
    count = svySkinService.count(surveyNo, surveyDate, userkey)
    for data in svySkinService.list(surveyNo, surveyDate, userkey, pageSize, startIndex):
        user = None
        # if data.surveyNo is not None and data.surveyNo != 0:
#            user = userService.get(data.surveyNo)
        scheam = SvySkinResponseSchema(
            **{**data.__dict__, 'total_count': count}
        )
        result_list.append(scheam)
    return result_list


@SvySkinRouter.get("/{surveyNo}", response_model=SvySkinSchema)
def get(surveyNo: int,
        svySkinService: SvySkinService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
        ):
    return svySkinService.get(surveyNo)


@SvySkinRouter.post(
    "/",
    response_model=SvySkinSchema,
    status_code=status.HTTP_201_CREATED,
)
def create(
        svySkin: SvySkinPostRequestSchema,
        svySkinService: SvySkinService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.surveyNo)
    return svySkinService.create(svySkin)


@SvySkinRouter.patch("/{surveyNo}", response_model=SvySkinSchema)
def update(
        surveyNo: int,
        svySkin: SvySkinPostRequestSchema,
        svySkinService: SvySkinService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.surveyNo)
    return svySkinService.update(surveyNo, svySkin)


@SvySkinRouter.delete(
    "/{surveyNo}", status_code=status.HTTP_204_NO_CONTENT
)
def delete(surveyNo: int,
           svySkinService: SvySkinService = Depends(),
           # current_user: TokenData = Depends(get_current_user),
           userService: UserService = Depends(),
           ):
    # user = userService.get(current_user.surveyNo)
    return svySkinService.delete(surveyNo)
