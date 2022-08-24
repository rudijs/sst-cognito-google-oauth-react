export const handler = (event: any, context: any, callback: any) => {
  // console.log("pre-auth event :>> ", event)

  if (event.request.userAttributes.email !== "rudi.starcevic@gmail.com") {
    var error = new Error("Access denied.")

    // Return error to Amazon Cognito
    return callback(error, event)
  }

  // Return to Amazon Cognito
  return callback(null, event)
}
