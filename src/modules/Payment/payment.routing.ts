import create from './post.action'
import { getAll, getById } from './get.action'
import update from './put.action'
import remove from './delete.action'

import { Router } from 'express'
const paymentRouter = Router()

paymentRouter.get('/', getAll)
paymentRouter.post('/', create)
paymentRouter.get('/:id', getById)
paymentRouter.put('/:id', update)
paymentRouter.delete('/:id', remove)

export default paymentRouter
