import { Request, Response } from 'express'
import { Route } from '../../models/index'

async function remove(req: Request, res: Response) {
  try {
    await Route.query().deleteById([
      req.params.id,
      req.params.feedId,
      req.params.agencyId,
    ])
    return res.status(200).send('Route deleted successfully')
  } catch (err) {
    return res.status(500).send(err)
  }
}

export default remove
