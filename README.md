# Deno + Drizzle

This is a quick experiment on using the Drizzle ORM with a Typescript application running in the Deno runtime.

## Why Drizzle

### Why use an ORM

Before I explain why I used Drizzle, you must first understand what an ORM is. If you know an ORM, you can move on to the next section.

ORM is short for Object Relational Mapper …

### Why Drizzle

There are a couple of reasons why one would use Drizzle. Some of those reasons are already listed on the Drizzle website such as

- **Lightweight & edge ready.** Deno runs on the edge. Prisma (an alternative ts/js ORM), Prisma is not edge-ready, it requires some configuration.
- **Top-notch performance.** Here are the benchmarks, you can have a look. The benchmark is a performance comparison between Drizzle & Prisma.
- **Hassle-free SQL migrations**
- **No code generation**
- **Zero dependencies**
- **Feature-rich SQL dialects**

## Installation

If you are planning on using this, you have 2 options, you can scaffold the project or you can use it to learn how to set up Deno with Drizzle. Before installation, you will need to set up environment variables as described in the next section.

### Pre-requisites

For this project to run, you will need to install the Deno and Node runtimes.

Deno is for the main application. Node is used to generate migrations. You could say it’s mainly used as a dev dependency I guess 🤷‍♂️.

You can use any text editor, but I used VSCode. If you are using VSCode, you can consider installing the Deno extension.

### Environment Variables

Before continuing, if you are planning on using, forking etc… this project, you have to be aware of the different environment variables you have to set up.

`DB_URL` This is a URL connection to a PostgreSQL database. You can locally host your database or use some sort of online service. I used Supabase & got the connection URL from there.

DB_URL={database connection url}

### Set-Up

Make the project folder. If you are using VSCode, and you have installed the Deno extension, open the command palette (keyboard shortcut: ctrl + shift + p). In the command palette, run Deno: Enable to set up Deno in your project.

mkdir {project-name}

Initialise the git repository & make a .gitignore file. Initialising a repo isn’t necessary, but if you do, a .gitinore file is important.

touch .git

In the .gitgnore, make sure to ignore the .env file and node_modules folder. This will ensure that when you push changes to a remote repo, other users won’t have access to your database’s connection URL.

.env
node_modules

Initialise a package.json. The quickest way is to run npm init -y, you won’t have to answer the questionnaire.

Install Node dependencies

npm i drizzle-orm pg dotenv
npm - -D drizzle-kit

// You should notice the following in the package.json
{
// ... rest of package.json

    "devDependencies": {
        "drizzle-kit": "^0.20.14"
      },
      "dependencies": {
          "dotenv": "^16.4.1",
          "drizzle-orm": "^0.29.3",
          "pg": "^8.11.3"
      }

    // ... rest of package.json

}

Add the following npm script to the package.json file.

{
"scripts": {
"migration:generate": "drizzle-kit generate:pg --schema=./schema.ts"
}
}

Generate a deno.json file with the following content

{
"imports": {
"postgres/": "npm:postgres/",
"std/": "https://deno.land/std@0.214.0/"
},
"tasks": {
"migration:generate": "npm run migration:generate",
"migration:push": "deno run -A migrate.ts",
"db:studio": "npx drizzle-kit studio"
}
}

Make a migration file. You can name it whatever you want but I named mine migrate.ts

import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres/';
import { load } from 'std/dotenv/mod.ts';

const env = await load();

const sql = postgres(env.DB_URL, { max: 1 });
const db = drizzle(sql);

await migrate(db, { migrationsFolder: 'drizzle' });

await sql.end();

## Schemas & Migrations

### Schemas

At this point, you should be able to make your schemas. visit the SQL Schema docs on how to make your schemas.

### Migrations

Once you have defined your schemas, can migrate and push the migrations to the database.

To generate a migration, run the following in your terminal

deno task migration:generate

To push the migrations to your database, run the following in your terminal

deno task migration:push

## Studio

To view the data in the database, you can run the following in your terminal to open up the studio

deno task db:studio
