import { Request, Response } from 'express'
import { ShapePoint } from '../../models/index'

async function create(req: Request, res: Response) {
  try {
    await ShapePoint.query().insert({
      id: req.body.id,
      shapeId: req.body.shapeId,
      lat: req.body.lat,
      long: req.body.long,
      sequence: req.body.sequence,
      shapeDistTraveled: req.body.shapeDistTraveled,
    })
    return res.status(200).send('ShapePoint created successfully!')
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}
export default create
