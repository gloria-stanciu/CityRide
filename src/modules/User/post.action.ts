import { Request, Response } from 'express'
import { User } from '../../models/index'

async function create(req: Request, res: Response) {
  try {
    await User.query().insert({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
    })
    return res.status(200).send('User created successfully!')
  } catch (err) {
    res.status(500).send(err)
  }
}
export default create
