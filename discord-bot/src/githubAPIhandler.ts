import { ContributionDayDTO, ContributionWeeksDTO } from './dto/contibutionDay.dto'
import { config } from 'dotenv'

config()

export class GithubAPIHandler {
  static async checkIfGitHubUserExists(username: string): Promise<boolean> {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
          // Adicione um token de acesso pessoal (opcional, mas recomendado para evitar limites de taxa)
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      })
      // Se o status for 200, o usuário existe
      if (response.status === 200) {
        return true
      }

      // Se o status for 404, o usuário não existe
      if (response.status === 404) {
        return false
      }

      // Outros status podem indicar erros na requisição
      throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`)
    } catch (error) {
      console.error('Erro ao verificar usuário:', error)
      return false
    }
  }
  static async getContributions(username: string): Promise<Array<ContributionWeeksDTO>> {
    const query = `
          query {
            user(login: "${username}") {
              contributionsCollection {
                contributionCalendar {
                  weeks {
                    contributionDays {
                      color
                      contributionCount
                      date
                      weekday
                    }
                  }
                }
              }
            }
          }
        `

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    })

    const data = await response.json()
    return data.data.user.contributionsCollection.contributionCalendar.weeks
  }

  async getAuthenticatedUserInfo({ token }: { token: string }): Promise<string | null> {
    try {
      const response = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      })

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`)
      }

      const userData = await response.json()
      return userData.login // Retorna o "githubName" (login) do usuário
    } catch (error) {
      console.error('Erro ao obter informações do usuário:', error)
      return null
    }
  }
}
