import { pipeline, cos_sim } from '@huggingface/transformers'

const model = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', {
    dtype: 'fp32',
    device: 'cpu'
})
const embeddingCache = new Map<string, number[]>()

/**
 * Get the embedding vector for a given text.
 */
export async function encode(text: string): Promise<number[]> {
    if (embeddingCache.has(text)) {
        return embeddingCache.get(text)!
    }

    const output = await model(text, { pooling: 'mean', normalize: true })
    const list = output.tolist() as number[][]

    embeddingCache.set(text, list[0])

    return list[0]
}

/**
 * Rank a list of text summaries based on their similarity to a target embedding.
 * Returns the index of the most similar summary.
 */
export async function rankList(targetEmb: number[], summaries: string[]) {
    // Get embeddings for all summaries
    const summaryEmbeddings = await Promise.all(
        summaries.map(async (summary) => await encode(summary))
    )

    const similarities = summaryEmbeddings.map((emb) => cos_sim(targetEmb, emb))

    // Return index of maximum similarity
    return similarities.indexOf(Math.max(...similarities))
}
