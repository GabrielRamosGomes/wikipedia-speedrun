import { getAllValidLinks, getPageTitleFromUrl, encode, cos_sim } from '@wiki-speedrun/core'
import type { GameResult } from '@wiki-speedrun/core'
import { Player } from './player'

interface Node {
    url: string
    g: number // Cost from start to current node (depth/steps taken)
    h: number // Heuristic cost estimate to goal
    f: number // Total cost (g + h)
    parent: Node | null
    visited: boolean
}

export class AStarPlayer extends Player {
    constructor(name?: string) {
        super(name ?? 'A* Player')
    }

    async chooseNextLink(currentPage: string, links: string[]): Promise<string> {
        console.log('Choosing next link using A* algorithm')
        return ''
    }

    private async calculateHeuristic(currentPage: string, targetPage: string): Promise<number> {
        const currentTitle = getPageTitleFromUrl(currentPage)
        const targetTitle = getPageTitleFromUrl(targetPage)

        const currentEmbedding = await encode(currentTitle)
        const targetEmbedding = await encode(targetTitle)

        const similarity = cos_sim(currentEmbedding, targetEmbedding)

        // Heuristic is inversely proportional to similarity
        return 1 - similarity
    }
}
