import { Request, Response } from 'express'
import { Currency } from '../../models/index'

async function getAll(req: Request, res: Response) {
  try {
    const currencies = await Currency.query()
    return res.status(200).send(currencies)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function getById(req: Request, res: Response) {
  try {
    const currency = await Currency.query().findById(req.params.id)
    if (currency === undefined) return res.status(404).send()
    else return res.status(200).send(currency)
  } catch (err) {
    res.status(500).send(err)
  }
}

export { getAll, getById }
