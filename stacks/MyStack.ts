import * as cognito from "aws-cdk-lib/aws-cognito"
import { Api, Auth, StackContext, ViteStaticSite, use } from "@serverless-stack/resources"
import { DNS } from "./DNS"

export function MyStack({ stack, app }: StackContext) {
  const dns = use(DNS)

  // Create auth
  const auth = new Auth(stack, "Auth", {
    cdk: {
      userPoolClient: {
        supportedIdentityProviders: [cognito.UserPoolClientIdentityProvider.GOOGLE],
        oAuth: {
          callbackUrls: [["prod", "staging", "dev"].includes(app.stage) ? `https://${dns.domain}` : "http://localhost:5173"],
          logoutUrls: [["prod", "staging", "dev"].includes(app.stage) ? `https://${dns.domain}` : "http://localhost:5173"],
        },
      },
    },
    triggers: {
      preAuthentication: "functions/preAuthentication.handler",
    },
  })

  // Throw error if client ID & secret are not provided
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET)
    throw new Error("Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET")

  // Create a Google OAuth provider
  const provider = new cognito.UserPoolIdentityProviderGoogle(stack, "Google", {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    userPool: auth.cdk.userPool,
    scopes: ["profile", "email", "openid"],
    attributeMapping: {
      email: cognito.ProviderAttribute.GOOGLE_EMAIL,
      givenName: cognito.ProviderAttribute.GOOGLE_GIVEN_NAME,
      familyName: cognito.ProviderAttribute.GOOGLE_FAMILY_NAME,
      profilePicture: cognito.ProviderAttribute.GOOGLE_PICTURE,
    },
  })

  // attach the created provider to our userpool
  auth.cdk.userPoolClient.node.addDependency(provider)

  // Create a cognito userpool domain
  const domain = auth.cdk.userPool.addDomain("AuthDomain", {
    cognitoDomain: {
      domainPrefix: `${app.stage}-auth-${app.name}`,
    },
  })

  // Create a HTTP API
  const api = new Api(stack, "Api", {
    authorizers: {
      userPool: {
        type: "user_pool",
        userPool: {
          id: auth.userPoolId,
          clientIds: [auth.userPoolClientId],
        },
      },
    },
    defaults: {
      authorizer: "userPool",
    },
    routes: {
      "GET /private": "functions/private.handler",
      "GET /public": {
        function: "functions/public.handler",
        authorizer: "none",
      },
    },
  })

  // Allow authenticated users invoke API
  auth.attachPermissionsForAuthUsers(stack, [api])

  const viteStaticSiteConfig: any = {
    path: "frontend",
    environment: {
      VITE_APP_COGNITO_DOMAIN: domain.domainName,
      VITE_APP_API_URL: api.url,
      VITE_APP_REGION: app.region,
      VITE_APP_USER_POOL_ID: auth.userPoolId,
      VITE_APP_IDENTITY_POOL_ID: auth.cognitoIdentityPoolId as string,
      VITE_APP_USER_POOL_CLIENT_ID: auth.userPoolClientId,
      VITE_APP_REDIRECT_URL: "http://localhost:5173",
    },
  }

  // for non 'local' environments, set the DNS and redirect URL
  if (["prod", "staging", "dev"].includes(app.stage)) {
    viteStaticSiteConfig.customDomain = {
      domainName: dns.domain,
      hostedZone: dns.zone,
    }
    viteStaticSiteConfig.environment.VITE_APP_REDIRECT_URL = `https://${dns.domain}`
    viteStaticSiteConfig.environment.VITE_APP_CUSTOM_DOMAIN = dns.domain
  }

  const site = new ViteStaticSite(stack, "Site", viteStaticSiteConfig)

  // Show the endpoint in the output
  stack.addOutputs({
    stage: app.stage,
    ApiEndpoint: api.url,
    authClientId: auth.userPoolClientId,
    domain: domain.domainName,
    site_url: site.url,
    redirectUrl: viteStaticSiteConfig.environment.VITE_APP_REDIRECT_URL,
  })
}
