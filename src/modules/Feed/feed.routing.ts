import create from './post.action'
import { getAll, getById } from './get.action'
import update from './put.action'
import remove from './delete.action'

import { Router } from 'express'
const feedRouter = Router()

feedRouter.get('/', getAll)
feedRouter.post('/', create)
feedRouter.get('/:id', getById)
feedRouter.put('/:id', update)
feedRouter.delete('/:id', remove)

export default feedRouter
