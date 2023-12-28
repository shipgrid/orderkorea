import { 
  Router 
} from 'express'

import {
  get,
  remove,
  create,
  list,
  update
} from '../controllers/orders'

import {
  create as createDocument,
  remove as removeDocument
} from '../controllers/documents'

import multer from 'multer';

const storage = multer.memoryStorage(); 
const multerUpload = multer({ 
  storage,
  limits: { fileSize: 10485760 } // 10MB
});

const routes = Router()

routes.get('/', list)
routes.get('/:order_id', get)
routes.post('/', create)
routes.delete('/:order_id', remove)
routes.put('/:order_id', update)
routes.post('/:order_id/documents', multerUpload.single('file'), createDocument)
routes.delete('/:order_id/documents/:document_id', removeDocument)

export default routes
