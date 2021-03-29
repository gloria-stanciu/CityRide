import { Request, Response } from 'express'
import { Stop } from '../../models/index'

async function create(req: Request, res: Response) {
  try {
    await Stop.query().insert({
      id: req.body.id,
      feedId: req.body.feedId,
      code: req.body.code,
      name: req.body.name,
      desc: req.body.desc,
      lat: req.body.lat,
      long: req.body.long,
      zoneId: req.body.zoneId,
      stopUrl: req.body.stopUrl,
      locationType: req.body.locationType,
      parentStation: req.body.parentStation,
      stopTimezone: req.body.stopTimezone,
      wheelchairBoarding: req.body.wheelchairBoarding,
    })
    return res.status(200).send('Stop created successfully!')
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}
export default create
