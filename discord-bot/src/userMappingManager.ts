import * as fs from 'fs'
import * as path from 'path'
import { UserDTO } from '../src/dto/user.dto'
import { GithubAPIHandler } from '../src/githubAPIhandler'

export class UserMappingManager {
  static DATA_FILE_PATH = path.join(__dirname, 'data/githubUsers.json')

  static loadData() {
    if (fs.existsSync(this.DATA_FILE_PATH)) {
      const data = fs.readFileSync(this.DATA_FILE_PATH, 'utf-8')
      return JSON.parse(data)
    }
    return {}
  }

  static saveData(data: UserDTO[]) {
    fs.writeFileSync(this.DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8')
  }

  static getUserByAuthorId(discordAuthorId: string) {
    const userList = this.loadData()

    const user: UserDTO = userList.find((item: UserDTO) => item.discordAuthorId === discordAuthorId)

    if (!user) {
      return undefined
    }

    return user
  }

  static editUser(discordAuthorId: string, githubName: string) {
    const user: UserDTO = this.getUserByAuthorId(discordAuthorId)
    if (!user) {
      throw new Error(
        'Usuário não está registrado. Registre-se primeiro usando !resgister <github name>',
      )
    }
    console.log(user)
    const githubUserExists = GithubAPIHandler.checkIfGitHubUserExists(githubName)

    if (!githubUserExists) {
      throw new Error('Usuário de Github não existe. Verifique se o usuário passado foi o correto.')
    }

    const users: UserDTO[] = this.loadData()

    if (!users) {
      return undefined
    }

    const editedUsers = users.map((user) => {
      console.log(user.discordAuthorId)
      console.log(discordAuthorId)
      if (user.discordAuthorId === discordAuthorId) {
        return { ...user, githubName: githubName }
      }
      return user
    })
    console.log(JSON.stringify(editedUsers))
    this.saveData(editedUsers)
  }

  static registerUser(authorId: string) {}
}
