import { Request, Response } from 'express'
import { Shape } from '../../models/index'

async function getAll(req: Request, res: Response) {
  try {
    const shapes = await Shape.query()
    return res.status(200).send(shapes)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function getById(req: Request, res: Response) {
  try {
    const shape = await Shape.query()
      .whereComposite(['id', 'feedId'], [req.params.id, req.params.feedId])
      .first()
    if (shape === undefined) return res.status(404).send()
    else return res.status(200).send(shape)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

export { getAll, getById }
