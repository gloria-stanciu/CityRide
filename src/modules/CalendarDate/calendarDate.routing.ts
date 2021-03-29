import create from './post.action'
import { getAll, getById } from './get.action'
import update from './put.action'
import remove from './delete.action'

import { Router } from 'express'
const calendarDatesRouter = Router()

calendarDatesRouter.get('/', getAll)
calendarDatesRouter.post('/', create)
calendarDatesRouter.get('/:id/:feedId', getById)
calendarDatesRouter.put('/:id/:feedId', update)
calendarDatesRouter.delete('/:id/:feedId', remove)

export default calendarDatesRouter
