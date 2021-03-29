import { Request, Response } from 'express'
import { User } from '../../models/index'

async function getAll(req: Request, res: Response) {
  try {
    const users = await User.query()
    return res.status(200).send(users)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function getById(req: Request, res: Response) {
  try {
    const user = await User.query().findById(req.params.id)
    return res.status(200).send(user)
  } catch (err) {
    res.status(500).send(err)
  }
}

export { getAll, getById }
