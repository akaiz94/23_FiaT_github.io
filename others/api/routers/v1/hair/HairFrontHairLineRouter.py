from typing import List, Optional

from fastapi import APIRouter, Depends, status

from configs.OAuth import get_current_user, TokenData
from schemas.pydantic.hair.HairFrontHairLineSchema import (
    HairFrontHairLinePostRequestSchema,
    HairFrontHairLineSchema, HairFrontHairLineResponseSchema,
)
from services.hair.HairFrontHairLineService import HairFrontHairLineService
from services.mb.UserService import UserService

HairFrontHairLineRouter = APIRouter(prefix="/v1/hairFrontHairLine", tags=["hair_front_hair_line"])


@HairFrontHairLineRouter.get("/", response_model=List[HairFrontHairLineResponseSchema])
def index(
        surveyNo: Optional[int] = None,
        userKey: Optional[int] = None,
        Name: Optional[str] = None,
        pageSize: Optional[int] = 10,
        startIndex: Optional[int] = 0,
        hairFrontHairLineService: HairFrontHairLineService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    result_list = []
    count = hairFrontHairLineService.count(surveyNo, userKey, Name)
    for data in hairFrontHairLineService.list(surveyNo, userKey, Name, pageSize, startIndex):
        user = None
        # if data.idx is not None and data.idx != 0:
#            user = userService.get(data.idx)
        scheam = HairFrontHairLineResponseSchema(
            **{**data.__dict__, 'total_count': count}
        )
        result_list.append(scheam)
    return result_list


@HairFrontHairLineRouter.get("/{idx}", response_model=HairFrontHairLineSchema)
def get(idx: int,
        hairFrontHairLineService: HairFrontHairLineService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
        ):
    return hairFrontHairLineService.get(idx)


@HairFrontHairLineRouter.post(
    "/",
    response_model=HairFrontHairLineSchema,
    status_code=status.HTTP_201_CREATED,
)
def create(
        hairFrontHairLine: HairFrontHairLinePostRequestSchema,
        hairFrontHairLineService: HairFrontHairLineService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.idx)
    return hairFrontHairLineService.create(hairFrontHairLine)


@HairFrontHairLineRouter.patch("/{idx}", response_model=HairFrontHairLineSchema)
def update(
        idx: int,
        hairFrontHairLine: HairFrontHairLinePostRequestSchema,
        hairFrontHairLineService: HairFrontHairLineService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.idx)
    return hairFrontHairLineService.update(idx, hairFrontHairLine)


@HairFrontHairLineRouter.delete(
    "/{idx}", status_code=status.HTTP_204_NO_CONTENT
)
def delete(idx: int,
           hairFrontHairLineService: HairFrontHairLineService = Depends(),
           # current_user: TokenData = Depends(get_current_user),
           userService: UserService = Depends(),
           ):
    # user = userService.get(current_user.idx)
    return hairFrontHairLineService.delete(idx)
