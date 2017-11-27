import { schema } from 'normalizr';

export const score = new schema.Entity('scores', {}, {idAttribute: "scoreId"});
export const arrayOfScore = new schema.Array(score);
