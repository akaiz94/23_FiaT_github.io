from typing import List, Optional

from fastapi import Depends
from sqlalchemy.orm import Session

from configs.Database import (
    get_db_connection,
)
from models.mb.MbMemberModel import MbMember


class MbMemberRepository:
    db: Session

    def __init__(
            self, db: Session = Depends(get_db_connection)
    ) -> None:
        self.db = db

    def list(
            self,
            UserKey: Optional[int],
            Name: Optional[str],
            Phone: Optional[str],
            limit: Optional[int],
            start: Optional[int],
    ) -> List[MbMember]:
        query = self.db.query(MbMember)

        if UserKey:
            query = query.filter_by(UserKey=UserKey)
        if Name:
            query = query.filter_by(Name=Name)
        if Phone:
            query = query.filter_by(Phone=Phone)
        query = query.order_by(MbMember.UserKey.desc())
        return query.offset(start).limit(limit).all()

    def count(
            self,
            UserKey: Optional[int],
            Name: Optional[str],
            Phone: Optional[str],
    ) -> int:
        query = self.db.query(MbMember)

        if UserKey:
            query = query.filter_by(UserKey=UserKey)
        if Name:
            query = query.filter_by(Name=Name)
        if Phone:
            query = query.filter_by(Phone=Phone)

        return query.count()

    def get(self, mb_member: MbMember) -> MbMember:
        return self.db.get(
            MbMember, (mb_member.UserKey)
        )

    def create(self, mb_member: MbMember) -> MbMember:
        self.db.add(mb_member)
        self.db.commit()
        self.db.refresh(mb_member)
        return mb_member

    def update(self, mb_member: MbMember) -> MbMember:
        self.db.merge(mb_member)
        self.db.commit()
        return mb_member

    def delete(self, mb_member: MbMember) -> None:
        self.db.delete(mb_member)
        self.db.commit()
        self.db.flush()
