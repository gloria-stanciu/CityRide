import { Model, Modifiers } from 'objection'
import User from './User'
import Agency from './Agency'
import Currency from './Currency'

export default class Payment extends Model {
    id!:number
    userId!:number
    agencyId!:string
    fare!:number
    currencyId!:number
    date:Date|null

    user?:User
    agency?:Agency
    currency?:Currency

    static tableName = 'payments'

    static modifiers: Modifiers = {
        idColumn() {
            return 'id'
        } 
    }

    static relationMappings = () => ({
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join:{
                from: 'payments.userId',
                to: 'users.id'
            }
        },
        agency: {
            relation: Model.BelongsToOneRelation,
            modelClass: Agency,
            join:{
                from: 'payments.agencyId',
                to: 'agency.id'
            }
        },
        currency: {
            relation: Model.BelongsToOneRelation,
            modelClass: Currency,
            join:{
                from: 'payments.currencyId',
                to: 'currency.id'
            }
        }
    })
}