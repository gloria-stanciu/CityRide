import { Request, Response } from 'express'
import { Agency } from '../../models/index'

async function getAll(req: Request, res: Response) {
  try {
    const agencies = await Agency.query()
    return res.status(200).send(agencies)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function getById(req: Request, res: Response) {
  try {
    const agency = await Agency.query().findById(req.params.id)
    if (agency === undefined) return res.status(404).send()
    else return res.status(200).send(agency)
  } catch (err) {
    res.status(500).send(err)
  }
}

export { getAll, getById }
