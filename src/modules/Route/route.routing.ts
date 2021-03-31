import create from './post.action'
import { getAll, getById } from './get.action'
import update from './put.action'
import remove from './delete.action'

import { Router } from 'express'
const routeRouter = Router()

routeRouter.get('/', getAll)
routeRouter.post('/', create)
routeRouter.get('/:id/:agencyId/:feedId', getById)
routeRouter.put('/:id/:agencyId/:feedId', update)
routeRouter.delete('/:id/:agencyId/:feedId', remove)

export default routeRouter
