from typing import List, Optional

from fastapi import Depends
from sqlalchemy.orm import Session

from configs.Database import (
    get_db_connection,
)
from models.mb.UserModel import User


class UserRepository:
    db: Session

    def __init__(
            self, db: Session = Depends(get_db_connection)
    ) -> None:
        self.db = db

    def list(
            self,
            user_id: Optional[int],
            limit: Optional[int],
            start: Optional[int],
    ) -> List[User]:
        query = self.db.query(User)
        query = query.filter_by(deleted_at=None)

        if user_id:
            query = query.filter_by(id=user_id)
        query = query.order_by(User.surveyNo.desc())
        return query.offset(start).limit(limit).all()

    def findByPhone(self, phone: str) -> Optional[User]:
        query = self.db.query(User).filter(User.phone == phone)
        result = query.first()
        return result

    def get(self, user: User) -> User:
        return self.db.get(
            User, user.id
        )

    def create(self, user: User) -> User:
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user

    def update(self, id: int, user: User) -> User:
        user.id = id
        self.db.merge(user)
        self.db.commit()
        return user

    def delete(self, user: User) -> None:
        self.db.delete(user)
        self.db.commit()
        self.db.flush()
