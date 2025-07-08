import { fastify } from "fastify";

import { 
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider
 } from "fastify-type-provider-zod";

 import { fastifyCors } from "@fastify/cors";
import { env } from "./env.ts";

 const app = fastify().withTypeProvider<ZodTypeProvider>()

 app.register(fastifyCors, {
    origin: '*'
 })

 app.setSerializerCompiler(serializerCompiler)
 app.setValidatorCompiler(validatorCompiler)

 app.listen({port:3333}, () => {
    console.log('rodando')
 })

app.listen({port:env.PORT})