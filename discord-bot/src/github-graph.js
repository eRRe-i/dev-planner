import { config } from "dotenv"

config();
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

async function getContributions(username) {
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
  `;

  const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
  });

  const data = await response.json();
  return data.data.user.contributionsCollection.contributionCalendar.weeks;
}


  
  export { getContributions }