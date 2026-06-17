import { Module } from "@nestjs/common";
import { DbConfigModule } from "./db/db-config";
import { RedisConfigModule } from "./redis/redis-config";
import { ConfigModule } from "@nestjs/config";
import appConfig from './application/app-config';
import oauthConfig from "./providers/oauth/oauth-config";
import authenticationConfig from "./providers/authentication/configuration";
import authorizationConfig from "./providers/authorization/configuration";

@Module({
    imports:[
        DbConfigModule,
        RedisConfigModule,
        ConfigModule.forRoot({
            envFilePath: [`.env`],
            isGlobal: true,
            load:[
               appConfig,
               oauthConfig,
               authenticationConfig,
               authorizationConfig
            ]

        })
    ]
})
export class ConfigurationModule {}