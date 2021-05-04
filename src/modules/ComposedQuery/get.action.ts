import { Request, Response } from 'express'
import { Route } from '../../models/index'

async function filterByVehicles(req: Request, res: Response) {
  try {
    const route = await Route.query()
      .where('type', req.params.type)
      .withGraphFetched(
        'trip(defaultSelects).[stopTime(defaultSelects).[stop(defaultSelects)]]'
      )
    if (route === undefined)
      return res.status(404).send({ message: 'Row not found' })
    else return res.status(200).send(route)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

export { filterByVehicles }
