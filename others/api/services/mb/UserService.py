from datetime import datetime
from typing import List, Optional

import bcrypt
import requests
from bcrypt import hashpw
from fastapi import Depends
from fastapi import status, HTTPException

from configs.OAuth import create_access_token
# from models.OfficeModel import Office
from models.mb.UserModel import User
# from repositories.OfficeRepository import OfficeRepository
from repositories.mb.UserRepository import UserRepository
from schemas.pydantic.cms.CmsFileSchema import CmsFileUpdateRefSchema
# from schemas.pydantic.OfficeMemberSchema import OfficeMemberSchema
# from schemas.pydantic.OfficeSchema import OfficeSchema
from schemas.pydantic.mb.UserLoginSchema import UserLoginPostRequestSchema, UserLoginResponseSchema
from schemas.pydantic.mb.UserSchema import (
    UserSchema, UserResponseSchema, UserPatchRequestSchema,
)
# from services.OfficeMemberService import OfficeMemberService
# from services.UserOptinService import UserOptinService
from services.cms.CmsFileService import CmsFileService


class UserService:
    # officeMemberService: OfficeMemberService
    # userOptinService: UserOptinService
    cmsFileService: CmsFileService
    userRepository: UserRepository

    # officeRepository: OfficeRepository

    def __init__(
            self,
            userRepository: UserRepository = Depends(),
            # userOptinService: UserOptinService = Depends(),
            cmsFileService: CmsFileService = Depends(),
            # officeMemberService: OfficeMemberService = Depends(),
            # officeRepository: OfficeRepository = Depends(),

    ) -> None:
        self.userRepository = userRepository
        # self.userOptinService = userOptinService
        self.cmsFileService = cmsFileService
        # self.officeMemberService = officeMemberService
        # self.officeRepository= officeRepository


    def login(self, user_body: UserLoginPostRequestSchema) -> Optional[UserLoginResponseSchema]:
        # Retrieve the user by phone number
        user = self.userRepository.findByPhone(user_body.phone)
        user.profile_file_id = None
        if user is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")

        # Verify the password
        hashed_passwd = hashpw(user_body.passwd.encode('utf-8'), bcrypt.gensalt())
        print(f'## hashed_passwd {user_body.passwd}, {hashed_passwd}')

        if not bcrypt.checkpw(user_body.passwd.encode('utf-8'), user.passwd.encode('utf-8')):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not match password")

        # Generate JWT token
        access_token = create_access_token(data={"sub": user.id})

        # todo login 시 추가항목
        # login time
        # push_token update 추가
        # cloi_push_token update 추가

        # update_param = UserPatchRequestSchema({
        #     'last_access_at': datetime.now(),
        #     'push_token': 'aaa'
        # })
        user.last_access_at = datetime.now()
        user.push_token = user_body.push_token
        self.update(user.id, user)
        return {
            # "user": UserSchema(**user.__dict__),
            "user": {
                "id": user.id,
                "email": user.email,
                "name": user.name,
                "address": user.address,
                "phone": user.phone,
                "birth_date": user.birth_date,
                "gender": user.gender,
                "last_access_at": user.last_access_at,
                # "office_id": self.getUserOfficeId(user.id),
                # "profile_img": self.cmsFileService.getProfileImage(user.id)
            },
            "access_token": access_token,
        }

    # def getUserOfficeId(self, surveyNo: int) -> int:
    #     # office member
    #     officeMember = self.officeMemberService.getByUserId(surveyNo)
    #     if officeMember is not None:
    #         office_id = officeMember.office_id
    #     else:
    #         office_id = 0
    #
    #     return office_id
    #
    # def getOfficeInfo(self, office_id: int) -> OfficeSchema:
    #     office =  self.officeRepository.get(Office(id=office_id, deleted_at=None))
    #     return OfficeSchema(**{**office.__dict__})

    def create(self, user_body: UserSchema) -> User:
        hashed_passwd = hashpw(user_body.passwd.encode('utf-8'), bcrypt.gensalt())
        user_body.passwd = hashed_passwd.decode('utf-8')
        print(f'## hashed_passwd {user_body.passwd}')

        # 전화 번호 중복체크
        user = self.userRepository.findByPhone(user_body.phone)
        if user is not None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="이미등록된 전화번호 입니다.")

        # user_optin 을 제외한 필드만 dict() 에 포함
        user_dict = {key: value for key, value in user_body.dict().items() if
                     key != "user_optin" and key != "profile_file_id"}

        user = self.userRepository.create(
            User(**user_dict)
        )
        if user is None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="회원가입중 오류가 발생하였습니다.")

        # optin 정보저장
        # self.userOptinService.create(user.id, user_body.user_optin)

        file_dict = dict(
            id=user_body.profile_file_id,
            ref_id=user.id,
            surveyNo=user.id
        )

        # 프로필 사진의 ref_id 값을 user.id 값으로 수정
        if user_body.profile_file_id != 0:
            self.cmsFileService.updateRefId(
                user_body.profile_file_id,
                CmsFileUpdateRefSchema(**file_dict, exclude_none=True),
            )

        response_data = {
            "id": user.id,
            "name": user.name,
        }

        return response_data

    def deleteForce(self, surveyNo: int) -> None:
        return self.userRepository.delete(User(surveyNo=surveyNo))

    def delete(self, surveyNo: int) -> None:
        self.update(surveyNo, User(deleted_at=datetime.now()))

    def getUser(self, surveyNo: int) -> User:
        return self.userRepository.get(User(surveyNo=surveyNo, deleted_at=None))

    def get(self, surveyNo: int) -> UserResponseSchema:
        user = self.userRepository.get(User(surveyNo=surveyNo, deleted_at=None))
        office_info = None
        if user:
            return UserResponseSchema(**{**user.__dict__,
                                         'profile_img': None
                                         })
        else:
            return {}

    def listUser(
            self,
            surveyNo: Optional[int] = None,
            pageSize: Optional[int] = 10,
            startIndex: Optional[int] = 0,

    ) -> List[User]:
        return self.userRepository.list(
            surveyNo, pageSize, startIndex
        )

    def listWithOffice(
            self,
            surveyNo: Optional[int] = None,
            pageSize: Optional[int] = 10,
            startIndex: Optional[int] = 0,

    ) -> List[UserResponseSchema]:
        return [
            UserResponseSchema(**{**user.__dict__, 'office_id': self.getUserOfficeId(user.id)})
            for user in self.listUser(
                surveyNo, pageSize, startIndex
            )
        ]

    def listFilterByOfficeId(
            self,
            surveyNo: Optional[int] = None,
            office_id: Optional[int] = None,
            pageSize: Optional[int] = 10,
            startIndex: Optional[int] = 0,

    ) -> List[UserResponseSchema]:
        user_list = self.listUser(surveyNo, pageSize, startIndex)
        if office_id is not None:
            filtered_user_list = [
                schemaUser
                for schemaUser in user_list
                if self.getUserOfficeId(schemaUser.id) == office_id
            ]
        else:
            filtered_user_list = user_list

        return [
            UserResponseSchema(**{**schemaUser.__dict__,
                                  'office_id': self.getUserOfficeId(schemaUser.id),
                                  'profile_img': self.cmsFileService.getProfileImage(schemaUser.id)
                                  })
            for schemaUser in filtered_user_list
        ]

    def update(
            self, surveyNo: int, user_body: UserPatchRequestSchema
    ) -> UserResponseSchema:
        user = self.getUser(surveyNo)

        update_fields = []
        for field in user_body.__dict__:
            if field in user.__dict__:
                update_fields.append(field)

        for field in update_fields:
            if field != '_sa_instance_state':
                setattr(user, field, getattr(user_body, field))

        self.userRepository.update(user)

        if user_body.profile_file_id:
            file_dict = dict(
                id=user_body.profile_file_id,
                ref_id=user.id,
                surveyNo=user.id
            )

            # 프로필 사진의 ref_id 값을 user.id 값으로 수정
            if user_body.profile_file_id != 0:
                self.cmsFileService.updateRefId(
                    user_body.profile_file_id,
                    CmsFileUpdateRefSchema(**file_dict, exclude_none=True),
                )

        response_data = {
            "id": user.id,
            "name": user.name,
        }

        return response_data
        # return

        # user_optin 을 제외한 필드만 dict() 에 포함
        # user_dict = {key: value for key, value in user_body.dict().items() if key != "user_optin" and key != "profile_file_id"}
        #
        # user = self.userRepository.create(
        #     User(**user_dict)
        # )
