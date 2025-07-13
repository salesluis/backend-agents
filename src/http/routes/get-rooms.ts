import { count, eq } from 'drizzle-orm';
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { db } from '../../db/connections.ts';
import { schema } from '../../db/schema/index.ts';

export const getRommsRoute: FastifyPluginCallbackZod = (app) => {
  app.get('/rooms', async () => {
    const resuts = await db
      .select({
        id: schema.rooms.id,
        name: schema.rooms.name,
        crateAt: schema.rooms.createAt,
        questionCount: count(schema.questions.id),
      })
      .from(schema.rooms)
      .leftJoin(schema.questions, eq(schema.questions.idRoom, schema.rooms.id))
      .groupBy(schema.rooms.id)
      .orderBy(schema.rooms.createAt);
    return resuts;
  });
};
