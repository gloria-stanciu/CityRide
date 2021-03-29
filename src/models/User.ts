import { Model } from 'objection'
import Payment from './Payment'

export default class User extends Model {
  id!: number
  firstName!: string
  lastName!: string
  phoneNumber!: string
  password!: string
  isConfirmed: boolean
  isAdmin: boolean

  payment?: Payment

  static tableName = 'users'

  static relationMappings = () => ({
    payment: {
      relation: Model.HasManyRelation,
      modelClass: Payment,
      join: {
        from: 'users.id',
        to: 'payments.userId',
      },
    },
  })
}
