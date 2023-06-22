import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { DB } from "../models/types"

const dialect = new PostgresDialect({
    pool: async () => new Pool({
        database: process.env.DATABASE_NAME,
        host: process.env.DATABASE_HOST
    }),
});

const db = new Kysely<DB>({
    dialect,
});

export default db;