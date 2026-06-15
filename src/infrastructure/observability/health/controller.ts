import { Controller, Get } from "@nestjs/common";
import { HealthService } from "./service";


@Controller("health")
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  check() {
    return this.healthService.check();
  }
}