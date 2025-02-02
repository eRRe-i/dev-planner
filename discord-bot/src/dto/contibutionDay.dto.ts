export class ContributionDayDTO {
  color: string
  contributionCount: number
  date: string
  weekday: number
}

export class ContributionWeeksDTO {
  contributionDays: ContributionDayDTO[]
}
