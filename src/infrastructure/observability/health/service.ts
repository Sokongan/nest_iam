import { Inject, Injectable } from "@nestjs/common";
import { HealthCheckService, HealthIndicatorResult } from "@nestjs/terminus";
import { sql } from "drizzle-orm";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import type { RedisClientType } from "redis";
import * as schema from "../../../database/schema";
import { DRIZZLE } from "../../../config/db/db-config";
import { REDIS } from "../../../config/redis/redis-config";
import { ProviderConfig, UrlBuilder } from "../../../common/helpers/url-builder";
import { PROVIDER_HEALTH } from "../../../common/constant/routes";
import { AuthenticationConfigService } from "../../modules/config/authentication/authentication-module";
import { AuthorizationConfigService } from "../../modules/config/authorization/authorize-module";
import { OauthConfigService } from "../../modules/iam/oauth/oauth-module";


@Injectable()
export class HealthService {

  constructor(
    private readonly health: HealthCheckService,

    @Inject(DRIZZLE)
    private readonly db: NodePgDatabase<typeof schema>,

    @Inject(REDIS)
    private readonly redis: RedisClientType,

    private url: UrlBuilder,

    private readonly authentication: AuthenticationConfigService ,

    private readonly authorization: AuthorizationConfigService,

    private readonly oauth: OauthConfigService,

  ) { }

  async checkConnect(): Promise<HealthIndicatorResult> {
    try {
      const [appResult, dbResult, redisResult] = await Promise.all([
        this.health.check([
          async () => ({
            app: {
              status: 'up'
            }
          })
        ]),
        this.db.execute(sql`SELECT 1`),
        this.redis.ping(),
      ]);

      const dbOk = Array.isArray(dbResult) || dbResult !== null;
      const redisOk = redisResult === "PONG";

      return {
        system: {
          status: appResult ? 'up' : 'down',
          database: dbOk ? "up" : "down",
          cache: redisOk ? "up" : "down",
        },
      };
    } catch {
      return {
        system: {
          status: "down",
          database: "down",
          cache: "down",
        },
      };
    }
  }

  private async checkProvider(
    name: string,
    provider: ProviderConfig,
  ): Promise<HealthIndicatorResult> {
    const adminUrl = this.url.build(
      provider.getAdmin(),
      PROVIDER_HEALTH.HEALTH_ALIVE,
    );

    const publicUrl = this.url.build(
      provider.getPublic(),
      PROVIDER_HEALTH.HEALTH_ALIVE,
    );

    try {
      const [adminRes, publicRes] = await Promise.all([
        fetch(adminUrl),
        fetch(publicUrl),
      ]);

      return {
        [name]: {
          status: adminRes.ok && publicRes.ok ? "up" : "down",
          admin: adminRes.ok ? "up" : "down",
          public: publicRes.ok ? "up" : "down",
        },
      };
    } catch {
      return {
        [name]: {
          status: "down",
          admin: "down",
          public: "down",
        },
      };
    }
  }
  async checkAuthentication() {
    return this.checkProvider(
      "authentication",
      this.authentication,
    );
  }

  async checkAuthorization() {
    return this.checkProvider(
      "authentication",
      this.authorization,
    );
  }

  async checkOauth(){
    return this.checkProvider(
      "authentication",
      this.oauth,
    );
  }

}