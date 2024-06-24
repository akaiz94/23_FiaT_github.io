from typing import List, Optional

from fastapi import APIRouter, Depends, status

from configs.OAuth import get_current_user, TokenData
from schemas.pydantic.hair.HairFrontCenterSchema import (
    HairFrontCenterPostRequestSchema,
    HairFrontCenterSchema, HairFrontCenterResponseSchema,
)
from services.hair.HairFrontCenterService import HairFrontCenterService
from services.mb.UserService import UserService

HairFrontCenterRouter = APIRouter(prefix="/v1/hairFrontCenter", tags=["hair_front_center"])


@HairFrontCenterRouter.get("/", response_model=List[HairFrontCenterResponseSchema])
def index(
        surveyNo: Optional[int] = None,
        userKey: Optional[int] = None,
        Name: Optional[str] = None,
        pageSize: Optional[int] = 10,
        startIndex: Optional[int] = 0,
        hairFrontCenterService: HairFrontCenterService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    result_list = []
    count = hairFrontCenterService.count(surveyNo, userKey, Name)
    for data in hairFrontCenterService.list(surveyNo, userKey, Name, pageSize, startIndex):
        user = None
        # if data.idx is not None and data.idx != 0:
#            user = userService.get(data.idx)
        scheam = HairFrontCenterResponseSchema(
            **{**data.__dict__, 'total_count': count}
        )
        result_list.append(scheam)
    return result_list


@HairFrontCenterRouter.get("/{idx}", response_model=HairFrontCenterSchema)
def get(idx: int,
        hairFrontCenterService: HairFrontCenterService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
        ):
    return hairFrontCenterService.get(idx)


@HairFrontCenterRouter.post(
    "/",
    response_model=HairFrontCenterSchema,
    status_code=status.HTTP_201_CREATED,
)
def create(
        hairFrontCenter: HairFrontCenterPostRequestSchema,
        hairFrontCenterService: HairFrontCenterService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.idx)
    return hairFrontCenterService.create(hairFrontCenter)


@HairFrontCenterRouter.patch("/{idx}", response_model=HairFrontCenterSchema)
def update(
        idx: int,
        hairFrontCenter: HairFrontCenterPostRequestSchema,
        hairFrontCenterService: HairFrontCenterService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.idx)
    return hairFrontCenterService.update(idx, hairFrontCenter)


@HairFrontCenterRouter.delete(
    "/{idx}", status_code=status.HTTP_204_NO_CONTENT
)
def delete(idx: int,
           hairFrontCenterService: HairFrontCenterService = Depends(),
           # current_user: TokenData = Depends(get_current_user),
           userService: UserService = Depends(),
           ):
    # user = userService.get(current_user.idx)
    return hairFrontCenterService.delete(idx)
