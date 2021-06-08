import create from './post.action'
import { getAll, getById, getRoutes } from './get.action'
import update from './put.action'
import remove from './delete.action'

import { Router } from 'express'
const stopRouter = Router()

stopRouter.get('/', getAll)
stopRouter.post('/', create)
stopRouter.get('/:id/:feedId', getById)
stopRouter.put('/:id/:feedId', update)
stopRouter.delete('/:id/:feedId', remove)
stopRouter.get('/:id', getRoutes)

export default stopRouter
