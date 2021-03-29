import { Request, Response } from 'express'
import { Trip } from '../../models/index'

async function remove(req: Request, res: Response) {
  try {
    await Trip.query()
      .delete()
      .whereComposite(['id', 'feedId'], [req.params.id, req.params.feedId])
    return res.status(200).send('Trip deleted successfully')
  } catch (err) {
    console.log(err)
    return res.status(500).send(err)
  }
}

export default remove
