import { schema } from 'normalizr';

export const score = new schema.Entity('scores', {});
export const arrayOfScore = new schema.Array(score);
