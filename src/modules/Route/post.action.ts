import { Request, Response } from 'express'
import { Route } from '../../models/index'

async function create(req: Request, res: Response) {
  try {
    await Route.query().insert({
      id: req.body.id,
      feedId: req.body.feedId,
      agencyId: req.body.agencyId,
      shortName: req.body.shortName,
      longName: req.body.longName,
      desc: req.body.desc,
      type: req.body.type,
      url: req.body.url,
      color: req.body.color,
      textColor: req.body.textColor,
    })
    return res.status(200).send('Route created successfully!')
  } catch (err) {
    res.status(500).send(err)
  }
}
export default create
