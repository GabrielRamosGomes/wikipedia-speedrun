import { Player } from './player.js'
import { encode, rankList, getPageTitleFromUrl } from '@wiki-speedrun/core'
import type { GameResult } from '@wiki-speedrun/core'

export class VectorizedPlayer extends Player {
    constructor(name?: string) {
        super(name ?? 'Vectorized Player')
    }

    private targetEmbedding: number[] | null = null

    async chooseNextLink(targetPage: string, links: string[]): Promise<string> {
        const target = getPageTitleFromUrl(targetPage)
        if (!this.targetEmbedding) {
            this.targetEmbedding = await encode(target)
        }

        const normalizedLinks = links.map((link) => getPageTitleFromUrl(link))

        const bestIndex = await rankList(this.targetEmbedding, normalizedLinks)

        return links[bestIndex]
    }

    async play(startPage: string, targetPage: string, maxTime: number = 60): Promise<GameResult> {
        this.targetEmbedding = null
        return super.play(startPage, targetPage, maxTime)
    }
}
