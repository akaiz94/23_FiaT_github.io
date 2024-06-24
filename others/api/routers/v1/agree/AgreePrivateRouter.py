from typing import List, Optional

from fastapi import APIRouter, Depends, status

from schemas.pydantic.agree.AgreePrivateSchema import (
    AgreePrivatePostRequestSchema,
    AgreePrivateSchema, AgreePrivateResponseSchema,
)
from services.agree.AgreePrivateService import AgreePrivateService

AgreePrivateRouter = APIRouter(prefix="/v1/agree/private", tags=["agree_private"])


@AgreePrivateRouter.get("/", response_model=List[AgreePrivateResponseSchema])
def index(
        surveyNo: Optional[int] = None,
        pageSize: Optional[int] = 10,
        startIndex: Optional[int] = 0,
        agreePrivateService: AgreePrivateService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    result_list = []
    count = agreePrivateService.count(surveyNo)
    for data in agreePrivateService.list(surveyNo, pageSize, startIndex):
        user = None
        # if data.surveyNo is not None and data.surveyNo != 0:
        #            user = userService.get(data.surveyNo)
        scheam = AgreePrivateResponseSchema(
            **{**data.__dict__, 'total_count': count}
        )
        result_list.append(scheam)
    return result_list


@AgreePrivateRouter.get("/{surveyNo}", response_model=AgreePrivateSchema)
def get(visitkey: int,
        agreePrivateService: AgreePrivateService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
        ):
    return agreePrivateService.get(visitkey)


@AgreePrivateRouter.post(
    "/",
    response_model=AgreePrivateSchema,
    status_code=status.HTTP_201_CREATED,
)
def create(
        agreePrivate: AgreePrivatePostRequestSchema,
        agreePrivateService: AgreePrivateService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.surveyNo)
    return agreePrivateService.create(agreePrivate)


@AgreePrivateRouter.patch("/{surveyNo}", response_model=AgreePrivateSchema)
def update(
        surveyNo: int,
        agreePrivate: AgreePrivatePostRequestSchema,
        agreePrivateService: AgreePrivateService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.surveyNo)
    return agreePrivateService.update(surveyNo, agreePrivate)


@AgreePrivateRouter.delete(
    "/{surveyNo}", status_code=status.HTTP_204_NO_CONTENT
)
def delete(surveyNo: int,
           agreePrivateService: AgreePrivateService = Depends(),
           # current_user: TokenData = Depends(get_current_user),
           # userService: UserService = Depends(),
           ):
    # user = userService.get(current_user.surveyNo)
    return agreePrivateService.delete(surveyNo)
