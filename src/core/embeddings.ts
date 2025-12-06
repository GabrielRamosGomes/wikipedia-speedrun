import { pipeline, cos_sim } from '@xenova/transformers'

const model = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2')

/**
 * Get the embedding vector for a given text.
 */
export async function encode(text: string): Promise<number[]> {
    const output = await model(text, { pooling: 'mean', normalize: true })
    return Array.from(output.data)
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

    // Compute cosine similarities
    const similarities = summaryEmbeddings.map((emb) => cos_sim(targetEmb, emb))

    // Return index of maximum similarity
    return similarities.indexOf(Math.max(...similarities))
}
