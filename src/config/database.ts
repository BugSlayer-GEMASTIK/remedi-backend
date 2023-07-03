import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { DB } from '../models/types';

const dialect = new PostgresDialect({
  pool: async () =>
    new Pool({
      connectionString: process.env.DATABASE_URL as string,
    }),
});

const db = new Kysely<DB>({
  dialect,
});

export default db;
