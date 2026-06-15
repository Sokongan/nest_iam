import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DbConfigurationModule } from "./config/db/configuration";
import { RedisConfigurationModule } from "./config/redis/configuration";
import configuration from "./config/application/configuration";
import { HealthModule } from "./infrastructure/observability/health/module";


@Module({
  imports: [
    DbConfigurationModule,
    RedisConfigurationModule,
    HealthModule,
    ConfigModule.forRoot({
      envFilePath: [`.env`],
      isGlobal: true,
      load:[
         configuration,
      ]
    }),

  ],
})
export class AppModule {}
