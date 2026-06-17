import { registerAs } from "@nestjs/config";

export default registerAs("app", () => ({
  port: parseInt(process.env.PORT!),
  environment: process.env.NODE_ENV!,
  appName: process.env.APP_NAME!,
}));