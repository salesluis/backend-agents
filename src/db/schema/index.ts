// conceito => barrel file => um arquivo que tem uma unica resposabilidade.
// reexportar todos os aruivos que contem dentro da camada/diretório
import { rooms } from './rooms.ts';

export const schema = {
  rooms,
};
