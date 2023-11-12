import { Router } from 'express'

const routes = Router()

routes.get('/test', (req, res) => res.status(200).send('OK'))

export default routes
