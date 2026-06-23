import { Injectable, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ProviderConfig } from "../../../../common/helpers/url-builder";

@Injectable()
export class OauthConfigService implements ProviderConfig {
    constructor(private config: ConfigService) { }

    getAdmin(): string {
        return this.config.getOrThrow<string>("oauth.admin");
    }

    getPublic(): string {
        return this.config.getOrThrow<string>("oauth.public");
    }

    getPrivate(): string {
        return this.config.getOrThrow<string>("oauth.private");
    }
}

@Module({
    providers: [OauthConfigService],
    exports: [OauthConfigService],
})
export class OauthConfigModule { }