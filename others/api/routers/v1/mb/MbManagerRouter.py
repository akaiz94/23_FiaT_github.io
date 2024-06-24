from typing import List, Optional

from fastapi import APIRouter, Depends, status

from schemas.pydantic.mb.MbManagerSchema import (
    MbManagerPostRequestSchema,
    MbManagerSchema, MbManagerResponseSchema, MbManagerPostLoginRequestSchema, MbManagerLoginResponseSchema,
)
from services.mb.MbManagerService import MbManagerService

MbManagerRouter = APIRouter(prefix="/v1/mb/manager", tags=["mb_manager"])

@MbManagerRouter.post(
    "/login",
    description="관리자 로그인",
    response_model=MbManagerLoginResponseSchema,
    status_code=status.HTTP_201_CREATED,
)
def login(
        login: MbManagerPostLoginRequestSchema,
        mbManagerService: MbManagerService = Depends()
):
    return mbManagerService.login(login)

@MbManagerRouter.get("/", response_model=List[MbManagerResponseSchema])
def index(
        ManagerKey: Optional[int] = None,
        pageSize: Optional[int] = 10,
        startIndex: Optional[int] = 0,
        mbManagerService: MbManagerService = Depends(),
):
    result_list = []
    count = mbManagerService.count(ManagerKey)
    for data in mbManagerService.list(ManagerKey, pageSize, startIndex):
        scheam = MbManagerResponseSchema(
            **{**data.__dict__, 'total_count': count}
        )
        result_list.append(scheam)
    return result_list


@MbManagerRouter.get("/{ManagerKey}", response_model=MbManagerSchema)
def get(ManagerKey: int,
        mbManagerService: MbManagerService = Depends(),
        ):
    return mbManagerService.get(ManagerKey)


@MbManagerRouter.post(
    "/",
    response_model=MbManagerSchema,
    status_code=status.HTTP_201_CREATED,
)
def create(
        mbManager: MbManagerPostRequestSchema,
        mbManagerService: MbManagerService = Depends(),
):
    return mbManagerService.create(mbManager)


@MbManagerRouter.patch("/{ManagerKey}", response_model=MbManagerSchema)
def update(
        ManagerKey: int,
        mbManager: MbManagerPostRequestSchema,
        mbManagerService: MbManagerService = Depends(),
):
    return mbManagerService.update(ManagerKey, mbManager)


@MbManagerRouter.delete(
    "/{ManagerKey}", status_code=status.HTTP_204_NO_CONTENT
)
def delete(ManagerKey: int,
           mbManagerService: MbManagerService = Depends(),
           ):
    return mbManagerService.delete(ManagerKey)
