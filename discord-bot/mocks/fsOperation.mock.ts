import { UserMappingManager } from '../src/userMappingManager'

const user = UserMappingManager.getUserByAuthorId('426061182856593408')
// console.log(user)

const data = UserMappingManager.loadData()
// console.log(data)

UserMappingManager.editUser('426061182856593408', 'LsBDev')
