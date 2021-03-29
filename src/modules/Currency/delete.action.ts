import { Request, Response } from 'express'
import { Currency } from '../../models/index'

async function remove(req: Request, res: Response) {
  try {
    await Currency.query().where('id', req.params.id).del()
    return res.status(200).send('Currency deleted successfully')
  } catch (err) {
    return res.status(500).send(err)
  }
}

export default remove
