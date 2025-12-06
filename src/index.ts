import { vectorizedPlayer } from './players/vetorized.js'

const START_URL = 'https://en.wikipedia.org/wiki/Cristiano_Ronaldo'
const END_URL = 'https://en.wikipedia.org/wiki/Artificial_intelligence'

async function main() {
    const result = await vectorizedPlayer.play(START_URL, END_URL)

    vectorizedPlayer.printGameResult(result)
}

main()
