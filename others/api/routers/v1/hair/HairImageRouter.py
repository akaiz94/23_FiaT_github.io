from typing import List, Optional

from fastapi import APIRouter, Depends, status

from configs.OAuth import get_current_user, TokenData
from schemas.pydantic.hair.HairImageSchema import (
    HairImagePostRequestSchema,
    HairImageSchema, HairImageResponseSchema,
)
from services.hair.HairImageService import HairImageService
from services.mb.UserService import UserService

HairImageRouter = APIRouter(prefix="/v1/hairImage", tags=["hair_image"])


@HairImageRouter.get("/", response_model=List[HairImageResponseSchema])
def index(
        surveyNo: Optional[int],
        userKey: Optional[int] = None, #None표시가 있느면 optional해짐
        Name: Optional[str] = None,
        pageSize: Optional[int] = 10,
        startIndex: Optional[int] = 0,
        hairImageService: HairImageService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    result_list = []
    count = hairImageService.count(surveyNo, userKey, Name)
    for data in hairImageService.list(surveyNo, userKey, Name, pageSize, startIndex):
        user = None
        # if data.idx is not None and data.idx != 0:
#            user = userService.get(data.idx)
        scheam = HairImageResponseSchema(
            **{**data.__dict__, 'total_count': count}
        )
        result_list.append(scheam)
    return result_list


@HairImageRouter.get("/{idx}", response_model=HairImageSchema)
def get(idx: int,
        hairImageService: HairImageService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
        ):
    return hairImageService.get(idx)


@HairImageRouter.post(
    "/",
    response_model=HairImageSchema,
    status_code=status.HTTP_201_CREATED,
)
def create(
        hairImage: HairImagePostRequestSchema,
        hairImageService: HairImageService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.idx)
    return hairImageService.create(hairImage)


@HairImageRouter.patch("/{idx}", response_model=HairImageSchema)
def update(
        idx: int,
        hairImage: HairImagePostRequestSchema,
        hairImageService: HairImageService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.idx)
    return hairImageService.update(idx, hairImage)


@HairImageRouter.delete(
    "/{idx}", status_code=status.HTTP_204_NO_CONTENT
)
def delete(idx: int,
           hairImageService: HairImageService = Depends(),
           # current_user: TokenData = Depends(get_current_user),
           userService: UserService = Depends(),
           ):
    # user = userService.get(current_user.idx)
    return hairImageService.delete(idx)
