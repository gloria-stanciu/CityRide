import { Model } from 'objection'
import Payment from './Payment'

export default class Currency extends Model {
  id!: number
  name!: string | null

  payment?: Payment

  static tableName = 'currencies'

  static relationMappings = () => ({
    payment: {
      relation: Model.HasManyRelation,
      modelClass: Payment,
      join: {
        from: 'currencies.id',
        to: 'payments.userId',
      },
    },
  })
}
