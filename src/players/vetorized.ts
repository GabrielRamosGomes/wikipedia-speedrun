import { Player } from './player.js'
import { encode, rankList } from '../core/embeddings.js'

class VectorizedPlayer extends Player {
    async chooseNextLink(targetPage: string, links: string[]): Promise<string> {
        const targetEmb = await encode(targetPage)
        const bestIndex = await rankList(targetEmb, links)

        return links[bestIndex]
    }
}

const vectorizedPlayer = new VectorizedPlayer()
export { vectorizedPlayer }
