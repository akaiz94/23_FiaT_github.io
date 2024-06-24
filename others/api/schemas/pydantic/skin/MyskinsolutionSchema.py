from typing import Optional, List, Union

from pydantic import BaseModel
from datetime import datetime

class SearchSchema(BaseModel):
    limit: Optional[int] = 100
    start: Optional[int] = 0

class MyskinsolutionPostSchema(BaseModel):
    surveyNo: Optional[int] = None  # surveyNo
    userKey: Optional[int] = None # userKey
    surveyDate: Optional[str] = None # surveyDate
    name: Optional[str] = None # name
    specialtip_memo: Optional[str] = None # specialtip_memo
    specialtip_memo3: Optional[str] = None # specialtip_memo3
    specialtip_memo2: Optional[str] = None # specialtip_memo2
    manager_value: Optional[str] = None # manager_value
    create_dt: Optional[datetime] = None # create_dt
    update_dt: Optional[datetime] = None # update_dt

class MyskinsolutionSchema(MyskinsolutionPostSchema):
    idx: Optional[int] = None # idx

class MyskinsolutionSearchReqSchema(SearchSchema):
    idx: Optional[int] = None # idx
    surveyNo: Optional[int] = None # surveyNo
    userKey: Optional[int] = None # userKey
    surveyDate: Optional[str] = None # surveyDate
    name: Optional[str] = None # name

class MyskinsolutionResSchema(MyskinsolutionSchema):
    total_count: Optional[int] = 0