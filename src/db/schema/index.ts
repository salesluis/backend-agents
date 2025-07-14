// conceito => barrel file => um arquivo que tem uma unica resposabilidade.
// reexportar todos os aruivos que contem dentro da camada/diretório
import { audioChunks } from './audio-chunks.ts';
import { questions } from './questions.ts';
import { rooms } from './rooms.ts';

export const schema = {
  rooms,
  questions,
  audioChunks,
};
