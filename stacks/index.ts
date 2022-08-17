import { MyStack } from "./MyStack"
import { App } from "@serverless-stack/resources"
import { DNS } from "./DNS"

export default function (app: App) {
  app.setDefaultFunctionProps({
    runtime: "nodejs16.x",
    srcPath: "services",
    bundle: {
      format: "esm",
    },
  })

  if (!["prod", "stage"].includes(app.stage)) app.setDefaultRemovalPolicy("destroy")

  app.stack(DNS).stack(MyStack)
}
