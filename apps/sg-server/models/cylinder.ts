import { Model } from 'objection';
import knexClient from './knex_client'

Model.knex(knexClient);

// Define an interface that represents your Vehicle model properties
interface Cylinder {
  cylinder_id: number; 
  name: string;
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

class Cylinder extends Model implements Cylinder {
  static get tableName() {
    return 'cylinders'; 
  }

  static get idColumn() {
    return 'cylinder_id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'name',
      ],
      properties: {
        cylinder_id: { type: 'integer' },
        name: { type: 'string' },
        created_on: { type: 'string' },
        updated_on: { type: 'string' },
        deleted_on: { type: ['string', 'null'] },
      },
    };
  }
}

export default Cylinder;
