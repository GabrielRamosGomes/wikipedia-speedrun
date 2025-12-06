import { getAllValidLinks } from '../wikipedia.js'

type Result = {
    path: string[]
    success: boolean
    timeTaken: number // in seconds
    averageTimePerStep: number // in seconds
}

export abstract class Player {
    abstract chooseNextLink(targetPage: string, links: string[]): Promise<string>

    async play(startPage: string, targetPage: string): Promise<Result> {
        let current = startPage
        const visited: string[] = []

        const startTime = Date.now()
        while (current !== targetPage) {
            visited.push(current)
            console.log('Visiting:', current)

            const links = await getAllValidLinks(current)
            const availableLinks = links.filter((link) => !visited.includes(link))

            if (availableLinks.length === 0) {
                const endTime = Date.now()

                const { timeTaken, averageTimePerStep } = this.calculateTimeMetrics(
                    startTime,
                    endTime,
                    visited.length
                )

                return { path: visited, success: false, timeTaken, averageTimePerStep }
            }

            current = await this.chooseNextLink(targetPage, availableLinks)
        }

        const endTime = Date.now()
        visited.push(targetPage)
        console.log('Found:', targetPage)

        const { timeTaken, averageTimePerStep } = this.calculateTimeMetrics(
            startTime,
            endTime,
            visited.length
        )

        return { path: visited, success: true, timeTaken, averageTimePerStep }
    }

    printGameResult(result: Result) {
        const totalSteps = result.path.length - 1
        const statusEmoji = result.success ? '✅' : '❌'

        const normalizedPath = result.path.map((url) =>
            url.replace('https://en.wikipedia.org/wiki/', '')
        )

        console.log('\n' + '='.repeat(50))
        console.log('🎮 GAME RESULT')
        console.log('='.repeat(50))
        console.log(`${statusEmoji} Status: ${result.success ? 'SUCCESS' : 'FAILED'}`)
        console.log(`🔗 Total Steps: ${totalSteps}`)
        console.log(`⏱️  Total Time: ${result.timeTaken.toFixed(2)}s`)
        console.log(`⚡ Avg Time/Step: ${result.averageTimePerStep.toFixed(2)}s`)
        console.log(`📍 Path: ${normalizedPath.join(' → ')}`)
        console.log('='.repeat(50) + '\n')
    }

    private calculateTimeMetrics(startTime: number, endTime: number, steps: number) {
        const timeTaken = (endTime - startTime) / 1000 // in seconds
        const averageTimePerStep = steps > 0 ? timeTaken / steps : 0
        return { timeTaken, averageTimePerStep }
    }
}
