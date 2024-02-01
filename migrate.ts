import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres/';
import { load } from 'std/dotenv/mod.ts';

const env = await load();

const sql = postgres(env.DB_URL, { max: 1 });
const db = drizzle(sql);

await migrate(db, { migrationsFolder: 'drizzle' });

await sql.end();
