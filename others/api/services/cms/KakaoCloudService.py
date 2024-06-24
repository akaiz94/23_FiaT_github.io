import mimetypes
import os

import requests
from fastapi import UploadFile


class KakaoCloudService:
    def __init__(self):

        self.kakaoAccessId = os.getenv('KAKAO_CLOUD_ACCESS_ID')
        self.kakaoSecretKey = os.getenv('KAKAO_CLOUD_SECRET_KEY')
        self.projectId = os.getenv('KAKAO_CLOUD_PROJECT_ID')
        self.bucketName = os.getenv('KAKAO_CLOUD_BUCKET_NAME')

    def create_access_token(self):
        url = 'https://iam.kakaoi.io/identity/v3/auth/tokens'

        data = {
            "auth": {
                "identity": {
                    "methods": [
                        "application_credential"
                    ],
                    "application_credential": {
                        "id": self.kakaoAccessId,
                        "secret": self.kakaoSecretKey
                    }
                }
            }
        }

        response = requests.post(url, json=data)
        token = response.headers.get('x-subject-token')
        return token

    def create_folder(self, folderName):
        access_token = self.create_access_token()

        url = f"https://objectstorage.kr-central-1.kakaoi.io/v1/{self.projectId}/{self.bucketName}/{folderName}"

        headers = {
            'X-Auth-Token': access_token,
            'Content-Type': 'application/directory',
        }
        response = requests.put(url, headers=headers)

    async def upload_file(self, path: str, filename: str, file: UploadFile):
        try:
            access_token = self.create_access_token()
            url = f"https://objectstorage.kr-central-1.kakaoi.io/v1/{self.projectId}/{self.bucketName}/{path}/{filename}"
            print('## check -1 ')
            file.file.seek
            content = await file.read()
            print('## check -2 ')
            mimetype, _ = mimetypes.guess_type(filename)
            headers = {
                'X-Auth-Token': access_token,
                'Content-Type': mimetype,
            }
            print('## check -3 ')

            response = requests.put(url, data=content, headers=headers)
            print('## check -4 ')
            print(f'## response:{response}')
            if response.status_code != 201:
                raise Exception('Upload Failed')

            res_url = response.request.url
            return res_url
        except Exception as e:
            print(f"Error upload_file: Error message: {e}")
            return None
