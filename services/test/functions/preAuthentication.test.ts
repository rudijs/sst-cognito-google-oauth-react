import { describe, test, expect } from "vitest"
import { handler } from "../../functions/preAuthentication"

const evt = {
  version: "1",
  region: "ap-southeast-1",
  userPoolId: "ap-southeast-1_WZbaKiG47",
  userName: "google_109511962726719553612",
  callerContext: {
    awsSdkVersion: "aws-sdk-unknown-unknown",
    clientId: "38grfes6lfh4ld53hl1p21cf6h",
  },
  triggerSource: "PreAuthentication_Authentication",
  request: {
    userAttributes: {
      sub: "d4c21f17-cb71-48b9-90cd-d13ac4b8bb29",
      "cognito:user_status": "EXTERNAL_PROVIDER",
      identities:
        '[{"userId":"109511962726719553612","providerName":"Google","providerType":"Google","issuer":null,"primary":true,"dateCreated":1661325432222}]',
      email_verified: "false",
      given_name: "Rudi",
      family_name: "Starcevic",
      email: "ooly.me@gmail.com",
      picture: "https://lh3.googleusercontent.com/a-/AFdZucqDUxE915AlI5m3V_qG_scCYxJ9GWuk7Q9fFJ2KIA=s96-c",
    },
    validationData: {},
  },
  response: {},
}

describe("functions", () => {
  test("#preAuthentication should reject non-whitelisted emails", () => {
    const res = handler(evt, {}, (err, res) => {
      if (err) return err
      return res
    })

    // console.log("res :>> ", res)
    expect(res.message).eq("Access denied.")
  })

  test("#preAuthentication should allow whitelisted emails", () => {
    evt.request.userAttributes.email = "rudi.starcevic@gmail.com"
    const res = handler(evt, {}, (err: any, res: any) => {
      if (err) return err
      return res
    })

    // console.log("res :>> ", res)
    expect(res.request.userAttributes.email).eq("rudi.starcevic@gmail.com")
  })
})
