from typing import List, Optional

from fastapi import APIRouter, Depends, status

from schemas.pydantic.agree.AgreeClinicRSchema import (
    AgreeClinicRPostRequestSchema,
    AgreeClinicRSchema, AgreeClinicRResponseSchema,
)
from services.agree.AgreeClinicRService import AgreeClinicRService

AgreeClinicRRouter = APIRouter(prefix="/v1/agree/clinic_r", tags=["agree_clinic_r"])


@AgreeClinicRRouter.get("/", response_model=List[AgreeClinicRResponseSchema])
def index(
        surveyNo: Optional[int] = None,
        pageSize: Optional[int] = 10,
        startIndex: Optional[int] = 0,
        agreeClinicRService: AgreeClinicRService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    result_list = []
    count = agreeClinicRService.count(surveyNo)
    for data in agreeClinicRService.list(surveyNo, pageSize, startIndex):
        user = None
        # if data.surveyNo is not None and data.surveyNo != 0:
        #            user = userService.get(data.surveyNo)
        scheam = AgreeClinicRResponseSchema(
            **{**data.__dict__, 'total_count': count}
        )
        result_list.append(scheam)
    return result_list


@AgreeClinicRRouter.get("/{surveyNo}", response_model=AgreeClinicRSchema)
def get(surveyNo: int,
        agreeClinicRService: AgreeClinicRService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
        ):
    return agreeClinicRService.get(surveyNo)


@AgreeClinicRRouter.post(
    "/",
    response_model=AgreeClinicRSchema,
    status_code=status.HTTP_201_CREATED,
)
def create(
        agreeClinicR: AgreeClinicRPostRequestSchema,
        agreeClinicRService: AgreeClinicRService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.surveyNo)
    return agreeClinicRService.create(agreeClinicR)


@AgreeClinicRRouter.patch("/{surveyNo}", response_model=AgreeClinicRSchema)
def update(
        surveyNo: int,
        agreeClinicR: AgreeClinicRPostRequestSchema,
        agreeClinicRService: AgreeClinicRService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.surveyNo)
    return agreeClinicRService.update(surveyNo, agreeClinicR)


@AgreeClinicRRouter.delete(
    "/{surveyNo}", status_code=status.HTTP_204_NO_CONTENT
)
def delete(surveyNo: int,
           agreeClinicRService: AgreeClinicRService = Depends(),
           # current_user: TokenData = Depends(get_current_user),
           # userService: UserService = Depends(),
           ):
    # user = userService.get(current_user.surveyNo)
    return agreeClinicRService.delete(surveyNo)
