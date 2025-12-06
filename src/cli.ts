#!/usr/bin/env node
import { readFileSync } from 'fs'
import { printGameResult, saveJsonResult } from './core/reporters.js'
import { VectorizedPlayer } from './players/vectorized.js'
import { Command } from 'commander'

const START_URL = 'https://en.wikipedia.org/wiki/Duolingo'
const END_URL = 'https://en.wikipedia.org/wiki/Portugal'

const program = new Command()

program
    .name('wikipedia-speedrun')
    .description('A Wikipedia Speedrunning Game using different player strategies.')
    .version('1.0.0')

program
    .command('play')
    .description('Play a game from start URL to end URL.')
    .option('-s, --start <url>', 'Starting Wikipedia URL', START_URL)
    .option('-e, --end <url>', 'Target Wikipedia URL', END_URL)
    .option('-m, --max-time <seconds>', 'Maximum time allowed (in seconds)', '60')
    .option('-o, --output <filename>', 'Output JSON file name')
    .option('--no-save', 'Do not save results to file')
    .action(async (options) => {
        const { start, end, maxTime, output, save } = options
        const player = new VectorizedPlayer('Vectorized Player')

        const result = await player.play(start, end, parseInt(maxTime))

        await printGameResult([result])

        if (save) {
            const filename =
                output || `${Date.now()}_${player.name.replace(/\s+/g, '_').toLowerCase()}.json`
            saveJsonResult(filename, [result])
        }
    })

program
    .command('batch')
    .description('Play multiple games in batch mode from a JSON file.')
    .requiredOption('-f, --file <path>', 'Path to JSON file with game configurations', 'games.json')
    .option('-m, --max-time <seconds>', 'Default maximum time per game (in seconds)', '60')
    .option('-o, --output <filename>', 'Output JSON file name')
    .option('--no-save', 'Do not save results to file')
    .action(async (options) => {
        const { file, maxTime, output, save } = options

        let games
        try {
            const fileContent = readFileSync(file, 'utf-8')
            games = JSON.parse(fileContent)
        } catch (err) {
            console.error(`❌ Error reading file ${file}:`, err)
            process.exit(1)
        }

        if (!Array.isArray(games)) {
            console.error('❌ JSON file must contain an array of game configurations')
            process.exit(1)
        }

        const player = new VectorizedPlayer('Vectorized Player')
        const results = []

        for (let i = 0; i < games.length; i++) {
            const game = games[i]
            const gameMaxTime = game.maxTime || parseInt(maxTime)

            const result = await player.play(game.start, game.end, gameMaxTime)
            results.push(result)
        }

        await printGameResult(results)

        if (save) {
            const filename =
                output || `${Date.now()}_${player.name.replace(/\s+/g, '_').toLowerCase()}.json`
            saveJsonResult(filename, results)
        }
    })

program.parse()
