from typing import List, Optional

from fastapi import APIRouter, Depends, status

from configs.OAuth import get_current_user, TokenData
from schemas.pydantic.hair.HairMainSchema import (
    HairMainPostRequestSchema,
    HairMainSchema, HairMainResponseSchema,
)
from services.hair.HairMainService import HairMainService
from services.mb.UserService import UserService

HairMainRouter = APIRouter(prefix="/v1/hairMain", tags=["hair_main"])


@HairMainRouter.get("/", response_model=List[HairMainResponseSchema])
def index(
        surveyNo: Optional[int] = None,
        userKey: Optional[int] = None,
        Name: Optional[str] = None,
        pageSize: Optional[int] = 10,
        startIndex: Optional[int] = 0,
        hairMainService: HairMainService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    result_list = []
    count = hairMainService.count(surveyNo, userKey, Name)
    for data in hairMainService.list(surveyNo, userKey, Name, pageSize, startIndex):
        user = None
        # if data.idx is not None and data.idx != 0:
#            user = userService.get(data.idx)
        scheam = HairMainResponseSchema(
            **{**data.__dict__, 'total_count': count}
        )
        result_list.append(scheam)
    return result_list


@HairMainRouter.get("/{idx}", response_model=HairMainSchema)
def get(idx: int,
        hairMainService: HairMainService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
        ):
    return hairMainService.get(idx)


@HairMainRouter.post(
    "/",
    response_model=HairMainSchema,
    status_code=status.HTTP_201_CREATED,
)
def create(
        hairMain: HairMainPostRequestSchema,
        hairMainService: HairMainService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.idx)
    return hairMainService.create(hairMain)


@HairMainRouter.patch("/{idx}", response_model=HairMainSchema)
def update(
        idx: int,
        hairMain: HairMainPostRequestSchema,
        hairMainService: HairMainService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.idx)
    return hairMainService.update(idx, hairMain)


@HairMainRouter.delete(
    "/{idx}", status_code=status.HTTP_204_NO_CONTENT
)
def delete(idx: int,
           hairMainService: HairMainService = Depends(),
           # current_user: TokenData = Depends(get_current_user),
           userService: UserService = Depends(),
           ):
    # user = userService.get(current_user.idx)
    return hairMainService.delete(idx)
