from typing import List, Optional

from fastapi import APIRouter, Depends, status
from configs.OAuth import get_current_user, TokenData
from schemas.pydantic.skin.MyskinsolutionSchema import (
    MyskinsolutionSchema,MyskinsolutionPostSchema,
    MyskinsolutionSearchReqSchema,MyskinsolutionResSchema,
)
from services.skin.MyskinsolutionService import MyskinsolutionService
from services.mb.UserService import UserService
MyskinsolutionRouter = APIRouter(prefix="/v1/skin/myskin", tags=["skin_myskin"])


@MyskinsolutionRouter.get("/", response_model=List[MyskinsolutionResSchema])
def index(
        idx: Optional[int] = None,
        surveyNo: Optional[int] = None,
        userKey: Optional[int] = None,
        name: Optional[str] = None,
        pageSize: Optional[int] = 10,
        startIndex: Optional[int] = 0,
    myskinsolutionService: MyskinsolutionService = Depends(),
    # current_user: TokenData = Depends(get_current_user),
    # userService: UserService = Depends(),
):
    result_list = []
    count = myskinsolutionService.count(idx,surveyNo, userKey,name)
    for data in myskinsolutionService.list(idx,surveyNo, userKey,name,pageSize,startIndex):
        scheam = MyskinsolutionResSchema(
            **{**data.__dict__, 'total_count':count}
        )
        result_list.append(scheam)
    return result_list


@MyskinsolutionRouter.get("/{id}", response_model=MyskinsolutionSchema)
def get(
    idx: int,
    myskinsolutionService: MyskinsolutionService = Depends(),
    # current_user: TokenData = Depends(get_current_user),
    # userService: UserService = Depends(),
):
    return myskinsolutionService.get(
     idx
    ).normalize()


@MyskinsolutionRouter.post(
    "/",
    response_model=MyskinsolutionSchema,
    status_code=status.HTTP_201_CREATED,
)
def create(
    myskinsolution: MyskinsolutionPostSchema,
    myskinsolutionService: MyskinsolutionService = Depends(),
    # current_user: TokenData = Depends(get_current_user),
    # userService: UserService = Depends(),
):
    return myskinsolutionService.create(myskinsolution)


@MyskinsolutionRouter.patch("/{id}", response_model=MyskinsolutionSchema)
def update(
    idx: int ,
    myskinsolution: MyskinsolutionPostSchema,
    myskinsolutionService: MyskinsolutionService = Depends(),
    # current_user: TokenData = Depends(get_current_user),
    # userService: UserService = Depends(),
):
    return myskinsolutionService.update(
    idx ,
    myskinsolution).normalize()


@MyskinsolutionRouter.delete(
    "/{id}", status_code=status.HTTP_204_NO_CONTENT
)
def delete(
    idx: int ,
    myskinsolutionService: MyskinsolutionService = Depends(),
    # current_user: TokenData = Depends(get_current_user),
    # userService: UserService = Depends(),
):
    return myskinsolutionService.delete(
    idx
    )

