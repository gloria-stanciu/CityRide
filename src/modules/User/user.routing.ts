import create from './post.action'
import { getAll, getById } from './get.action'
import update from './put.action'
import remove from './delete.action'

import { Router } from 'express'
const userRouter = Router()

userRouter.get('/', getAll)
userRouter.post('/', create)
userRouter.get('/:id', getById)
userRouter.put('/:id', update)
userRouter.delete('/:id', remove)

export default userRouter
