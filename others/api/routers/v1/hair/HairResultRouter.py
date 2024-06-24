from typing import List, Optional

from fastapi import APIRouter, Depends, status

from configs.OAuth import get_current_user, TokenData
from schemas.pydantic.hair.HairResultSchema import (
    HairResultPostRequestSchema,
    HairResultSchema, HairResultResponseSchema,
)
from services.hair.HairResultService import HairResultService
from services.mb.UserService import UserService

HairResultRouter = APIRouter(prefix="/v1/hairResult", tags=["hair_result"])


@HairResultRouter.get("/", response_model=List[HairResultResponseSchema])
def index(
        surveyNo: Optional[int] = None,
        userKey: Optional[int] = None,
        name: Optional[str] = None,
        pageSize: Optional[int] = 10,
        startIndex: Optional[int] = 0,
        hairResultService: HairResultService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    result_list = []
    count = hairResultService.count(surveyNo, userKey, name)
    for data in hairResultService.list(surveyNo, userKey, name, pageSize, startIndex):
        user = None
        # if data.idx is not None and data.idx != 0:
#            user = userService.get(data.idx)
        scheam = HairResultResponseSchema(
            **{**data.__dict__, 'total_count': count}
        )
        result_list.append(scheam)
    return result_list


@HairResultRouter.get("/{idx}", response_model=HairResultSchema)
def get(idx: int,
        hairResultService: HairResultService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
        ):
    return hairResultService.get(idx)


@HairResultRouter.post(
    "/",
    response_model=HairResultSchema,
    status_code=status.HTTP_201_CREATED,
)
def create(
        hairResult: HairResultPostRequestSchema,
        hairResultService: HairResultService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.idx)
    return hairResultService.create(hairResult)


@HairResultRouter.patch("/{idx}", response_model=HairResultSchema)
def update(
        idx: int,
        hairResult: HairResultPostRequestSchema,
        hairResultService: HairResultService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.idx)
    return hairResultService.update(idx, hairResult)


@HairResultRouter.delete(
    "/{idx}", status_code=status.HTTP_204_NO_CONTENT
)
def delete(idx: int,
           hairResultService: HairResultService = Depends(),
           # current_user: TokenData = Depends(get_current_user),
           userService: UserService = Depends(),
           ):
    # user = userService.get(current_user.idx)
    return hairResultService.delete(idx)
