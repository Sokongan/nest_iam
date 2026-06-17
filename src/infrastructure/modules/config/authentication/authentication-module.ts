import { Injectable, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ProviderConfig } from "../../../../common/helpers/url-builder";

@Injectable()
export class AuthenticationConfigService implements ProviderConfig{
  constructor(private config: ConfigService) {}

  getAdmin(): string {
    return  this.config.getOrThrow<string>("authentication.admin");
  }

  getPublic(): string {
    return this.config.getOrThrow<string>("authentication.public");
  }
}

@Module({
  providers: [AuthenticationConfigService],
  exports: [AuthenticationConfigService],
})
export class AuthenticationConfigModule {}