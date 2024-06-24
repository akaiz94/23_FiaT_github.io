from typing import List, Optional

from fastapi import APIRouter, Depends, status

from schemas.pydantic.agree.ComCodeSchema import (
    ComCodePostRequestSchema,
    ComCodeSchema, ComCodeResponseSchema,
)
from services.agree.ComCodeService import ComCodeService

ComCodeRouter = APIRouter(prefix="/v1/com/code", tags=["com_code"])


@ComCodeRouter.get("/", response_model=List[ComCodeResponseSchema])
def index(
        surveyNo: Optional[int] = None,
        pageSize: Optional[int] = 10,
        startIndex: Optional[int] = 0,
        comCodeService: ComCodeService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    result_list = []
    count = comCodeService.count(surveyNo)
    for data in comCodeService.list(surveyNo, pageSize, startIndex):
        user = None
        # if data.surveyNo is not None and data.surveyNo != 0:
        #            user = userService.get(data.surveyNo)
        scheam = ComCodeResponseSchema(
            **{**data.__dict__, 'total_count': count}
        )
        result_list.append(scheam)
    return result_list


@ComCodeRouter.get("/{id}", response_model=ComCodeSchema)
def get(id: int,
        comCodeService: ComCodeService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
        ):
    return comCodeService.get(id)


@ComCodeRouter.post(
    "/",
    response_model=ComCodeSchema,
    status_code=status.HTTP_201_CREATED,
)
def create(
        comCode: ComCodePostRequestSchema,
        comCodeService: ComCodeService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.surveyNo)
    return comCodeService.create(comCode)


@ComCodeRouter.patch("/{id}", response_model=ComCodeSchema)
def update(
        id: int,
        comCode: ComCodePostRequestSchema,
        comCodeService: ComCodeService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.surveyNo)
    return comCodeService.update(id, comCode)


@ComCodeRouter.delete(
    "/{id}", status_code=status.HTTP_204_NO_CONTENT
)
def delete(id: int,
           comCodeService: ComCodeService = Depends(),
           # current_user: TokenData = Depends(get_current_user),
           userService: UserService = Depends(),
           ):
    # user = userService.get(current_user.surveyNo)
    return comCodeService.delete(id)
