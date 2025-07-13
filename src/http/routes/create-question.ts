import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import z from 'zod/v4';
import { db } from '../../db/connections.ts';
import { schema } from '../../db/schema/index.ts';

export const createQuestionRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms/:idRoom/questions',
    {
      schema: {
        params: z.object({
          idRoom: z.string(),
        }),
        body: z.object({
          question: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { idRoom } = request.params;
      const { question } = request.body;

      const resut = await db
        .insert(schema.questions)
        .values({
          idRoom,
          question,
        })
        .returning();

      const insertedQuestion = resut[0];

      if (!insertedQuestion) {
        throw new Error('filed to create a new room');
      }

      return reply.status(201).send({ questionId: insertedQuestion.id });
    }
  );
};
