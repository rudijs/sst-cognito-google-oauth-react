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

- npx sst start --stage rudijs --profile dev
- npx sst deploy --stage dev --profile dev
- npx sst deploy --stage staging --profile staging
- npx sst deploy --stage prod --profile prod

## Remove

AWS_PROFILE=<PROFILE> npx sst remove --stage <STAGE> --profile <AWS_PROFILE>

## Usage

Once SST is running, cd into the `frontend/`

- `npm run dev`

## DNS Setup

Follow the instruction below.

Setup a DNS NS record for the sub-domain in the AWS account for that environment (this delegates the subdomain to the AWS account.)

- https://sst.dev/chapters/share-route-53-domains-across-aws-accounts.html
- https://www.youtube.com/watch?v=YxHnpHaGcmY&t
