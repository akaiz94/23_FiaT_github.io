from typing import List, Optional

from fastapi import APIRouter, Depends, status

from configs.OAuth import get_current_user, TokenData
from schemas.pydantic.hair.HairBackSchema import (
    HairBackPostRequestSchema,
    HairBackSchema, HairBackResponseSchema,
)
from services.hair.HairBackService import HairBackService
from services.mb.UserService import UserService

HairBackRouter = APIRouter(prefix="/v1/hairBack", tags=["hair_back"])


@HairBackRouter.get("/", response_model=List[HairBackResponseSchema])
def index(
        surveyNo: Optional[int] = None,
        userKey: Optional[int] = None,
        Name: Optional[str] = None,
        pageSize: Optional[int] = 10,
        startIndex: Optional[int] = 0,
        hairBackService: HairBackService = Depends(),
        # # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    result_list = []
    count = hairBackService.count(surveyNo, userKey, Name)
    for data in hairBackService.list(surveyNo, userKey, Name, pageSize, startIndex):
        user = None
        # if data.idx is not None and data.idx != 0:
#            user = userService.get(data.idx)
        scheam = HairBackResponseSchema(
            **{**data.__dict__, 'total_count': count}
        )
        result_list.append(scheam)
    return result_list


@HairBackRouter.get("/{idx}", response_model=HairBackSchema)
def get(idx: int,
        hairBackService: HairBackService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
        ):
    return hairBackService.get(idx)


@HairBackRouter.post(
    "/",
    response_model=HairBackSchema,
    status_code=status.HTTP_201_CREATED,
)
def create(
        hairBack: HairBackPostRequestSchema,
        hairBackService: HairBackService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.idx)
    return hairBackService.create(hairBack)


@HairBackRouter.patch("/{idx}", response_model=HairBackSchema)
def update(
        idx: int,
        hairBack: HairBackPostRequestSchema,
        hairBackService: HairBackService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.idx)
    return hairBackService.update(idx, hairBack)


@HairBackRouter.delete(
    "/{idx}", status_code=status.HTTP_204_NO_CONTENT
)
def delete(idx: int,
           hairBackService: HairBackService = Depends(),
           # current_user: TokenData = Depends(get_current_user),
           userService: UserService = Depends(),
           ):
    # user = userService.get(current_user.idx)
    return hairBackService.delete(idx)
