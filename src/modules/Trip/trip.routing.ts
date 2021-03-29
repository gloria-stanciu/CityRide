import create from './post.action'
import { getAll, getById } from './get.action'
import update from './put.action'
import remove from './delete.action'

import { Router } from 'express'
const tripRouter = Router()

tripRouter.get('/', getAll)
tripRouter.post('/', create)
tripRouter.get('/:id/:feedId', getById)
tripRouter.put('/:id/:feedId', update)
tripRouter.delete('/:id/:feedId', remove)

export default tripRouter
