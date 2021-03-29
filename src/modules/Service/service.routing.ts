import create from './post.action'
import { getAll, getById } from './get.action'
import update from './put.action'
import remove from './delete.action'

import { Router } from 'express'
const serviceRouter = Router()

serviceRouter.get('/', getAll)
serviceRouter.post('/', create)
serviceRouter.get('/:id/:feedId', getById)
serviceRouter.put('/:id/:feedId', update)
serviceRouter.delete('/:id/:feedId', remove)

export default serviceRouter
