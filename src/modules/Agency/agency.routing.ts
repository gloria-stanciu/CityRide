import create from './post.action'
import { getAll, getById } from './get.action'
import update from './put.action'
import remove from './delete.action'

import Router from 'express'
const agencyRouter = Router()

agencyRouter.post('/', create)
agencyRouter.get('/', getAll)
agencyRouter.get('/:id', getById)
agencyRouter.put('/:id', update)
agencyRouter.delete('/:id', remove)

export default agencyRouter
