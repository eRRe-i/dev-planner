import { config } from 'dotenv'
import { createCanvas } from 'canvas'
import { ContributionDayDTO, ContributionWeeksDTO } from './dto/contibutionDay.dto'

config()
const GITHUB_TOKEN = process.env.GITHUB_TOKEN

function generateImage(weeks: Array<ContributionWeeksDTO>) {
  const squareSize = 15
  const gapSize = 2
  const margin = 5
  const canvasWidth = 53 * (squareSize + gapSize) + 2 * margin
  const canvasHeight = 7 * (squareSize + gapSize) + 60 + 2 * margin

  const canvas = createCanvas(canvasWidth, canvasHeight)
  const ctx = canvas.getContext('2d')

  const defaultColor = 'rgba(235, 237, 240, 0.15)'
  const textColor = '#FFFFFF'
  const legendColors = [defaultColor, '#9be9a8', '#40c463', '#30a14e', '#216e39']

  const cyanShades = ['#6c7171', '#81d4fa', '#4fc3f7', '#29b6f6', '#0288d1']

  let lastDay: ContributionDayDTO

  weeks.slice(-53).forEach((week, i) => {
    week.contributionDays.forEach((day, j) => {
      const x = i * (squareSize + gapSize) + margin
      const y = j * (squareSize + gapSize) + 20 + margin

      let bgColor = day.contributionCount > 0 ? day.color : defaultColor

      if (!lastDay || new Date(day.date) > new Date(lastDay.date)) {
        lastDay = day
      }

      ctx.fillStyle = bgColor
      ctx.fillRect(x, y, squareSize, squareSize)
    })
  })

  if (lastDay!) {
    const lastWeekIndex = weeks.length - 1
    const lastDayIndex = weeks[lastWeekIndex].contributionDays.findIndex(
      (day) => day.date === lastDay.date,
    )

    if (lastDayIndex !== -1) {
      const x = lastWeekIndex * (squareSize + gapSize) + margin
      const y = lastDayIndex * (squareSize + gapSize) + 20 + margin

      ctx.fillStyle =
        lastDay.contributionCount > 0
          ? cyanShades[Math.min(lastDay.contributionCount, cyanShades.length - 1)]
          : cyanShades[0]

      ctx.fillRect(x, y, squareSize, squareSize)
    }
  }

  const months = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ]
  const orgMonths: Array<number> = []
  const date = new Date()
  const currentMonth: number = date.getMonth()
  for (let i = 0; i < 12; i++) {
    orgMonths.push((currentMonth + 1 + i) % 12)
  }
  const monthPositions = [0, 4, 9, 13, 18, 22, 27, 31, 36, 40, 45, 49]

  ctx.fillStyle = textColor
  ctx.font = '14px Arial'
  ctx.textAlign = 'center'

  monthPositions.forEach((pos, index) => {
    const x = pos * (squareSize + gapSize) + squareSize / 2 + margin
    const y = 15 + margin
    ctx.fillText(months[orgMonths[index]], x, y)
  })

  ctx.font = '14px Arial'
  ctx.textAlign = 'left'

  const legendSquareSize = 15
  const legendGap = 5
  const legendX = margin
  const legendY = canvasHeight - 30

  ctx.fillStyle = textColor
  ctx.fillText('Menos', legendX, legendY + 12)

  legendColors.forEach((color, i) => {
    ctx.fillStyle = color
    ctx.fillRect(
      legendX + 50 + i * (legendSquareSize + legendGap),
      legendY,
      legendSquareSize,
      legendSquareSize,
    )
  })

  ctx.fillStyle = textColor
  ctx.fillText(
    'Mais',
    legendX + 50 + legendColors.length * (legendSquareSize + legendGap) + 10,
    legendY + 12,
  )

  return canvas.toBuffer('image/png')
}

export { generateImage }
