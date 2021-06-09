import { Request, Response } from 'express'
import { ShapePoint } from '../../models/index'

async function getAll(req: Request, res: Response) {
  try {
    const shapePoints = await ShapePoint.query()
    return res.status(200).send(shapePoints)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function getById(req: Request, res: Response) {
  try {
    const shapePoint = await ShapePoint.query()
      .where('id', req.params.id)
      .first()
    if (shapePoint === undefined)
      return res.status(404).send({ message: 'Row not found' })
    else return res.status(200).send(shapePoint)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

async function getByLatLong(req: Request, res: Response) {
  try {
    const shapePoint = await ShapePoint.query()
      .whereComposite(['lat', 'long'], [req.params.lat, req.params.long])
      .first()
    if (shapePoint === undefined)
      return res.status(404).send({ message: 'Row not found' })
    else return res.status(200).send(shapePoint)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

async function getByShapeId(req: Request, res: Response) {
  try {
    const shapePoints = await ShapePoint.query()
      .where('shapeId', req.params.shapeId)
      .select('long', 'lat')
    const output = shapePoints.map(function (point) {
      return Object.keys(point).map(function (key) {
        return parseFloat(point[key])
      })
    })
    if (shapePoints === undefined)
      return res.status(404).send({ message: 'Rows not found' })
    else return res.status(200).send(output)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

export { getAll, getById, getByLatLong, getByShapeId }
