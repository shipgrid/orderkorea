import {
  Document,
  Logger,
  KnexClient
} from '../../models'

export default async ({
  document_id
}) => {
  try {

    await KnexClient.transaction(async (trx) => {
      await Document.query(trx).deleteById(document_id);
    });
  } catch(e) {
    Logger.error('Error deleting document:', e);
    throw e
  }
}