import { Request, Response } from 'express'
import { User } from '../../models/index'

async function remove(req: Request, res: Response) {
  try {
    await User.query().where('id', req.params.id).del()
    return res.status(200).send('User deleted successfully')
  } catch (err) {
    return res.status(500).send(err)
  }
}

export default remove
