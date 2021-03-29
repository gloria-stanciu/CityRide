import create from './post.action'
import { getAll, getById } from './get.action'
import update from './put.action'
import remove from './delete.action'

import { Router } from 'express'
const calendarRouter = Router()

calendarRouter.get('/', getAll)
calendarRouter.post('/', create)
calendarRouter.get('/:id/:feedId', getById)
calendarRouter.put('/:id/:feedId', update)
calendarRouter.delete('/:id/:feedId', remove)

export default calendarRouter
