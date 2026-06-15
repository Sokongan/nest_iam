import { Inject, Injectable } from "@nestjs/common";

import { DRIZZLE } from "../../../config/db/configuration";
import { REDIS } from "../../../config/redis/configuration";


@Injectable()
export class HealthService {
  constructor(
    @Inject(DRIZZLE) private readonly db,
    @Inject(REDIS) private readonly redis,
  ) {}

  async check() {
    const results = {
      app: "ok",
      db: false,
      redis: false,
    };

    try {
      await this.db.execute("select 1");
      results.db = true;
    } catch {}

    try {
      await this.redis.ping();
      results.redis = true;
    } catch {}

    return results;
  }
}