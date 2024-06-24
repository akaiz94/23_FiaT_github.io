from typing import List, Optional

from fastapi import APIRouter, Depends, status

from configs.OAuth import get_current_user, TokenData
from schemas.pydantic.skin.SkinMarkvuCustinfoSchema import (
    SkinMarkvuCustinfoPostRequestSchema,
    SkinMarkvuCustinfoSchema, SkinMarkvuCustinfoResponseSchema,
)
from services.mb.UserService import UserService
from services.skin.SkinMarkvuCustinfoService import SkinMarkvuCustinfoService

SkinMarkvuCustinfoRouter = APIRouter(prefix="/v1/skin/markvu/custInfo", tags=["skin_markvu_custInfo"])


@SkinMarkvuCustinfoRouter.get("/", response_model=List[SkinMarkvuCustinfoResponseSchema])
def index(
        surveyNo: Optional[int] = None,
        userKey: Optional[int] = None,
        pageSize: Optional[int] = 10,
        startIndex: Optional[int] = 0,
        skinMarkvuCustInfoService: SkinMarkvuCustinfoService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    result_list = []
    count = skinMarkvuCustInfoService.count(surveyNo, userKey)
    for data in skinMarkvuCustInfoService.list(surveyNo, userKey, pageSize, startIndex):
        user = None
        # if data.idx is not None and data.idx != 0:
#            user = userService.get(data.idx)
        scheam = SkinMarkvuCustinfoResponseSchema(
            **{**data.__dict__, 'total_count': count}
        )
        result_list.append(scheam)
    return result_list


@SkinMarkvuCustinfoRouter.get("/{idx}", response_model=SkinMarkvuCustinfoSchema)
def get(idx: int,
        skinMarkvuCustInfoService: SkinMarkvuCustinfoService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
        ):
    return skinMarkvuCustInfoService.get(idx)


@SkinMarkvuCustinfoRouter.post(
    "/",
    response_model=SkinMarkvuCustinfoSchema,
    status_code=status.HTTP_201_CREATED,
)
def create(
        skinMarkvuCustInfo: SkinMarkvuCustinfoPostRequestSchema,
        skinMarkvuCustInfoService: SkinMarkvuCustinfoService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.idx)
    return skinMarkvuCustInfoService.create(skinMarkvuCustInfo)


@SkinMarkvuCustinfoRouter.patch("/{idx}", response_model=SkinMarkvuCustinfoSchema)
def update(
        idx: int,
        skinMarkvuCustInfo: SkinMarkvuCustinfoPostRequestSchema,
        skinMarkvuCustInfoService: SkinMarkvuCustinfoService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.idx)
    return skinMarkvuCustInfoService.update(idx, skinMarkvuCustInfo)


@SkinMarkvuCustinfoRouter.delete(
    "/{idx}", status_code=status.HTTP_204_NO_CONTENT
)
def delete(id: int,
           skinMarkvuCustInfoService: SkinMarkvuCustinfoService = Depends(),
           # current_user: TokenData = Depends(get_current_user),
           userService: UserService = Depends(),
           ):
    # user = userService.get(current_user.idx)
    return skinMarkvuCustInfoService.delete(idx)
