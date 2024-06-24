from datetime import datetime
from typing import List, Optional

from fastapi import Depends

from models.hair.HairImageModel import HairImage
from repositories.hair.HairImageRepository import HairImageRepository
from schemas.pydantic.hair.HairImageSchema import (
    HairImageSchema,
)


class HairImageService:
    hairImageRepository: HairImageRepository

    def __init__(
            self,
            hairImageRepository: HairImageRepository = Depends(),
    ) -> None:
        self.hairImageRepository = hairImageRepository

    def list(
            self,
            surveyNo: Optional[int] = None,
            userKey: Optional[int] = None,
            Name: Optional[str] = None,
            pageSize: Optional[int] = 10,
            startIndex: Optional[int] = 0,
    ) -> List[HairImage]:
        return self.hairImageRepository.list(
            surveyNo, userKey, Name, pageSize, startIndex
        )

    def count(
            self,
            surveyNo: Optional[int] = None,
            userKey: Optional[int] = None,
            Name: Optional[str] = None,
    ) -> int:
        return self.hairImageRepository.count(
            surveyNo, userKey, Name
        )

    def get(self, idx: int) -> HairImage:
        return self.hairImageRepository.get(HairImage(idx=idx))

    def update(
            self, idx: int, hair_image_body: HairImageSchema
    ) -> HairImage:
        hair_image = self.get(idx)

        update_fields = []
        for field in hair_image_body.__dict__:
            if field in hair_image.__dict__:
                update_fields.append(field)

        for field in update_fields:
            if field != '_sa_instance_state':
                setattr(hair_image, field, getattr(hair_image_body, field))

        return self.hairImageRepository.update(hair_image)

    def create(self, hair_image_body: HairImageSchema) -> HairImage:
        return self.hairImageRepository.create(
            HairImage(**hair_image_body.dict())
        )

    def deleteForce(self, idx: int) -> None:
        hair_image = self.get(idx)
        return self.hairImageRepository.delete(hair_image)

    def delete(self, idx: int) -> None:
        self.update(idx, HairImage(deleted_at=datetime.now()))
