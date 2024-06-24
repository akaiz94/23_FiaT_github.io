from typing import List, Optional

from fastapi import APIRouter, Depends, status

from configs.OAuth import get_current_user, TokenData
from schemas.pydantic.hair.HairLeftHairLineSchema import (
    HairLeftHairLinePostRequestSchema,
    HairLeftHairLineSchema, HairLeftHairLineResponseSchema,
)
from services.hair.HairLeftHairLineService import HairLeftHairLineService
from services.mb.UserService import UserService

HairLeftHairLineRouter = APIRouter(prefix="/v1/hairLeftHairLine", tags=["hair_left_hair_line"])


@HairLeftHairLineRouter.get("/", response_model=List[HairLeftHairLineResponseSchema])
def index(
        surveyNo: Optional[int] = None,
        userKey: Optional[int] = None,
        Name: Optional[str] = None,
        pageSize: Optional[int] = 10,
        startIndex: Optional[int] = 0,
        hairLeftHairLineService: HairLeftHairLineService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    result_list = []
    count = hairLeftHairLineService.count(surveyNo, userKey, Name)
    for data in hairLeftHairLineService.list(surveyNo, userKey, Name, pageSize, startIndex):
        user = None
        # if data.idx is not None and data.idx != 0:
#            user = userService.get(data.idx)
        scheam = HairLeftHairLineResponseSchema(
            **{**data.__dict__, 'total_count': count}
        )
        result_list.append(scheam)
    return result_list


@HairLeftHairLineRouter.get("/{idx}", response_model=HairLeftHairLineSchema)
def get(idx: int,
        hairLeftHairLineService: HairLeftHairLineService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
        ):
    return hairLeftHairLineService.get(idx)


@HairLeftHairLineRouter.post(
    "/",
    response_model=HairLeftHairLineSchema,
    status_code=status.HTTP_201_CREATED,
)
def create(
        hairLeftHairLine: HairLeftHairLinePostRequestSchema,
        hairLeftHairLineService: HairLeftHairLineService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.idx)
    return hairLeftHairLineService.create(hairLeftHairLine)


@HairLeftHairLineRouter.patch("/{idx}", response_model=HairLeftHairLineSchema)
def update(
        idx: int,
        hairLeftHairLine: HairLeftHairLinePostRequestSchema,
        hairLeftHairLineService: HairLeftHairLineService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.idx)
    return hairLeftHairLineService.update(idx, hairLeftHairLine)


@HairLeftHairLineRouter.delete(
    "/{idx}", status_code=status.HTTP_204_NO_CONTENT
)
def delete(idx: int,
           hairLeftHairLineService: HairLeftHairLineService = Depends(),
           # current_user: TokenData = Depends(get_current_user),
           userService: UserService = Depends(),
           ):
    # user = userService.get(current_user.idx)
    return hairLeftHairLineService.delete(idx)
