import { registerAs } from "@nestjs/config";
import { serviceEndpoints } from "../../../common/provider-config"

export default registerAs("authorization", () => ({
  admin: serviceEndpoints.authorization.admin,
  public: serviceEndpoints.authorization.public,
}));