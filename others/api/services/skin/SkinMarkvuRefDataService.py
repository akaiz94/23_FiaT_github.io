from datetime import datetime
from typing import List, Optional

from fastapi import Depends

from models.skin.SkinMarkvuRefDataModel import SkinMarkvuRefData
from repositories.skin.SkinMarkvuRefDataRepository import SkinMarkvuRefDataRepository
from schemas.pydantic.skin.SkinMarkvuRefDataSchema import (
    SkinMarkvuRefDataSchema,
)


class SkinMarkvuRefDataService:
    skinMarkvuRefDataRepository: SkinMarkvuRefDataRepository

    def __init__(
            self,
            skinMarkvuRefDataRepository: SkinMarkvuRefDataRepository = Depends(),
    ) -> None:
        self.skinMarkvuRefDataRepository = skinMarkvuRefDataRepository

    def list(
            self,
            Gubun: Optional[str] = None,
            pageSize: Optional[int] = 10,
            startIndex: Optional[int] = 0,
    ) -> List[SkinMarkvuRefData]:
        return self.skinMarkvuRefDataRepository.list(
            Gubun, pageSize, startIndex
        )

    def count(
            self,
            Gubun: Optional[str] = None
    ) -> int:
        return self.skinMarkvuRefDataRepository.count(
            Gubun
        )

    def get(self, Gubun: str) -> SkinMarkvuRefData:
        return self.skinMarkvuRefDataRepository.get(SkinMarkvuRefData(Gubun=Gubun))

    def update(
            self, Gubun: str, skin_markvu_ref_data_body: SkinMarkvuRefDataSchema
    ) -> SkinMarkvuRefData:
        skin_markvu_ref_data = self.get(Gubun)

        update_fields = []
        for field in skin_markvu_ref_data_body.__dict__:
            if field in skin_markvu_ref_data.__dict__:
                update_fields.append(field)

        for field in update_fields:
            if field != '_sa_instance_state':
                setattr(skin_markvu_ref_data, field, getattr(skin_markvu_ref_data_body, field))

        return self.skinMarkvuRefDataRepository.update(Gubun, skin_markvu_ref_data)

    def create(self, skin_markvu_ref_data_body: SkinMarkvuRefDataSchema) -> SkinMarkvuRefData:
        return self.skinMarkvuRefDataRepository.create(
            SkinMarkvuRefData(**skin_markvu_ref_data_body.dict())
        )

    def deleteForce(self, Gubun: str) -> None:
        skin_markvu_ref_data = self.get(Gubun)
        return self.skinMarkvuRefDataRepository.delete(skin_markvu_ref_data)

    def delete(self, Gubun: str) -> None:
        self.update(Gubun, SkinMarkvuRefData(deleted_at=datetime.now()))
