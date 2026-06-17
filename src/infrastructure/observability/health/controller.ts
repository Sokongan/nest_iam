import { Controller, Get } from "@nestjs/common";
import { HealthService } from "./service";

@Controller("health")
export class HealthController {
  constructor(private readonly healthService: HealthService) { }

  @Get()
  check() {
    return this.healthService.checkConnect();
  }

  @Get('/authentication')
  checkAuthentication() {
    return this.healthService.checkAuthentication();
  }

  @Get('/authorization')
  checkAuthorization() {
    return this.healthService.checkAuthorization();
  }

  @Get('/oauth')
  checkOauth() {
    return this.healthService.checkOauth();
  }
}