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

For running locally you need to add `GOOGLE_APPLICATION_CREDENTIALS` environment variable with the path to to the credentials file. Or alternatively, during developement phase, one can develop using unit tests and then deploy to firebase to verify on remote server.

## Other useful commands

- Run tslint `yarn lint`
- Run unit tests `yarn test`
- Run prettier and fix `yarn prettier`
- Run prettier to only check `yarn prettier:check`
