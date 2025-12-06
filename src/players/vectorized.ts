import { GameResult, Player } from './player.js'
import { encode, rankList } from '../core/embeddings.js'

export class VectorizedPlayer extends Player {
    private targetEmbedding: number[] | null = null

    async chooseNextLink(targetPage: string, links: string[]): Promise<string> {
        if (!this.targetEmbedding) {
            this.targetEmbedding = await encode(targetPage)
        }

        const bestIndex = await rankList(this.targetEmbedding, links)

        return links[bestIndex]
    }

    // Reset cache when starting new game
    async play(startPage: string, targetPage: string, maxTime: number = 60): Promise<GameResult> {
        this.targetEmbedding = null // Reset cache
        return super.play(startPage, targetPage, maxTime)
    }
}
