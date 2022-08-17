/* eslint-disable no-undef */
import React from "react"
import ReactDOM from "react-dom/client"
import { Amplify } from "@aws-amplify/core"
import "./index.css"
import App from "./App"

/*
console.log(import.meta.env.VITE_APP_REGION)
console.log(import.meta.env.VITE_APP_USER_POOL_ID)
console.log(import.meta.env.VITE_APP_USER_POOL_CLIENT_ID)
console.log(`${import.meta.env.VITE_APP_COGNITO_DOMAIN}.auth.${import.meta.env.VITE_APP_REGION}.amazoncognito.com`)
console.log(2, import.meta.env.VITE_APP_API_STAGE)
const redirectSignIn = import.meta.env.VITE_APP_API_STAGE === "prod" ? "production-url" : "http://localhost:3000"
console.log("redirectSignIn :>> ", redirectSignIn)
console.log(import.meta.env.VITE_APP_API_URL)
console.log(import.meta.env.VITE_APP_REGION)
*/

// Configure AWS Amplify with credentials from backend
Amplify.configure({
  Auth: {
    region: import.meta.env.VITE_APP_REGION,
    userPoolId: import.meta.env.VITE_APP_USER_POOL_ID,
    userPoolWebClientId: import.meta.env.VITE_APP_USER_POOL_CLIENT_ID,
    mandatorySignIn: false,
    oauth: {
      domain: `${import.meta.env.VITE_APP_COGNITO_DOMAIN + ".auth." + import.meta.env.VITE_APP_REGION + ".amazoncognito.com"}`,
      scope: ["email", "profile", "openid", "aws.cognito.signin.user.admin"],
      // redirectSignIn: import.meta.env.VITE_APP_API_STAGE === "prod" ? "production-url" : "http://localhost:5173", // Make sure to use the exact URL
      // redirectSignOut: import.meta.env.VITE_APP_API_STAGE === "prod" ? "production-url" : "http://localhost:5173", // Make sure to use the exact URL
      redirectSignIn: "https://dev.signals.cryptomarketscreener.com", // Make sure to use the exact URL
      redirectSignOut: "https://dev.signals.cryptomarketscreener.com", // Make sure to use the exact URL
      responseType: "token",
    },
  },
  API: {
    endpoints: [
      {
        name: "api",
        endpoint: import.meta.env.VITE_APP_API_URL,
        region: import.meta.env.VITE_APP_REGION,
      },
    ],
  },
})

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
