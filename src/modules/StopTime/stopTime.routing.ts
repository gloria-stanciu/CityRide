import create from './post.action'
import { getAll, getById } from './get.action'
import update from './put.action'
import remove from './delete.action'

import { Router } from 'express'
const stopTimeRouter = Router()

stopTimeRouter.get('/', getAll)
stopTimeRouter.post('/', create)
stopTimeRouter.get('/:tripId/:feedId/:stopId', getById)
stopTimeRouter.put('/:tripId/:feedId/:stopId', update)
stopTimeRouter.delete('/:tripId/:feedId/:stopId', remove)

export default stopTimeRouter
