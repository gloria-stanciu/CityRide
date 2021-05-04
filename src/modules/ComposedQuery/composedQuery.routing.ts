import { routesByType } from './get.action'

import { Router } from 'express'
const calendarDatesRouter = Router()

calendarDatesRouter.get('/routesByType/:type', routesByType)

export default calendarDatesRouter
