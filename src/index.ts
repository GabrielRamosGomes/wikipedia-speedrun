import { printGameResult, saveJsonResult } from './core/reporters.js'
import { VectorizedPlayer } from './players/vectorized.js'

const START_URL = 'https://en.wikipedia.org/wiki/Elon_Musk'
const END_URL = 'https://en.wikipedia.org/wiki/Tajikistan'

async function main() {
    const player_1 = new VectorizedPlayer('Vectorized Player 1')
    const game1 = await player_1.play(START_URL, END_URL)
    // const game2 = await player_1.play(
    //     'https://en.wikipedia.org/wiki/Duolingo',
    //     'https://pt.wikipedia.org/wiki/Afonso_Henriques'
    // )

    const results = [game1]

    // Game Summaries
    const fileName = `${Date.now()}_${player_1.name.replace(/\s+/g, '_').toLowerCase()}.json`
    saveJsonResult(fileName, results)
    printGameResult(results)
}

main()
