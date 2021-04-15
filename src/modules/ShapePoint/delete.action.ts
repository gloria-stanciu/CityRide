import { Request, Response } from 'express'
import { ShapePoint } from '../../models/index'

async function remove(req: Request, res: Response) {
  try {
    await ShapePoint.query().delete().where('id', req.params.id)
    return res.status(200).send('ShapePoint deleted successfully')
  } catch (err) {
    console.log(err)
    return res.status(500).send(err)
  }
}

async function removeAll(req: Request, res: Response) {
  try {
    await ShapePoint.query().delete()
    return res.status(200).send('ShapePoint deleted successfully')
  } catch (err) {
    console.log(err)
    return res.status(500).send(err)
  }
}

export { remove, removeAll }
