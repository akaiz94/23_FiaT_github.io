from typing import List, Optional

from fastapi import APIRouter, Depends, status

from configs.OAuth import get_current_user, TokenData
from schemas.pydantic.mb.UserLoginSchema import UserLoginPostRequestSchema, UserLoginResponseSchema
from schemas.pydantic.mb.UserSchema import (
    UserPostRequestSchema,
    UserResponseSchema, UserPatchRequestSchema, UserPatchResponseSchema
)
from services.cms.CmsFileService import CmsFileService
from services.mb.UserService import UserService

UserRouter = APIRouter(prefix="/v1/user", tags=["user"])


@UserRouter.post(
    "/login",
    description="회원 로그인",
    response_model=UserLoginResponseSchema,
    status_code=status.HTTP_201_CREATED,
)
def login(
        user: UserLoginPostRequestSchema,
        # userService: UserService = Depends(),
):
    return userService.login(user)


@UserRouter.get(
    "/me",
    response_model=UserResponseSchema)
async def get_token_user(
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
        cmsFileService: CmsFileService = Depends(),
):
    return userService.get(current_user.surveyNo)


@UserRouter.post(
    "/",
    description="회원 가입",
    response_model=UserLoginResponseSchema,
    status_code=status.HTTP_201_CREATED,
)
def create(
        user: UserPostRequestSchema,
        # userService: UserService = Depends(),
):
    return userService.create(user)


@UserRouter.patch(
    "/{id}",
    description="회원 정보수정",
    response_model=UserPatchResponseSchema,
    status_code=status.HTTP_200_OK,
)
def update(
        id: int,
        user: UserPatchRequestSchema,
        # userService: UserService = Depends(),
):
    return userService.update(id, user)


@UserRouter.get("/", response_model=List[UserResponseSchema])
def index(
        surveyNo: Optional[int] = None,
        office_id: Optional[int] = None,
        pageSize: Optional[int] = 10,
        startIndex: Optional[int] = 0,
        # userService: UserService = Depends(),
):
    return userService.listFilterByOfficeId(
        surveyNo, office_id, pageSize, startIndex
    )


# test
#
@UserRouter.get("/{id}", response_model=UserResponseSchema)
def get(id: int, userService: UserService = Depends()):
    return userService.get(id)


@UserRouter.delete(
    "/{id}", status_code=status.HTTP_204_NO_CONTENT
)
def delete(id: int, userService: UserService = Depends()):
    return userService.delete(id)
