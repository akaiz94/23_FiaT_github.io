from typing import List, Optional

from fastapi import APIRouter, Depends, status

from configs.OAuth import get_current_user, TokenData
from schemas.pydantic.skin.SkinMarkvuRefDataSchema import (
    SkinMarkvuRefDataPostRequestSchema,
    SkinMarkvuRefDataSchema, SkinMarkvuRefDataResponseSchema,
)
from services.mb.UserService import UserService
from services.skin.SkinMarkvuRefDataService import SkinMarkvuRefDataService

SkinMarkvuRefDataRouter = APIRouter(prefix="/v1/skin/markvu/refData", tags=["skin_markvu_ref_data"])


@SkinMarkvuRefDataRouter.get("/", response_model=List[SkinMarkvuRefDataResponseSchema])
def index(
        Gubun: Optional[str] = None,
        pageSize: Optional[int] = 10,
        startIndex: Optional[int] = 0,
        skinMarkvuRefDataService: SkinMarkvuRefDataService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    result_list = []
    count = skinMarkvuRefDataService.count(Gubun)
    for data in skinMarkvuRefDataService.list(Gubun, pageSize, startIndex):
        user = None
        # if data.Gubun is not None and data.Gubun != 0:
#            user = userService.get(data.Gubun)
        scheam = SkinMarkvuRefDataResponseSchema(
            **{**data.__dict__, 'total_count': count}
        )
        result_list.append(scheam)
    return result_list


@SkinMarkvuRefDataRouter.get("/{idx}", response_model=SkinMarkvuRefDataSchema)
def get(idx: int,
        skinMarkvuRefDataService: SkinMarkvuRefDataService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
        ):
    return skinMarkvuRefDataService.get(idx)


@SkinMarkvuRefDataRouter.post(
    "/",
    response_model=SkinMarkvuRefDataSchema,
    status_code=status.HTTP_201_CREATED,
)
def create(
        skinMarkvuRefData: SkinMarkvuRefDataPostRequestSchema,
        skinMarkvuRefDataService: SkinMarkvuRefDataService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.Gubun)
    return skinMarkvuRefDataService.create(skinMarkvuRefData)


@SkinMarkvuRefDataRouter.patch("/{idx}", response_model=SkinMarkvuRefDataSchema)
def update(
        idx: int,
        skinMarkvuRefData: SkinMarkvuRefDataPostRequestSchema,
        skinMarkvuRefDataService: SkinMarkvuRefDataService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.Gubun)
    return skinMarkvuRefDataService.update(idx, skinMarkvuRefData)


@SkinMarkvuRefDataRouter.delete(
    "/{idx}", status_code=status.HTTP_204_NO_CONTENT
)
def delete(idx: int,
           skinMarkvuRefDataService: SkinMarkvuRefDataService = Depends(),
           # current_user: TokenData = Depends(get_current_user),
           # userService: UserService = Depends(),
           ):
    # user = userService.get(current_user.Gubun)
    return skinMarkvuRefDataService.delete(idx)
