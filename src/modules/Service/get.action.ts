import { Request, Response } from 'express'
import { Service } from '../../models/index'

async function getAll(req: Request, res: Response) {
  try {
    const services = await Service.query()
    return res.status(200).send(services)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function getById(req: Request, res: Response) {
  try {
    const service = await Service.query()
      .whereComposite(['id', 'feedId'], [req.params.id, req.params.feedId])
      .first()
    return res.status(200).send(service)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

export { getAll, getById }
