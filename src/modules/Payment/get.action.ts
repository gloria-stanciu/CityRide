import { Request, Response } from 'express'
import { Payment } from '../../models/index'

async function getAll(req: Request, res: Response) {
  try {
    const payments = await Payment.query()
    return res.status(200).send(payments)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function getById(req: Request, res: Response) {
  try {
    const payment = await Payment.query().findById(req.params.id)
    if (payment === undefined) return res.status(404).send()
    else return res.status(200).send(payment)
  } catch (err) {
    res.status(500).send(err)
  }
}

export { getAll, getById }
