import { Model } from 'objection';
import knexClient from './knex_client'
import Vehicle from './vehicle'

Model.knex(knexClient);

// Define an interface that represents your Vehicle model properties
interface Drivetrain {
  drivetrain_id: number; 
  name: string;
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

class Drivetrain extends Model implements Drivetrain {
  static get tableName() {
    return 'drivetrains'; 
  }

  static get idColumn() {
    return 'drivetrain_id';
  }

  static get relationMappings() {
    return {
      vehicle: {
        relation: Model.HasManyRelation,
        modelClass: Vehicle,
        join: {
          from: 'drivetrains.drivetrain_id',
          to: 'vehicles.drivetrain_id',
        },
      }
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'name',
      ],
      properties: {
        drivetrain_id: { type: 'integer' },
        name: { type: 'string' },
        created_on: { type: 'string' },
        updated_on: { type: 'string' },
        deleted_on: { type: ['string', 'null'] },
      },
    };
  }
}

export default Drivetrain;
