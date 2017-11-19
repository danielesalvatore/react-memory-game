import { schema } from 'normalizr';

export const card = new schema.Entity('cards', {});
export const arrayOfCard = new schema.Array(card);