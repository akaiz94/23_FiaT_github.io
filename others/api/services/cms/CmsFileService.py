from datetime import datetime
import os
import random
import time
from typing import List, Optional

from fastapi import Depends, status, UploadFile, HTTPException

from metadata.Code import AllowFileExtention
# from models.AuthorModel import Author
from models.cms.CmsFileModel import CmsFile
# from repositories.AuthorRepository import AuthorRepository
from repositories.cms.CmsFileRepository import CmsFileRepository
# from schemas.pydantic.AuthorSchema import AuthorSchema
from schemas.pydantic.cms.CmsFileSchema import (
    CmsFileSchema, CmsFileUpdateRefSchema, )
from services.cms.KakaoCloudService import KakaoCloudService


class CmsFileService:
    cmsFileRepository: CmsFileRepository
    kakaoCloudService: KakaoCloudService

    def __init__(
            self,
            cmsFileRepository: CmsFileRepository = Depends(),
            kakaoCloudService: KakaoCloudService = Depends(),
    ) -> None:
        self.cmsFileRepository = cmsFileRepository
        self.kakaoCloudService = kakaoCloudService

    def create(self, cms_file_body: CmsFileSchema) -> CmsFile:
        return self.cmsFileRepository.create(
            CmsFile(**cms_file_body)
        )

    def deleteForce(self, cms_file_id: int) -> None:
        return self.cmsFileRepository.delete(CmsFile(id=cms_file_id))

    def delete(self, cms_file_id: int) -> None:
        self.update(cms_file_id, CmsFile(deleted_at=datetime.now()))

    def get(self, cms_file_id: int) -> CmsFile:
        return self.cmsFileRepository.get(CmsFile(id=cms_file_id))

    def getProfileImage(self, surveyNo: int) -> str:
        profile = self.cmsFileRepository.getProfileImage(surveyNo)
        if profile is None:  # 기본 이미지
            profile = self.cmsFileRepository.getProfileImage(999999)
        if profile.path is None:
            return ''
        return profile.path

    def list(
            self,
            surveyNo: Optional[int] = None,
            pageSize: Optional[int] = 10,
            startIndex: Optional[int] = 0,
    ) -> List[CmsFile]:
        return self.cmsFileRepository.list(
            surveyNo, pageSize, startIndex
        )

    def list_by_ref_id(
            self,
            ref_id: Optional[str] = None,
            pageSize: Optional[int] = 10,
            startIndex: Optional[int] = 0,
    ) -> List[CmsFileSchema]:
        # return self.cmsFileRepository.list_by_ref_id(
        #     ref_id, pageSize, startIndex
        # )
        result_list = []
        for data in self.cmsFileRepository.list_by_ref_id(
                ref_id, pageSize, startIndex
        ):
            scheam = CmsFileSchema(
                **{**data.__dict__}
            )
            result_list.append(scheam)
        return result_list

    def update(
            self, cms_file_id: int, cms_file_body: CmsFileSchema
    ) -> CmsFile:
        cms_file = self.get(cms_file_id)

        update_fields = []
        for field in cms_file_body.__dict__:
            if field in cms_file.__dict__:
                update_fields.append(field)

        for field in update_fields:
            if field != '_sa_instance_state':
                setattr(cms_file, field, getattr(cms_file_body, field))

        return self.cmsFileRepository.update(cms_file_id, cms_file)

    def updateRefId(
            self, cms_file_id: int, cms_file_body: CmsFileUpdateRefSchema
    ) -> CmsFile:
        cms_file = self.get(cms_file_id)

        update_fields = []
        for field in cms_file_body.__dict__:
            if field in cms_file.__dict__:
                update_fields.append(field)

        for field in update_fields:
            if field != '_sa_instance_state':
                setattr(cms_file, field, getattr(cms_file_body, field))

        return self.cmsFileRepository.update(cms_file_id, cms_file)

    def get_file_size(self, file):
        content = file.file.read()
        file_size = len(content)
        return file_size

    async def upload_files(self, file_div_cd: str, ref_id: int, surveyNo: int, files: List[UploadFile]):
        uploaded_files = []
        maxFileUploadSize = os.getenv('MAX_FILE_UPLOAD_SIZE')
        for file in files:
            # Safely rename the file
            fileName = file.filename
            ext = file.filename.split(".").pop()
            path = f"upload/{file_div_cd.lower()}"

            # Check the file extension
            if ext.lower() not in [member.value for member in AllowFileExtention]:
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Invalid file extension: {ext}")

            file_size = self.get_file_size(file)
            file.file.seek  # 파일을 처음으로 되돌리기 위해 seek을 호출
            # Check file size
            if file_size > int(maxFileUploadSize) * 1024 * 1024:  # 10MB
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="File size exceeds 10MB limit")

            new_file_name = f"{int(time.time())}_{random.randint(1000, 9999)}.{ext}"

            # Upload the file to Kakao Cloud
            path = await self.kakaoCloudService.upload_file(path, new_file_name, file)
            if path is None or path == '':
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"File upload Fail !")

            # Save file information
            file_info = {
                "ref_id": ref_id,
                "file_name": fileName,
                "size": file_size,
                "ext": ext,
                "path": path,
                "file_div_cd": file_div_cd,
                "surveyNo": surveyNo,
            }

            uploaded_files.append(self.create(file_info))
        return uploaded_files
