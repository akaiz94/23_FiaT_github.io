from datetime import datetime
from typing import List, Optional

from fastapi import Depends

from models.mb.MbMemberModel import MbMember
from repositories.mb.MbMemberRepository import MbMemberRepository
from schemas.pydantic.mb.MbMemberSchema import (
    MbMemberSchema,
)


class MbMemberService:
    mbMemberRepository: MbMemberRepository

    def __init__(
            self,
            mbMemberRepository: MbMemberRepository = Depends(),
    ) -> None:
        self.mbMemberRepository = mbMemberRepository

    def list(
            self,
            UserKey: Optional[int] = None,
            Name: Optional[str] = None,
            Phone: Optional[str] = None,
            pageSize: Optional[int] = 10,
            startIndex: Optional[int] = 0,
    ) -> List[MbMember]:
        return self.mbMemberRepository.list(
            UserKey, Name, Phone, pageSize, startIndex
        )

    def count(
            self,
            UserKey: Optional[int] = None,
            Name: Optional[str] = None,
            Phone: Optional[str] = None,
    ) -> int:
        return self.mbMemberRepository.count(
            UserKey,Name, Phone
        )

    def get(self, UserKey: int) -> MbMember:
        return self.mbMemberRepository.get(MbMember(UserKey=UserKey))

    def update(
            self, UserKey: int, mb_member_body: MbMemberSchema
    ) -> MbMember:
        mb_member = self.get(UserKey)

        update_fields = []
        for field in mb_member_body.__dict__:
            if field in mb_member.__dict__:
                update_fields.append(field)

        for field in update_fields:
            if field != '_sa_instance_state':
                setattr(mb_member, field, getattr(mb_member_body, field))

        return self.mbMemberRepository.update(UserKey, mb_member)

    def create(self, mb_member_body: MbMemberSchema) -> MbMember:
        return self.mbMemberRepository.create(
            MbMember(**mb_member_body.dict())
        )

    def deleteForce(self, UserKey: int) -> None:
        mb_member = self.get(UserKey)
        return self.mbMemberRepository.delete(mb_member)

    def delete(self, UserKey: int) -> None:
        self.update(UserKey, MbMember(deleted_at=datetime.now()))
