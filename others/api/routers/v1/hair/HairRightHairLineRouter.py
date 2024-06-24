from typing import List, Optional

from fastapi import APIRouter, Depends, status

from configs.OAuth import get_current_user, TokenData
from schemas.pydantic.hair.HairRightHairLineSchema import (
    HairRightHairLinePostRequestSchema,
    HairRightHairLineSchema, HairRightHairLineResponseSchema,
)
from services.hair.HairRightHairLineService import HairRightHairLineService
from services.mb.UserService import UserService

HairRightHairLineRouter = APIRouter(prefix="/v1/hairRightHairLine", tags=["hair_right_hair_line"])


@HairRightHairLineRouter.get("/", response_model=List[HairRightHairLineResponseSchema])
def index(
        surveyNo: Optional[int] = None,
        userKey: Optional[int] = None,
        Name: Optional[str] = None,
        pageSize: Optional[int] = 10,
        startIndex: Optional[int] = 0,
        hairRightHairLineService: HairRightHairLineService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    result_list = []
    count = hairRightHairLineService.count(surveyNo, userKey, Name)
    for data in hairRightHairLineService.list(surveyNo, userKey, Name, pageSize, startIndex):
        user = None
        # if data.idx is not None and data.idx != 0:
#            user = userService.get(data.idx)
        scheam = HairRightHairLineResponseSchema(
            **{**data.__dict__, 'total_count': count}
        )
        result_list.append(scheam)
    return result_list


@HairRightHairLineRouter.get("/{idx}", response_model=HairRightHairLineSchema)
def get(idx: int,
        hairRightHairLineService: HairRightHairLineService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
        ):
    return hairRightHairLineService.get(idx)


@HairRightHairLineRouter.post(
    "/",
    response_model=HairRightHairLineSchema,
    status_code=status.HTTP_201_CREATED,
)
def create(
        hairRightHairLine: HairRightHairLinePostRequestSchema,
        hairRightHairLineService: HairRightHairLineService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.idx)
    return hairRightHairLineService.create(hairRightHairLine)


@HairRightHairLineRouter.patch("/{idx}", response_model=HairRightHairLineSchema)
def update(
        idx: int,
        hairRightHairLine: HairRightHairLinePostRequestSchema,
        hairRightHairLineService: HairRightHairLineService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.idx)
    return hairRightHairLineService.update(idx, hairRightHairLine)


@HairRightHairLineRouter.delete(
    "/{idx}", status_code=status.HTTP_204_NO_CONTENT
)
def delete(idx: int,
           hairRightHairLineService: HairRightHairLineService = Depends(),
           # current_user: TokenData = Depends(get_current_user),
           userService: UserService = Depends(),
           ):
    # user = userService.get(current_user.idx)
    return hairRightHairLineService.delete(idx)
