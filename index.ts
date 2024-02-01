import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres/';
import { load } from 'std/dotenv/mod.ts';
import { users } from './schema.ts';

const env = await load();

const client = postgres(env.DB_URL, { prepare: false });
const db = drizzle(client);

const allUsers = await db.select().from(users);

console.log(allUsers);
