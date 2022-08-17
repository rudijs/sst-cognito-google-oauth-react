# sst-cognito-google-oauth-react

Serverless Stack Auth Cognito OAuth React Demo

- https://sst.dev/examples/how-to-add-google-login-to-your-cognito-user-pool.html

## Setup

Create an `.env` file containing Google App credentials:

```
GOOGLE_CLIENT_ID=<xxxxx>
GOOGLE_CLIENT_SECRET=<xxxxxx>
```

Google config:

Client ID and client secret are from here:

- https://console.cloud.google.com/apis/credentials?project=cryptomarketscreener

Also configure in the Google cloud console the environment specific:

1. Authorized JavaScript origins
2. Authorized redirect URIs

## Deploy

- non prod developer stage
- npx sst start --stage <STAGE> --profile <AWS_PROFILE>
- prod
- AWS_PROFILE=default npx sst start --stage prod --profile <AWS_PROFILE>

## Remove

AWS_PROFILE=<PROFILE> npx sst remove --stage <STAGE> --profile <AWS_PROFILE>

## Usage

Once SST is running, cd into the `frontend/`

- `npm run dev`
