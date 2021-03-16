import { Model, Modifiers } from 'objection'
import Feed from './Feed'
import Service from './Service'


export default class Calendar extends Model {
    id!:string
    feedId!:string
    serviceId:string|null
    desc:string|null
    monday!:boolean
    tuesday!:boolean
    wednesday!:boolean
    thursday!:boolean
    friday!:boolean
    saturday!:boolean
    sunday!:boolean
    startDate!:Date
    endDate!:Date

    feed?:Feed
    service?:Service

    static tableName='calendars'

    static modifiers:Modifiers = {
        idPrimaryKey() {
            return ['id', 'feedId']
        },
        serviceForeignKey() {
            return ['serviceId', 'feedId']
        }
    }   

    static relationMappings = () => ({
        feed: {
            relation: Model.BelongsToOneRelation,
            modelClass: Feed,
            join: {
                from: 'calendars.feedId',
                to: 'feeds.id'
            }
        },
        service: {
            relation: Model.BelongsToOneRelation,
            modelClass: Service,
            join: {
                from: ['calendars.serviceId', 'calendars.feedId'],
                to: ['services.id', 'services.feedId']
            }
        }
    })
}