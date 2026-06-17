import { Injectable, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ProviderConfig } from "../../../../common/helpers/url-builder";

@Injectable()
export class AuthorizationConfigService implements ProviderConfig {
  constructor(private config: ConfigService) {}

  getAdmin(): string {
    return  this.config.getOrThrow<string>("authorization.admin");
  }

  getPublic(): string {
    return this.config.getOrThrow<string>("authorization.public");
  }
}

@Module({
  providers: [AuthorizationConfigService],
  exports: [AuthorizationConfigService],
})
export class AuthorizationConfigModule {}