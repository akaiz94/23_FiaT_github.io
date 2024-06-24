from typing import List, Optional

from fastapi import APIRouter, Depends, status

from schemas.pydantic.sch.SchVisitSchema import (
    SchVisitPostRequestSchema,
    SchVisitSchema, SchVisitResponseSchema, SchMergedRequestSchema, SchMergedResponseSchema,
    SchVisitProgressFlgPostRequestSchema,
)
from services.sch.SchVisitService import SchVisitService

SchVisitRouter = APIRouter(prefix="/v1/sch/visit", tags=["sch_visit"])


@SchVisitRouter.get("/", response_model=List[SchVisitResponseSchema])
def index(
        visitkey: Optional[str] = None,
        m_userkey: Optional[int] = None,
        m_surveyno: Optional[int] = None,
        cstmid: Optional[str] = None,
        ucstmid: Optional[int] = None,
        pageSize: Optional[int] = 10,
        startIndex: Optional[int] = 0,
        schVisitService: SchVisitService = Depends(),
):
    result_list = []
    count = schVisitService.count(visitkey, m_userkey, m_surveyno, cstmid, ucstmid)
    for data in schVisitService.list(visitkey, m_userkey, m_surveyno, cstmid, ucstmid, pageSize, startIndex):
        scheam = SchVisitResponseSchema(
            **{**data.__dict__, 'total_count': count}
        )
        result_list.append(scheam)
    return result_list

@SchVisitRouter.get("/merged/list", response_model=List[SchMergedResponseSchema])
def mergedList(
        visitkey: Optional[int] = None,
        skey: Optional[int] = None,
        surveyno: Optional[int] = None,
        name: Optional[str] = None,
        phone: Optional[str] = None,
        rsvn_date: Optional[str] = None,
        pageSize: Optional[int] = 10,
        startIndex: Optional[int] = 0,
        schVisitService: SchVisitService = Depends(),
):
    result_list = []
    # count = schVisitService.get_merged_sch_list_count(visitkey, skey, surveyno, name, phone, rsvn_date)
    # for data in schVisitService.get_merged_sch_list(visitkey, skey, surveyno, name, phone, rsvn_date,pageSize,startIndex):
    #     scheam = SchMergedResponseSchema(
    #         **{**data, 'total_count': count}
    #     )
    #     result_list.append(scheam)
    # return result_list
    return schVisitService.get_merged_sch_list(visitkey, skey, surveyno, name, phone, rsvn_date,pageSize,startIndex)


@SchVisitRouter.get("/{visitkey}/{skey}", response_model=SchVisitSchema)
def get(visitkey: int, skey: int,
        schVisitService: SchVisitService = Depends(),
        ):
    # return schVisitService.get(visitkey, skey)
    return schVisitService.get(visitkey, skey)


@SchVisitRouter.post(
    "/",
    response_model=SchVisitSchema,
    status_code=status.HTTP_201_CREATED,
)
def create(
        schVisit: SchVisitPostRequestSchema,
        schVisitService: SchVisitService = Depends(),
):
    return schVisitService.create(schVisit)


@SchVisitRouter.patch("/{visitkey}/{skey}", response_model=SchVisitSchema)
def update(
        visitkey: int,
        skey: int,
        schVisit: SchVisitPostRequestSchema,
        schVisitService: SchVisitService = Depends(),
):
    return schVisitService.update(visitkey, skey, schVisit)

@SchVisitRouter.patch("/progress_flg/{visitkey}/{skey}", response_model=SchVisitSchema)
def update(
        visitkey: int,
        skey: int,
        schVisit: SchVisitProgressFlgPostRequestSchema,
        schVisitService: SchVisitService = Depends(),
):
    return schVisitService.update(visitkey, skey, schVisit)


@SchVisitRouter.delete(
    "/{visitkey}/{skey}", status_code=status.HTTP_204_NO_CONTENT
)
def delete(visitkey: int, skey: int,
           schVisitService: SchVisitService = Depends(),
           ):
    return schVisitService.delete(visitkey, skey)
