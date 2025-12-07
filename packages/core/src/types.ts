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
