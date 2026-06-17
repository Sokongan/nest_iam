import { registerAs } from "@nestjs/config";
import { serviceEndpoints } from "../../../common/provider-config"

export default registerAs("oauth", () => ({
  admin: serviceEndpoints.oauth.admin,
  private: serviceEndpoints.oauth.private,
  public: serviceEndpoints.oauth.public,
}));

