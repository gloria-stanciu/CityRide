import { Model, Modifiers } from 'objection'
import Feed from './Feed'
import Payment from './Payment'
import Route from './Route'


export default class Agency extends Model {
    id!:string
    feedId!:string
    name!:string
    url!:string
    timezone!:string
    lang:string|null
    phone:string|null
    fareUrl:string|null
    email:string|null

    feed?:Feed
    payment?:Payment
    route?:Route

    static tableName='agencies'

    static modifiers:Modifiers = {
        idPrimaryKey(){
            return ['id', 'feedId']
        }
    }

    static relationMappings = () => ({
        feed: {
            relation: Model.BelongsToOneRelation,
            modelClass: Feed,
            join: {
                from: 'agencies.feedId',
                to: 'feeds.id'
            }
        },
        payment: {
            relation: Model.HasManyRelation,
            modelClass: Payment,
            join:{
                from: ['agencies.id', 'agencies.feedId'],
                to: ['payments.agencyId', 'payments.feedId']
            }
        },
        route: {
            relation: Model.HasManyRelation,
            modelClass: Route,
            join:{
                from: ['agencies.id', 'agencies.feedId'],
                to: ['routes.agencyId', 'routes.feedId']
            }
        },
    })
}