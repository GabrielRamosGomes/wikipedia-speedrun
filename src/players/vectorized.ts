import { GameResult, Player } from './player.js'
import { encode, rankList } from '../core/embeddings.js'

export class VectorizedPlayer extends Player {
    private targetEmbedding: number[] | null = null

    async chooseNextLink(targetPage: string, links: string[]): Promise<string> {
        const target = this.normalizeLink(targetPage)
        if (!this.targetEmbedding) {
            this.targetEmbedding = await encode(target)
        }

        const normalizedLinks = links.map((link) => this.normalizeLink(link))

        const bestIndex = await rankList(this.targetEmbedding, normalizedLinks)

        return links[bestIndex]
    }

    async play(startPage: string, targetPage: string, maxTime: number = 60): Promise<GameResult> {
        this.targetEmbedding = null
        return super.play(startPage, targetPage, maxTime)
    }
}
