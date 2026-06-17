import { registerAs } from "@nestjs/config";
import { serviceEndpoints } from "../../../common/provider-config"

export default registerAs("authentication", () => ({
  admin: serviceEndpoints.authentication.admin,
  public: serviceEndpoints.authentication.public,
}));