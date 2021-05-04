import { filterByVehicles } from './get.action'

import { Router } from 'express'
const calendarDatesRouter = Router()

calendarDatesRouter.get('/filterByVehicles/:type', filterByVehicles)

export default calendarDatesRouter
