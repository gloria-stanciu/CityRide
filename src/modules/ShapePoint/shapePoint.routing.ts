import create from './post.action'
import { getAll, getById, getByLatLong } from './get.action'
import update from './put.action'
import { remove, removeAll } from './delete.action'

import { Router } from 'express'
const shapePointRouter = Router()

shapePointRouter.get('/', getAll)
shapePointRouter.post('/', create)
shapePointRouter.get('/:id', getById)
shapePointRouter.get('/:lat/:long', getByLatLong)
shapePointRouter.put('/:lat/:long', update)
shapePointRouter.delete('/:id', remove)

export default shapePointRouter
