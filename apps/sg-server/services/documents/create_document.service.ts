import {
  Logger,
  Document,
  KnexClient
} from '../../models'

export default async ({
  order_id= 1,
  document_url
}) => {
  try {

    let createdDocument;

    await KnexClient.transaction(async (trx) => {

      const newDocument = {
        order_id,
        document_url,
      };

      const order = await Document.query(trx).insert(newDocument);
      createdDocument = order;
    });

    return createdDocument;
  } catch(e) {
    Logger.error('Error creating document:', e);
    throw e
  }
}
