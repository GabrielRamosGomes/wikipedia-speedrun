import { getAllValidLinks } from '../wikipedia.js'

export type GameResult = {
    start_link: string
    end_link: string
    path: string[]
    success: boolean
    timeTaken: number // in seconds
    averageTimePerStep: number // in seconds
    name: string
    description?: string
}

export abstract class Player {
    public name: string = 'Base Player'

    constructor(name: string) {
        this.name = name
    }

    abstract chooseNextLink(targetPage: string, links: string[]): Promise<string>

    async play(startPage: string, targetPage: string, maxTime: number = 60): Promise<GameResult> {
        let current = startPage
        const visited: string[] = []

        const baseGameResult: Partial<GameResult> = {
            start_link: startPage,
            end_link: targetPage,
            name: this.name
        }

        const startTime = Date.now()
        const maxTimeMs = maxTime * 1000

        while (current !== targetPage) {
            if (Date.now() - startTime > maxTimeMs) {
                const endTime = Date.now()

                const { timeTaken, averageTimePerStep } = this.calculateTimeMetrics(
                    startTime,
                    endTime,
                    visited.length
                )

                return {
                    ...baseGameResult,
                    path: visited,
                    success: false,
                    timeTaken,
                    averageTimePerStep,
                    description: 'Time limit exceeded'
                } as GameResult
            }

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

                return {
                    ...baseGameResult,
                    path: visited,
                    success: false,
                    timeTaken,
                    averageTimePerStep
                } as GameResult
            }

            current = await this.chooseNextLink(targetPage, availableLinks)
        }

        const endTime = Date.now()
        visited.push(targetPage)
        console.log('FOUND:', targetPage)

        const { timeTaken, averageTimePerStep } = this.calculateTimeMetrics(
            startTime,
            endTime,
            visited.length
        )

        return {
            ...baseGameResult,
            path: visited,
            success: true,
            timeTaken,
            averageTimePerStep
        } as GameResult
    }

    private calculateTimeMetrics(startTime: number, endTime: number, steps: number) {
        const timeTaken = (endTime - startTime) / 1000 // in seconds
        const averageTimePerStep = steps > 0 ? timeTaken / steps : 0
        return { timeTaken, averageTimePerStep }
    }
}
