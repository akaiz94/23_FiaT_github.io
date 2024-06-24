from typing import List, Optional

from fastapi import APIRouter, Depends, status

from schemas.pydantic.mb.MbMemberSchema import (
    MbMemberPostRequestSchema,
    MbMemberSchema, MbMemberResponseSchema,
)
from services.mb.MbMemberService import MbMemberService

MbMemberRouter = APIRouter(prefix="/v1/mb/member", tags=["mb_member"])


@MbMemberRouter.get("/", response_model=List[MbMemberResponseSchema])
def index(
        UserKey: Optional[int] = None,
        Name: Optional[str] = None,
        Phone: Optional[str] = None,
        pageSize: Optional[int] = 10,
        startIndex: Optional[int] = 0,
        mbMemberService: MbMemberService = Depends(),
):
    result_list = []
    count = mbMemberService.count(UserKey, Name, Phone, )
    for data in mbMemberService.list(UserKey, Name, Phone, pageSize, startIndex):
        scheam = MbMemberResponseSchema(
            **{**data.__dict__, 'total_count': count}
        )
        result_list.append(scheam)
    return result_list


@MbMemberRouter.get("/{UserKey}", response_model=MbMemberSchema)
def get(UserKey: int,
        mbMemberService: MbMemberService = Depends(),
        ):
    return mbMemberService.get(UserKey)


@MbMemberRouter.post(
    "/",
    response_model=MbMemberSchema,
    status_code=status.HTTP_201_CREATED,
)
def create(
        mbMember: MbMemberPostRequestSchema,
        mbMemberService: MbMemberService = Depends(),
):
    return mbMemberService.create(mbMember)


@MbMemberRouter.patch("/{id}", response_model=MbMemberSchema)
def update(
        UserKey: int,
        mbMember: MbMemberPostRequestSchema,
        mbMemberService: MbMemberService = Depends(),
):
    return mbMemberService.update(UserKey, mbMember)


@MbMemberRouter.delete(
    "/{UserKey}", status_code=status.HTTP_204_NO_CONTENT
)
def delete(UserKey: int,
           mbMemberService: MbMemberService = Depends(),
           ):
    return mbMemberService.delete(UserKey)
