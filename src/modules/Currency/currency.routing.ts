import create from './post.action'
import { getAll, getById } from './get.action'
import update from './put.action'
import remove from './delete.action'

import { Router } from 'express'
const currencyRouter = Router()

currencyRouter.get('/', getAll)
currencyRouter.post('/', create)
currencyRouter.get('/:id', getById)
currencyRouter.put('/:id', update)
currencyRouter.delete('/:id', remove)

export default currencyRouter
