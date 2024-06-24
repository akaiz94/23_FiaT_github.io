from typing import List, Optional

from fastapi import APIRouter, Depends, status

from configs.OAuth import get_current_user, TokenData
from schemas.pydantic.skin.SkinMarkvuCaptureSchema import (
    SkinMarkvuCapturePostRequestSchema,
    SkinMarkvuCaptureSchema, SkinMarkvuCaptureResponseSchema,
)
from services.mb.UserService import UserService
from services.skin.SkinMarkvuCaptureService import SkinMarkvuCaptureService

SkinMarkvuCaptureRouter = APIRouter(prefix="/v1/skin/markvu/capture", tags=["skin_markvu_capture"])


@SkinMarkvuCaptureRouter.get("/", response_model=List[SkinMarkvuCaptureResponseSchema])
def index(
        surveyNo: Optional[int] = None,
        userKey: Optional[int] = None,
        pageSize: Optional[int] = 10,
        startIndex: Optional[int] = 0,
        skinMarkvuCaptureService: SkinMarkvuCaptureService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    result_list = []
    count = skinMarkvuCaptureService.count(surveyNo, userKey)
    for data in skinMarkvuCaptureService.list(surveyNo, userKey, pageSize, startIndex):
        user = None
        # if data.idx is not None and data.idx != 0:
#            user = userService.get(data.idx)
        scheam = SkinMarkvuCaptureResponseSchema(
            **{**data.__dict__, 'total_count': count}
        )
        result_list.append(scheam)
    return result_list


# todo SkinMarkvuCaptureSchema 응답 모델을 지정하지 않고 테스트
@SkinMarkvuCaptureRouter.get("/{idx}", response_model=SkinMarkvuCaptureSchema)
# @SkinMarkvuCaptureRouter.get("/{idx}")
def get(idx: int,
        skinMarkvuCaptureService: SkinMarkvuCaptureService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
        ):
    return skinMarkvuCaptureService.get(idx)


@SkinMarkvuCaptureRouter.post(
    "/",
    response_model=SkinMarkvuCaptureSchema,
    status_code=status.HTTP_201_CREATED,
)
def create(
        skinMarkvuCapture: SkinMarkvuCapturePostRequestSchema,
        skinMarkvuCaptureService: SkinMarkvuCaptureService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.idx)
    return skinMarkvuCaptureService.create(skinMarkvuCapture)


@SkinMarkvuCaptureRouter.patch("/{idx}", response_model=SkinMarkvuCaptureSchema)
def update(
        idx: int,
        skinMarkvuCapture: SkinMarkvuCapturePostRequestSchema,
        skinMarkvuCaptureService: SkinMarkvuCaptureService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.idx)
    return skinMarkvuCaptureService.update(idx, skinMarkvuCapture)


@SkinMarkvuCaptureRouter.delete(
    "/{idx}", status_code=status.HTTP_204_NO_CONTENT
)
def delete(idx: int,
           skinMarkvuCaptureService: SkinMarkvuCaptureService = Depends(),
           # current_user: TokenData = Depends(get_current_user),
           userService: UserService = Depends(),
           ):
    # user = userService.get(current_user.idx)
    return skinMarkvuCaptureService.delete(idx)
