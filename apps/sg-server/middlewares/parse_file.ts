import multer from 'multer'

const parseFileMiddleware = multer({ storage: multer.memoryStorage() }).single('file')

export default parseFileMiddleware