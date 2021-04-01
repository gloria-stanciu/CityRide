import { Request, Response } from 'express'
import { ShapePoint } from '../../models/index'

async function update(req: Request, res: Response) {
  try {
    await ShapePoint.query().whereComposite(
      ['lat', 'long'],
      [req.params.lat, req.params.long]
    )

    return res.status(200).send('ShapePoint updated successfully')
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

export default update
