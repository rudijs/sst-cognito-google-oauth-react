# sst-cognito-google-oauth-react

Serverless Stack Auth Cognito OAuth React Demo

- https://sst.dev/examples/how-to-add-google-login-to-your-cognito-user-pool.html

## Setup

Create `.env` file containing Google App credentials:

```
GOOGLE_CLIENT_ID=<xxxxx>
GOOGLE_CLIENT_SECRET=<xxxxxx>
```

## Deploy

AWS_PROFILE=<PROFILE> npx sst --stage <STAGE> start

## Remove

AWS_PROFILE=<PROFILE> npx sst --stage <STAGE> remove

## Usage

Once SST is running, cd into the `frontend/`

- `npm run dev`
