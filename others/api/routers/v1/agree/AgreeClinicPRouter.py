from typing import List, Optional

from fastapi import APIRouter, Depends, status

from schemas.pydantic.agree.AgreeClinicPSchema import (
    AgreeClinicPPostRequestSchema,
    AgreeClinicPSchema, AgreeClinicPResponseSchema,
)
from services.agree.AgreeClinicPService import AgreeClinicPService

AgreeClinicPRouter = APIRouter(prefix="/v1/agree/clinic_p", tags=["agree_clinic_p"])


@AgreeClinicPRouter.get("/", response_model=List[AgreeClinicPResponseSchema])
def index(
        surveyNo: Optional[int] = None,
        visitkey: Optional[int] = None,
        userKey: Optional[int] = None,
        pageSize: Optional[int] = 10,
        startIndex: Optional[int] = 0,
        agreeClinicPService: AgreeClinicPService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    result_list = []
    count = agreeClinicPService.count(surveyNo, visitkey, userKey)
    for data in agreeClinicPService.list(surveyNo, visitkey, userKey, pageSize, startIndex):
        user = None
        # if data.surveyNo is not None and data.surveyNo != 0:
        #            user = userService.get(data.surveyNo)
        scheam = AgreeClinicPResponseSchema(
            **{**data.__dict__, 'total_count': count}
        )
        result_list.append(scheam)
    return result_list


@AgreeClinicPRouter.get("/{visitkey}", response_model=AgreeClinicPSchema)
def get(visitkey: int,
        agreeClinicPService: AgreeClinicPService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
        ):
    return agreeClinicPService.get(visitkey)


@AgreeClinicPRouter.post(
    "/",
    response_model=AgreeClinicPSchema,
    status_code=status.HTTP_201_CREATED,
)
def create(
        agreeClinicP: AgreeClinicPPostRequestSchema,
        agreeClinicPService: AgreeClinicPService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.surveyNo)
    return agreeClinicPService.create(agreeClinicP)


@AgreeClinicPRouter.patch("/{surveyNo", response_model=AgreeClinicPSchema)
def update(
        surveyNo: int,
        agreeClinicP: AgreeClinicPPostRequestSchema,
        agreeClinicPService: AgreeClinicPService = Depends(),
        # current_user: TokenData = Depends(get_current_user),
        # userService: UserService = Depends(),
):
    # user = userService.get(current_user.surveyNo)
    return agreeClinicPService.update(surveyNo, agreeClinicP)


@AgreeClinicPRouter.delete(
    "/{surveyNo}", status_code=status.HTTP_204_NO_CONTENT
)
def delete(id: int,
           agreeClinicPService: AgreeClinicPService = Depends(),
           # current_user: TokenData = Depends(get_current_user),
           # userService: UserService = Depends(),
           ):
    # user = userService.get(current_user.surveyNo)
    return agreeClinicPService.delete(id)
