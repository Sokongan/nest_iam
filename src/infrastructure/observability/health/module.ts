import { Module } from "@nestjs/common";
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from "./controller";
import { HealthService } from "./service";


@Module({
  imports: [TerminusModule],  
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}