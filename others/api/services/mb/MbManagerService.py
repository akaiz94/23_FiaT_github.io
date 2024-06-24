import hmac
from datetime import datetime
from typing import List, Optional
import hashlib
import bcrypt
from fastapi import Depends
from fastapi import status, HTTPException

from configs.OAuth import create_access_token
from models.mb.MbManagerModel import MbManager
from repositories.mb.MbManagerRepository import MbManagerRepository
from schemas.pydantic.mb.MbManagerSchema import (
    MbManagerSchema, MbManagerPostRequestSchema, MbManagerResponseSchema, MbManagerPostLoginRequestSchema,
    MbManagerLoginResponseSchema,
)
# from cryptography.hazmat.backends import default_backend
# from cryptography.hazmat.primitives import hashes, serialization
# from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
# from cryptography.hazmat.primitives.padding import PKCS7
import base64


class JWTError(object):
    pass

class MbManagerService:
    mbManagerRepository: MbManagerRepository

    def __init__(
            self,
            mbManagerRepository: MbManagerRepository = Depends(),
    ) -> None:
        self.mbManagerRepository = mbManagerRepository

    def login(self, login_request: MbManagerPostLoginRequestSchema) -> Optional[MbManagerLoginResponseSchema]:
        # Retrieve the user by phone number
        manager = self.mbManagerRepository.findById(login_request.ManagerID)
        if manager is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")

        encrypted_password = self.sha512_hash(login_request.Password)
        # print(f'## db saved_password {manager.Password}')
        # print(f'## encrypted_password {login_request.Password}, {encrypted_password}')
        if manager.Password != encrypted_password:  # 데이터베이스에 저장된 암호화된 비밀번호와 비교
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not match password")

        # Generate JWT token
        access_token = create_access_token(data={"sub": manager.ManagerID})

        manager.push_token = access_token
        self.update(manager.ManagerKey, manager)
        return {
            "manager": manager,
            "access_token": access_token,
        }

    # SHA512 해싱
    def sha512_hash(self, password: str) -> str:
        key = "IOPEBIOL".encode('utf-8')
        password_bytes = password.encode('utf-8')

        # key와 password를 합쳐 해싱
        combined = key + password_bytes
        hashed = hashlib.sha512(combined).hexdigest()
        return hashed

    def list(
            self,
            ManagerKey: Optional[int] = None,
            pageSize: Optional[int] = 10,
            startIndex: Optional[int] = 0,
    ) -> List[MbManager]:
        return self.mbManagerRepository.list(
            ManagerKey, pageSize, startIndex
        )

    def count(
            self,
            ManagerKey: Optional[int] = None
    ) -> int:
        return self.mbManagerRepository.count(
            ManagerKey
        )

    def get(self, ManagerKey: int) -> MbManager:
        return self.mbManagerRepository.get(MbManager(ManagerKey=ManagerKey))

    def update(
            self, ManagerKey: int, mb_manager_body: MbManagerSchema
    ) -> MbManager:
        mb_manager = self.get(ManagerKey)

        update_fields = []
        for field in mb_manager_body.__dict__:
            if field in mb_manager.__dict__:
                update_fields.append(field)

        for field in update_fields:
            if field != '_sa_instance_state':
                setattr(mb_manager, field, getattr(mb_manager_body, field))

        return self.mbManagerRepository.update(mb_manager)

    def create(self, mb_manager_body: MbManagerSchema) -> MbManager:
        return self.mbManagerRepository.create(
            MbManager(**mb_manager_body.dict())
        )

    def deleteForce(self, ManagerKey: int) -> None:
        mb_manager = self.get(ManagerKey)
        return self.mbManagerRepository.delete(mb_manager)

    def delete(self, ManagerKey: int) -> None:
        self.update(ManagerKey, MbManager(deleted_at=datetime.now()))
