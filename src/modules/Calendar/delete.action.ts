import { Request, Response } from 'express'
import { Calendar } from '../../models/index'

async function remove(req: Request, res: Response) {
  try {
    await Calendar.query()
      .delete()
      .whereComposite(['id', 'feedId'], [req.params.id, req.params.feedId])
    return res.status(200).send('Calendar deleted successfully')
  } catch (err) {
    console.log(err)
    return res.status(500).send(err)
  }
}

export default remove
