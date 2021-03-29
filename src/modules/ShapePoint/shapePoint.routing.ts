import create from './post.action'
import { getAll, getById } from './get.action'
import update from './put.action'
import remove from './delete.action'

import { Router } from 'express'
const shapePointRouter = Router()

shapePointRouter.get('/', getAll)
shapePointRouter.post('/', create)
shapePointRouter.get('/:id', getById)
shapePointRouter.put('/:id', update)
shapePointRouter.delete('/:id', remove)

export default shapePointRouter