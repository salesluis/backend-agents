import { eq } from 'drizzle-orm';
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { db } from '../../db/connections.ts';
import { schema } from '../../db/schema/index.ts';

export const getRoomQuestionsRoute: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/rooms/:idRoom/questions',
    {
      schema: {
        params: z.object({
          idRoom: z.string(),
        }),
      },
    },
    async (request) => {
      const { idRoom } = request.params;

      const result = await db
        .select({
          id: schema.questions.id,
          question: schema.questions.question,
          answer: schema.questions.answer,
          createAt: schema.questions.createAt,
        })
        .from(schema.questions)
        .where(eq(schema.questions.idRoom, idRoom));

      return result;
    }
  );
};
