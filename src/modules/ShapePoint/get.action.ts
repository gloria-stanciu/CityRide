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
    if (shapePoint === undefined) return res.status(404).send()
    else return res.status(200).send(shapePoint)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

export { getAll, getById }
