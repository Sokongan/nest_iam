import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createClient, RedisClientType } from "redis";

export const REDIS = Symbol("redis-connection");
@Global()
@Module({
  providers: [
    {
      provide: REDIS,
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<RedisClientType> => {
        const client = createClient({
          url: configService.get<string>("REDIS_URL"),
        });

        client.on("error", (err) => {
          console.error("Redis Error:", err);
        });

        await client.connect();
        return client;
      },
    },
  ],
  exports: [REDIS],
})
export class RedisConfigModule {}