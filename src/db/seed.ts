import { reset, seed } from 'drizzle-seed';
import { db, sql } from './connections.ts';
import { schema } from './schema/index.ts';

async function main() {
  await reset(db, schema);
  await seed(db, schema);
  await seed(db, { rooms: schema.rooms }).refine((f) => ({
    rooms: {
      count: 30,
      columns: {
        name: f.companyName(),
        description: f.loremIpsum(),
      },
    },
  }));
  sql.end();
}

main();
