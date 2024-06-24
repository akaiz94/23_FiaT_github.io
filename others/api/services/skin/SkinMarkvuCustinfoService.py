from datetime import datetime
from typing import List, Optional

from fastapi import Depends

from models.skin.SkinMarkvuCustinfoModel import SkinMarkvuCustinfo
from repositories.skin.SkinMarkvuCustinfoRepository import SkinMarkvuCustinfoRepository
from schemas.pydantic.skin.SkinMarkvuCustinfoSchema import (
    SkinMarkvuCustinfoSchema,
)


class SkinMarkvuCustinfoService:
    skinMarkvuCustInfoRepository: SkinMarkvuCustinfoRepository

    def __init__(
            self,
            skinMarkvuCustInfoRepository: SkinMarkvuCustinfoRepository = Depends(),
    ) -> None:
        self.skinMarkvuCustInfoRepository = skinMarkvuCustInfoRepository

    def list(
            self,
            surveyNo: Optional[int] = None,
            userKey: Optional[int] = None,
            pageSize: Optional[int] = 10,
            startIndex: Optional[int] = 0,
    ) -> List[SkinMarkvuCustinfo]:
        return self.skinMarkvuCustInfoRepository.list(
            surveyNo, userKey, pageSize, startIndex
        )

    def count(
            self,
            surveyNo: Optional[int] = None,
            userKey: Optional[int] = None,
    ) -> int:
        return self.skinMarkvuCustInfoRepository.count(
            surveyNo, userKey
        )

    def get(self, idx: int) -> SkinMarkvuCustinfo:
        return self.skinMarkvuCustInfoRepository.get(SkinMarkvuCustinfo(idx=idx))

    def update(
            self, idx: int, skin_markvu_custInfo_body: SkinMarkvuCustinfoSchema
    ) -> SkinMarkvuCustinfo:
        skin_markvu_custInfo = self.get(idx)

        update_fields = []
        for field in skin_markvu_custInfo_body.__dict__:
            if field in skin_markvu_custInfo.__dict__:
                update_fields.append(field)

        for field in update_fields:
            if field != '_sa_instance_state':
                setattr(skin_markvu_custInfo, field, getattr(skin_markvu_custInfo_body, field))

        return self.skinMarkvuCustInfoRepository.update(skin_markvu_custInfo)

    def create(self, skin_markvu_custInfo_body: SkinMarkvuCustinfoSchema) -> SkinMarkvuCustinfo:
        return self.skinMarkvuCustInfoRepository.create(
            SkinMarkvuCustinfo(**skin_markvu_custInfo_body.dict())
        )

    def deleteForce(self, idx: int) -> None:
        skin_markvu_custInfo = self.get(idx)
        return self.skinMarkvuCustInfoRepository.delete(skin_markvu_custInfo)

    def delete(self, idx: int) -> None:
        self.update(idx, SkinMarkvuCustinfo(deleted_at=datetime.now()))
