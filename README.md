# velox-scientiam-functions

Cloud functions for velox-scientiam

## Getting started

- Login with firebase CLI if not already logged in `firebase login`
- Install firebase tools globally `npm install -g firebase-tools`
- `cd functions`
- Install dependencies `yarn install`
- Run locally `yarn serve`
- Build `yarn build`
- Deploy to firebase `yarn deploy`

For running the functions locally you need to add `GOOGLE_APPLICATION_CREDENTIALS` environment variable with the path to the credentials file. Instructions found in [`Firebase docs`](https://firebase.google.com/docs/admin/setup#initialize-sdk)

## Other useful commands

- Generate dynamic models based on functions/openapi.yaml `yarn generate`
- Run tslint `yarn lint`
- Run unit tests `yarn test`
- Run prettier and fix `yarn prettier`
- Run prettier to only check `yarn prettier:check`

## Endpoints

### POST: /api/signup

Requires valid signup data in body and returns token with the user information.

Example request body:

```
{
    "email": "test@testing.com",
    "username": "tester"
    "password": "password",
    "confirmPassword": "password",
}
```

Example return value:

```
{
    "user": {
        "username": "tester",
        "email": "test@testing.com",
        "uid": "PQAa6hAPaEQqeIIkr0LfMaBiqei1",
        "createdAt": "2020-04-24T17:38:28.585Z"
    },
    "token": "eyJhbGciOiJSUfI1NiIsImtpZCI6IjVlOWVlOTdjODQwZjk3ZTAyNTM2ODhhM2I3ZTk0NDczZTUyOGE3YjUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3flY3VyZXRva2VuLmdvb2dsZS5jb20vdmVsb3gtODBmYjUiLCJhdWQiOiJ2ZWxveC04MGZiNSIsImF1dGhfdGltZSI6MTU4Nzc0OTkwOCwidXNlcl9pZCI6IlBRQUo2aEFQYUVRcVZJSWtyMExWTWFCaXFlaTEiLCJzdWIiOiJQUUFKNmhBUGFFUXFWSUlrcjBMVkfhQmlxZWkxIiwiaWF0IjoxNTg3NzQ5OTA4LCJleHAiOjE1ODc3NTM1MDgsImVtYWlsIjoidGltbzFAdGVzdGluZy5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGltbzFAdGVzdGluZy5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fg.rATd0NGOtuYFajMbRALtkdqh5v0Y3HF-v2Rfch75XF1qy4V5wqHN2cW3i0qSv-GkLuiUa-V-uAGa2LM_T-w44PdpRukaKLMgm2J7gnKU9W4E4wBKz1LMI4n9ZqoM7TrB9nv8XZY9Q_wK6p5ZLSUHQIfEelIENs5uKNetxJ9Oy17KxAhX1UVvWPbnVbBRLigm0S2EQ9Iqy0uA95sGGuNA4ZpkkRFak1j8sR6k08JGiLufOeXloPbVu_Xxfdp_SY2X2iiyFzhb48YzKqwIm4cJbnHWqHZUndCDKBkiPagzKBxB_Y0BW0pk8vMixLcJs0cVvGLVRHoUqaZbbXCgjbiTuw"
}
```
