import { reset, seed } from 'drizzle-seed';
import { db, sql } from './connections.ts';
import { schema } from './schema/index.ts';

async function main() {
  await reset(db, schema);

  await seed(db, schema).refine((f) => ({
    rooms: {
      count: 20,
      columns: {
        name: f.companyName(),
        description: f.loremIpsum(),
      },
    },
    questions: {
      count: 20,
    },
  }));
  sql.end();
}

main();
