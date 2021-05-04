import { Request, Response } from 'express'
import { Route } from '../../models/index'

async function filterByVehicles(req: Request, res: Response) {
  try {
    await Route.query()
      .where('type', req.params.type)
      .withGraphFetched(
        'trip(defaultSelects).[shape.[shapePoint(defaultSelects)], stopTime(defaultSelects).[stop(defaultSelects)]]'
      )
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

export { filterByVehicles }
