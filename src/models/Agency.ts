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

    static tableName='agency'

    static modifiers:Modifiers = {
        idColumn(){
            return ['id', 'feedId']
        }
    }

    static relationMappings = () => ({
        feed: {
            relation: Model.BelongsToOneRelation,
            modelClass: Feed,
            join: {
                from: 'agency.feedId',
                to: 'feed.id'
            }
        },
        payment: {
            relation: Model.HasManyRelation,
            modelClass: Payment,
            join:{
                from: 'agency.id',
                to: 'payments.agencyId'
            }
        },
        route: {
            relation: Model.HasManyRelation,
            modelClass: Route,
            join:{
                from: 'agency.id',
                to: 'routes.agencyId'
            }
        },
    })
}