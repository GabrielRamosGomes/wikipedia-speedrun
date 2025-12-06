import { GameResult, Player } from './player.js'
import { encode, rankList } from '../core/embeddings.js'

export class VectorizedPlayer extends Player {
    private targetEmbedding: number[] | null = null

    async chooseNextLink(targetPage: string, links: string[]): Promise<string> {
        if (!this.targetEmbedding) {
            this.targetEmbedding = await encode(targetPage)
        }

        // Only get the word after /wiki
        const normalizedLinks = links.map((link) => link.split('/wiki/')[1])

        const bestIndex = await rankList(this.targetEmbedding, normalizedLinks)

        return links[bestIndex]
    }

    // Reset cache when starting new game
    async play(startPage: string, targetPage: string, maxTime: number = 60): Promise<GameResult> {
        this.targetEmbedding = null // Reset cache
        return super.play(startPage, targetPage, maxTime)
    }
}
