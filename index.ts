import { drizzle } from 'npm:drizzle-orm/postgres-js';
import postgres from 'npm:postgres';
import { load } from 'https://deno.land/std@0.214.0/dotenv/mod.ts';
import { users } from './schema.ts';

const env = await load();

const client = postgres(env.DB_URL, { prepare: false });
const db = drizzle(client);

const allUsers = await db.select().from(users);

console.log(allUsers);
