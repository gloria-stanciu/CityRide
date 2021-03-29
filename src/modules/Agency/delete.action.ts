import { Request, Response } from 'express'
import { Agency } from '../../models/index'

async function remove(req: Request, res: Response) {
  try {
    await Agency.query().where('id', req.params.id).del()
    return res.status(200).send('Agency deleted successfully')
  } catch (err) {
    return res.status(500).send(err)
  }
}

export default remove
