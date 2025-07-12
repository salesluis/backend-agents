import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import z from 'zod/v4';
import { db } from '../../db/connections.ts';
import { schema } from '../../db/schema/index.ts';

export const createRommsRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/createRoom',
    {
      schema: {
        body: z.object({
          name: z.string().min(1, 'o nome da sala é obrigatório'),
          description: z.string().optional(),
        }),
      },
    },
    async (request, reply) => {
      const { name, description } = request.body;

      const resut = await db
        .insert(schema.rooms)
        .values({
          name,
          description,
        })
        .returning();

      const insertedRoom = resut[0];

      if (!insertedRoom) {
        throw new Error('filed to create a new room');
      }

      return reply.status(201).send({ roomId: insertedRoom.id });
    }
  );
};
