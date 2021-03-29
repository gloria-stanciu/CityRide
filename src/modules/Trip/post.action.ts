import { Request, Response } from 'express'
import { Trip } from '../../models/index'

async function create(req: Request, res: Response) {
  try {
    await Trip.query().insert({
      id: req.body.id,
      feedId: req.body.feedId,
      routeId: req.body.routeId,
      serviceId: req.body.serviceId,
      headsign: req.body.headsign,
      shortName: req.body.shortName,
      directionId: req.body.directionId,
      blockId: req.body.blockId,
      shapeId: req.body.shapeId,
      wheelchairAccessible: req.body.wheelchairAccessible,
      bikesAllowed: req.body.bikesAllowed,
      isVisible: req.body.isVisible,
    })
    return res.status(200).send('Trip created successfully!')
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}
export default create
