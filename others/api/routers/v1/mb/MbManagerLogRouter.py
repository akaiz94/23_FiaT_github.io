from typing import List, Optional

from fastapi import APIRouter, Depends, status

from schemas.pydantic.mb.MbManagerLogSchema import (
    MbManagerLogPostRequestSchema,
    MbManagerLogSchema, MbManagerLogResponseSchema,
)
from services.mb.MbManagerLogService import MbManagerLogService

MbManagerLogRouter = APIRouter(prefix="/v1/mb/manager_log", tags=["mb_manager_log"])


@MbManagerLogRouter.get("/", response_model=List[MbManagerLogResponseSchema])
def index(
        LogKey: Optional[int] = None,
        pageSize: Optional[int] = 10,
        startIndex: Optional[int] = 0,
        mbManagerLogService: MbManagerLogService = Depends(),
):
    result_list = []
    count = mbManagerLogService.count(LogKey)
    for data in mbManagerLogService.list(LogKey, pageSize, startIndex):
        scheam = MbManagerLogResponseSchema(
            **{**data.__dict__, 'total_count': count}
        )
        result_list.append(scheam)
    return result_list


@MbManagerLogRouter.get("/{LogKey}", response_model=MbManagerLogSchema)
def get(LogKey: int,
        mbManagerLogService: MbManagerLogService = Depends(),
        ):
    return mbManagerLogService.get(LogKey)


@MbManagerLogRouter.post(
    "/",
    response_model=MbManagerLogSchema,
    status_code=status.HTTP_201_CREATED,
)
def create(
        mbManagerLog: MbManagerLogPostRequestSchema,
        mbManagerLogService: MbManagerLogService = Depends(),
):
    return mbManagerLogService.create(mbManagerLog)


@MbManagerLogRouter.patch("/{LogKey}", response_model=MbManagerLogSchema)
def update(
        LogKey: int,
        mbManagerLog: MbManagerLogPostRequestSchema,
        mbManagerLogService: MbManagerLogService = Depends(),
):
    return mbManagerLogService.update(LogKey, mbManagerLog)


@MbManagerLogRouter.delete(
    "/{LogKey", status_code=status.HTTP_204_NO_CONTENT
)
def delete(LogKey: int,
           mbManagerLogService: MbManagerLogService = Depends(),
           ):
    return mbManagerLogService.delete(LogKey)
