from datetime import datetime
from typing import List, Optional

from fastapi import Depends

from models.mb.MbManagerLogModel import MbManagerLog
from repositories.mb.MbManagerLogRepository import MbManagerLogRepository
from schemas.pydantic.mb.MbManagerLogSchema import (
    MbManagerLogSchema,
)


class MbManagerLogService:
    mbManagerLogRepository: MbManagerLogRepository

    def __init__(
            self,
            mbManagerLogRepository: MbManagerLogRepository = Depends(),
    ) -> None:
        self.mbManagerLogRepository = mbManagerLogRepository

    def list(
            self,
            LogKey: Optional[int] = None,
            pageSize: Optional[int] = 10,
            startIndex: Optional[int] = 0,
    ) -> List[MbManagerLog]:
        return self.mbManagerLogRepository.list(
            LogKey, pageSize, startIndex
        )

    def count(
            self,
            LogKey: Optional[int] = None
    ) -> int:
        return self.mbManagerLogRepository.count(
            LogKey
        )

    def get(self, LogKey: int) -> MbManagerLog:
        return self.mbManagerLogRepository.get(MbManagerLog(LogKey=LogKey))

    def update(
            self, LogKey: int, mb_manager_log_body: MbManagerLogSchema
    ) -> MbManagerLog:
        mb_manager_log = self.get(LogKey)

        update_fields = []
        for field in mb_manager_log_body.__dict__:
            if field in mb_manager_log.__dict__:
                update_fields.append(field)

        for field in update_fields:
            if field != '_sa_instance_state':
                setattr(mb_manager_log, field, getattr(mb_manager_log_body, field))

        return self.mbManagerLogRepository.update(LogKey, mb_manager_log)

    def create(self, mb_manager_log_body: MbManagerLogSchema) -> MbManagerLog:
        return self.mbManagerLogRepository.create(
            MbManagerLog(**mb_manager_log_body.dict())
        )

    def deleteForce(self, LogKey: int) -> None:
        mb_manager_log = self.get(LogKey)
        return self.mbManagerLogRepository.delete(mb_manager_log)

    def delete(self, LogKey: int) -> None:
        self.update(LogKey, MbManagerLog(deleted_at=datetime.now()))
