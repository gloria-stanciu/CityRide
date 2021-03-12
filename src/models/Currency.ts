import { Model, Modifiers } from 'objection'
import Payment from './Payment'

export default class Currency extends Model {
    id!:number|null
    currency!:string|null

    payment?:Payment

    static tableName='currency'

    static modifiers: Modifiers = {
        idColumn() {
            return 'id'
        } 
    }

    static relationMappings = () => ({
        payment: {
            relation: Model.HasManyRelation,
            modelClass: Payment,
            join: {
                from: 'currency.id',
                to: 'payments.userId'
            }
        }
    })
}