import { Model, Modifiers } from 'objection'
import Feed from './Feed'
import Service from './Service'


export default class CalendarDate extends Model {
    id!:string
    feedId!:string
    serviceId:string
    dateTime!:Date
    exceptionDate!:number

    feed?:Feed
    service?:Service

    static tableName='calendarDates'

    static modifiers:Modifiers = {
        idPrimaryKey(){
            return ['id', 'feedId']
        },
        serviceForeignKey() {
            return ['serviceId', 'feedId']
        }
    }
    
    static jsonSchema = {
        type: 'object',
        required: ['id', 'feedId', 'dateTime', 'exceptionDate'],

        properties: {
            id: {type: 'string' },
            feedId: {type: 'string' },
            serviceId: {type: 'string' },
            dateTime: {type: 'date' },
            exceptionDate: {
                type: 'number',
                // https://gtfs.org/reference/static/#calendar_datestxt
                enum: [1, 2]
            },
        },
    }

    static relationMappings = () => ({
        feed: {
            relation: Model.BelongsToOneRelation,
            modelClass: Feed,
            join: {
                from: 'calendarDates.feedId',
                to: 'feeds.id'
            }
        },
        service: {
            relation: Model.BelongsToOneRelation,
            modelClass: Service,
            join: 
                {
                    from: ['calendarDates.serviceId', 'calendarDates.feedId'],
                    to: ['services.id', 'services.feedId']
                },
        }
    })
}