import userRouter from './User/user.routing'
import agencyRouter from './Agency/agency.routing'
import feedRouter from './Feed/feed.routing'
import currencyRouter from './Currency/currency.routing'
import paymentRouter from './Payment/payment.routing'
import routeRouter from './Route/route.routing'
import serviceRouter from './Service/service.routing'
import shapeRouter from './Shape/shape.routing'
import tripRouter from './Trip/trip.routing'
import shapePointRouter from './ShapePoint/shapePoint.routing'
import calendarRouter from './Calendar/calendar.routing'
import calendarDatesRouter from './CalendarDate/calendarDate.routing'
import stopRouter from './Stop/stop.routing'
import stopTimeRouter from './StopTime/stopTime.routing'
import transferRouter from './Transfer/transfer.routing'
import composedQuery from './ComposedQuery/composedQuery.routing'

import Router from 'express'
const router = Router()

router.use('/users', userRouter) //login and signup not properly craeted
router.use('/agencies', agencyRouter)
router.use('/feeds', feedRouter)
router.use('/currencies', currencyRouter)
router.use('/payments', paymentRouter)
router.use('/routes', routeRouter)
router.use('/services', serviceRouter)
router.use('/shapes', shapeRouter)
router.use('/trips', tripRouter)
router.use('/shapePoints', shapePointRouter)
router.use('/calendars', calendarRouter)
router.use('/calendarDates', calendarDatesRouter)
router.use('/stops', stopRouter)
router.use('/stopTimes', stopTimeRouter)
router.use('/transfers', transferRouter)
router.use('/', composedQuery)

export default router
