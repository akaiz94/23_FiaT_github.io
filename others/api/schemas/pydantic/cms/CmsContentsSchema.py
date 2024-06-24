from datetime import datetime
from typing import Optional, List, Union

from pydantic import BaseModel

from schemas.pydantic.cms.CmsFileSchema import CmsFileSchema
from schemas.pydantic.mb.UserSchema import UserResponseSchema


class CmsBoardSaveReqSchema(BaseModel):
    pid: Optional[int] = 0  # parent 아이디
    cont_div_cd: Optional[str] = 'REPORT'  # 컨텐츠 유형
    title: str  # 제목
    summary: Optional[str] = ''  # 요약
    contents: str  # 내용
    user_id: Optional[int] = 0  # 작성자
    user_nm: Optional[str] = ''  # 작성자명
    secret_no: Optional[str] = ''  # 비밀번호
    display_yn: Optional[bool] = True  # 노출여부
    read_cnt: Optional[int] = 0  # 읽은횟수


class CmsBoardSearchReqSchema(BaseModel):
    user_id: Optional[int] = None
    cont_div_cd: Optional[str] = 'REPORT'
    pageSize: Optional[int] = 100
    startIndex: Optional[int] = 0


class CmsBoardPostReqSchema(CmsBoardSaveReqSchema):
    files: Optional[List[CmsFileSchema]] = None  # 첨부파일


class CmsContentsPostRequestSchema(BaseModel):
    pid: Optional[int] = 0  # parent 아이디
    cont_div_cd: Optional[str] = 'REPORT'  # 컨텐츠 유형
    title: str  # 제목
    summary: Optional[str] = ''  # 요약
    contents: str  # 내용
    start_dt: Union[datetime, str, None]  # 시작일
    end_dt: Union[datetime, str, None]  # 종료일

    user_id: Optional[int] = 0  # 작성자
    user_nm: Optional[str] = ''  # 작성자명
    secret_no: Optional[str] = ''  # 비밀번호
    display_yn: Optional[bool] = True  # 노출여부
    read_cnt: Optional[int] = 0  # 읽은횟수


class CmsContentsSchema(CmsContentsPostRequestSchema):
    id: Optional[int]


class CmsContentsResponseSchema(CmsBoardPostReqSchema):
    id: Optional[int]
    created_at: Union[datetime, str, None]
    total_count: Optional[int] = 0  # 전체 개수
    user: Optional[UserResponseSchema] = None
    files: Optional[List[CmsFileSchema]] = None
