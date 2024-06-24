from typing import List, Optional

from fastapi import APIRouter, Depends, status

from configs.OAuth import get_current_user, TokenData
from schemas.pydantic.hair.HairCenterSchema import (
    HairCenterPostRequestSchema,
    HairCenterSchema, HairCenterResponseSchema,
)
from services.hair.HairCenterService import HairCenterService
from services.mb.UserService import UserService

HairCenterRouter = APIRouter(prefix="/v1/hairCenter", tags=["hair_center"])


@HairCenterRouter.get("/", response_model=List[HairCenterResponseSchema])
def index(
        surveyNo: Optional[int] = None,
        userKey: Optional[int] = None,
        Name: Optional[str] = None,
        pageSize: Optional[int] = 10,
        startIndex: Optional[int] = 0,
        hairCenterService: HairCenterService = Depends(),
        # # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    result_list = []
    count = hairCenterService.count(surveyNo, userKey, Name)
    for data in hairCenterService.list(surveyNo, userKey, Name, pageSize, startIndex):
        # user = None
        # if data.idx is not None and data.idx != 0:
        #     user = userService.get(data.idx)
        # scheam = HairCenterResponseSchema(
        #     **{**data.__dict__, 'total_count': count}
        # )
        scheam = HairCenterResponseSchema(
            **{**data.__dict__, 'total_count': count}
        )
        result_list.append(scheam)
    return result_list


@HairCenterRouter.get("/{idx}", response_model=HairCenterSchema)
def get(idx: int,
        hairCenterService: HairCenterService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
        ):
    return hairCenterService.get(idx)


@HairCenterRouter.post(
    "/",
    response_model=HairCenterSchema,
    status_code=status.HTTP_201_CREATED,
)
def create(
        hairCenter: HairCenterPostRequestSchema,
        hairCenterService: HairCenterService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    return hairCenterService.create(hairCenter)


@HairCenterRouter.patch("/{id}", response_model=HairCenterSchema)
def update(
        idx: int,
        hairCenter: HairCenterPostRequestSchema,
        hairCenterService: HairCenterService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    return hairCenterService.update(idx, hairCenter)


@HairCenterRouter.delete(
    "/{idx}", status_code=status.HTTP_204_NO_CONTENT
)
def delete(idx: int,
           hairCenterService: HairCenterService = Depends(),
           # current_user: TokenData = Depends(get_current_user),
           userService: UserService = Depends(),
           ):
    return hairCenterService.delete(idx)
