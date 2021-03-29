import { Request, Response } from 'express'
import { Agency } from '../../models/index'

async function update(req: Request, res: Response) {
  try {
    await Agency.query().where('id', req.params.id).update(req.body)
    return res.status(200).send('Agency updated successfully')
  } catch (err) {
    res.status(500).send(err)
  }
}

export default update
