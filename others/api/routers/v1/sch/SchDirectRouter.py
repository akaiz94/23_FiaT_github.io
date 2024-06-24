from typing import List, Optional

from fastapi import APIRouter, Depends, status

from schemas.pydantic.sch.SchDirectSchema import (
    SchDirectPostRequestSchema,
    SchDirectSchema, SchDirectResponseSchema, SchDirectProgressFlgPostRequestSchema,
)
from services.sch.SchDirectService import SchDirectService

SchDirectRouter = APIRouter(prefix="/v1/sch/direct", tags=["sch_direct"])


@SchDirectRouter.get("/", response_model=List[SchDirectResponseSchema])
def index(
        skey: Optional[str] = None,
        userkey: Optional[int] = None,
        surveyNo: Optional[int] = None,
        pageSize: Optional[int] = 10,
        startIndex: Optional[int] = 0,
        schDirectService: SchDirectService = Depends(),
):
    result_list = []
    count = schDirectService.count(skey,userkey,surveyNo)
    for data in schDirectService.list(skey,userkey,surveyNo, pageSize, startIndex):
        scheam = SchDirectResponseSchema(
            **{**data.__dict__, 'total_count': count}
        )
        result_list.append(scheam)
    return result_list


@SchDirectRouter.get("/{skey}", response_model=SchDirectSchema)
def get(skey: int,
        schDirectService: SchDirectService = Depends(),
        ):
    return schDirectService.get(skey)


@SchDirectRouter.post(
    "/",
    response_model=SchDirectSchema,
    status_code=status.HTTP_201_CREATED,
)
def create(
        schDirect: SchDirectPostRequestSchema,
        schDirectService: SchDirectService = Depends(),
):
    return schDirectService.create(schDirect)


@SchDirectRouter.patch("/{skey}", response_model=SchDirectSchema)
def update(
        skey: int,
        schDirect: SchDirectPostRequestSchema,
        schDirectService: SchDirectService = Depends(),
):
    return schDirectService.update(skey, schDirect)

@SchDirectRouter.patch("/progress_flg/{skey}", response_model=SchDirectSchema)
def update(
        skey: int,
        schDirect: SchDirectProgressFlgPostRequestSchema,
        schDirectService: SchDirectService = Depends(),
):
    return schDirectService.update(skey, schDirect)


@SchDirectRouter.delete(
    "/{skey}", status_code=status.HTTP_204_NO_CONTENT
)
def delete(skey: int,
           schDirectService: SchDirectService = Depends(),
           ):
    return schDirectService.delete(skey)
