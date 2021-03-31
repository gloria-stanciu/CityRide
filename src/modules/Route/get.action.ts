import { Request, Response } from 'express'
import { Route } from '../../models/index'

async function getAll(req: Request, res: Response) {
  try {
    const routes = await Route.query()
    return res.status(200).send(routes)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function getById(req: Request, res: Response) {
  try {
    const route = await Route.query()
      .whereComposite(
        ['id', 'feedId', 'agencyId'],
        [req.params.id, req.params.feedId, req.params.agencyId]
      )
      .first()
    if (route === undefined) return res.status(404).send()
    else return res.status(200).send(route)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

export { getAll, getById }
