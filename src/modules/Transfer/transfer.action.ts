import create from './post.action'
import { getAll, getById } from './get.action'
import update from './put.action'
import remove from './delete.action'

import { Router } from 'express'
const transferRouter = Router()

transferRouter.get('/', getAll)
transferRouter.post('/', create)
transferRouter.get('/:tripId/:feedId/:fromStopId', getById)
transferRouter.put('/:tripId/:feedId/:fromStopId', update)
transferRouter.delete('/:tripId/:feedId/:fromStopId', remove)

export default transferRouter
