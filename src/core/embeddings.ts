import { pipeline, cos_sim } from '@xenova/transformers'

const model = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2')
const embeddingCache = new Map<string, number[]>()

/**
 * Get the embedding vector for a given text.
 */
export async function encode(text: string): Promise<number[]> {
    if (embeddingCache.has(text)) {
        return embeddingCache.get(text)!
    }

    const output = await model(text, { pooling: 'mean', normalize: true })
    const embedding = Array.from(output.data)
    embeddingCache.set(text, embedding)

    return embedding
}

/**
 * Rank a list of text summaries based on their similarity to a target embedding.
 * Returns the index of the most similar summary.
 */
export async function rankList(targetEmb: number[], summaries: string[]) {
    // Get embeddings for all summaries
    // const start = Date.now()
    const summaryEmbeddings = await Promise.all(
        summaries.map(async (summary) => await encode(summary))
    )
    // const end = Date.now()
    // console.log(`Encoded ${summaries.length} summaries in ${(end - start) / 1000}s`)

    // Compute cosine similarities
    // const startSim = Date.now()
    const similarities = summaryEmbeddings.map((emb) => cos_sim(targetEmb, emb))
    // const endSim = Date.now()
    // console.log(`Computed similarities in ${(endSim - startSim) / 1000}s`)

    // Return index of maximum similarity
    return similarities.indexOf(Math.max(...similarities))
}
