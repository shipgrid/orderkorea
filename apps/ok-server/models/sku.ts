import { Model } from 'objection';
import knexClient from './knex_client'
import Order from './order'

Model.knex(knexClient);

interface Sku {
  sku_id: string;
  name: string;
  description: string;
  unit_price: number;
  image_url: string | null;
  length: number | null;
  width: number | null;
  height: number | null;
  unit_type: string | null; 
  product_url: string; 
  hs_code: string | null; 
  un_code: string | null; 
  country_of_origin: string | null; 
  manufacturer: string | null; 
  vendor: string | null; 
  created_on: string; 
  updated_on: string; 
  deleted_on: string; 
}

class Sku extends Model implements Sku {
  static get tableName() {
    return 'skus';
  }

  static get idColumn() {
    return 'sku_id'
  }

  static get relationMappings() {
    return {
      skus: {
        relation: Model.ManyToManyRelation,
        modelClass: Order,
        join: {
          from: 'sku.order_id',
          through: {
            from: 'order_sku.order_id',
            to: 'order_sku.sku_id'
          },
          to: 'order.order_id'
        }
      }
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'sku_id',
        'name',
        'description',
        'unit_price',
        'product_url'
      ],
      properties: {
        sku_id: { type: 'string', minLength: 1, maxLength: 255 },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        description: { type: 'string', minLength: 1, maxLength: 255 },
        unit_price: { type: 'number' },
        image_url: { type: ['string', 'null'], minLength: 1, maxLength: 255 },
        length: { type: ['number', 'null'] },
        width: { type: ['number', 'null'] },
        height: { type: ['number', 'null'] },
        unit_type: { type: ['string', 'null'] },
        product_url: { type: 'string', minLength: 1, maxLength: 255 },
        hs_code: { type: ['string', 'null'], minLength: 1, maxLength: 255 },
        un_code: { type: ['string', 'null'], minLength: 1, maxLength: 255 },
        country_of_origin: { type: ['string', 'null'], minLength: 1, maxLength: 255 },
        manufacturer: { type: ['string', 'null'], minLength: 1, maxLength: 255 },
        vendor: { type: ['string', 'null'], minLength: 1, maxLength: 255 },
        created_on: { type: 'string' },
        updated_on: { type: 'string' },
        deleted_on: { type: ['string', 'null'] },
      },
    };
  }
}

export default Sku;
