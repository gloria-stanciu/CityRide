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

    static tableName='calendar'

    static modifiers:Modifiers = {
        idColumn() {
            return ['id', 'feedId']
        } 
    }   

    static relationMappings = () => ({
        feed: {
            relation: Model.BelongsToOneRelation,
            modelClass: Feed,
            join: {
                from: 'calendars.feedId',
                to: 'feed.id'
            }
        },
        service: {
            relation: Model.BelongsToOneRelation,
            modelClass: Service,
            join: {
                from: 'calendars.serviceId',
                to: 'service.id'
            }
        }
    })
}