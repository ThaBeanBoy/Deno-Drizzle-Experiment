import { drizzle } from 'npm:drizzle-orm/postgres-js';
import { migrate } from 'npm:drizzle-orm/postgres-js/migrator';
import postgres from 'npm:postgres';
import { load } from 'https://deno.land/std@0.214.0/dotenv/mod.ts';

const env = await load();

const sql = postgres(env.DB_URL, { max: 1 });
const db = drizzle(sql);

await migrate(db, { migrationsFolder: 'drizzle' });

await sql.end();
