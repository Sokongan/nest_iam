import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { HealthController } from "./controller";
import { HealthService } from "./service";
import { AuthenticationConfigModule, AuthenticationConfigService,  } from "../../modules/config/authentication/authentication-module";
import { AuthorizationConfigModule, AuthorizationConfigService, } from "../../modules/config/authorization/authorize-module";
import { OauthConfigModule, OauthConfigService,  } from "../../modules/iam/oauth/oauth-module";
import { CommonModule } from "../../../common/helpers/url-builder";


@Module({
  imports: [
    TerminusModule,
    CommonModule,
    AuthenticationConfigModule,
    AuthorizationConfigModule,
    OauthConfigModule,
  ],
  controllers: [HealthController],
  providers: [
    HealthService,
    AuthenticationConfigService,
    AuthorizationConfigService,
    OauthConfigService
  ],
})
export class HealthModule {}