import { Request, Response } from 'express'
import { Currency } from '../../models/index'

async function create(req: Request, res: Response) {
  try {
    await Currency.query().insert({
      name: req.body.name,
    })
    return res.status(200).send('Currency created successfully!')
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}
export default create
