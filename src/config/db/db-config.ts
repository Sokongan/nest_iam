import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Pool } from "pg";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "../../database/schema";


export const DRIZZLE = Symbol("drizzle-connection");
@Global()
@Module({
    providers: [
        {
            provide: DRIZZLE,
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const connectionString = configService.get<string>("DATABASE_URL");
                const pool = new Pool({
                    connectionString,
                });
                await pool.query("SELECT 1");
                return drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;
            }
        }
    ],
    exports: [DRIZZLE]
})
export class DbConfigModule { }