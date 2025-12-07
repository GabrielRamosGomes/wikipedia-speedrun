import { GameResult } from '../types'
import { writeFileSync } from 'fs'

export async function printGameResult(results: GameResult[]) {
    results.forEach((result) => {
        const totalSteps = result.path.length - 1
        const statusEmoji = result.success ? '✅' : '❌'

        const normalizedPath = result.path.map((url) =>
            url.replace('https://en.wikipedia.org/wiki/', '')
        )

        console.log('\n' + '='.repeat(50))
        console.log('🎮 GAME RESULT')
        console.log('='.repeat(50))
        console.log(`${statusEmoji} Status: ${result.success ? 'SUCCESS' : 'FAILED'}`)
        console.log(`🔗 Total Steps: ${totalSteps}`)
        console.log(`⏱️  Total Time: ${result.timeTaken.toFixed(2)}s`)
        console.log(`⚡ Avg Time/Step: ${result.averageTimePerStep.toFixed(2)}s`)
        console.log(`📍 Path: ${normalizedPath.join(' → ')}`)
        console.log('='.repeat(50) + '\n')
    })
}

export function saveJsonResult(filePath: string, results: GameResult[]) {
    const jsonContent = JSON.stringify(results, null, 2)

    try {
        writeFileSync(filePath, jsonContent)
        console.log(`💾 Game results saved to ${filePath}`)
    } catch (err) {
        console.error('❌ Error saving game result:', err)
    }
}
