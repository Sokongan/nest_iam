import { Module } from "@nestjs/common";
import { HealthModule } from "./infrastructure/observability/health/module";
import { ConfigurationModule } from "./config";


@Module({
  imports: [
    ConfigurationModule,
    HealthModule,
  ],
})
export class AppModule {}
