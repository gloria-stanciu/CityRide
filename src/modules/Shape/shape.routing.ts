import create from './post.action'
import { getAll, getById } from './get.action'
import update from './put.action'
import remove from './delete.action'

import { Router } from 'express'
const shapeRouter = Router()

shapeRouter.get('/', getAll)
shapeRouter.post('/', create)
shapeRouter.get('/:id/:feedId', getById)
shapeRouter.put('/:id/:feedId', update)
shapeRouter.delete('/:id/:feedId', remove)

export default shapeRouter
