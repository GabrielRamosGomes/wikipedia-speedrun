# @wiki-speedrun/players

Player implementations for the Wikipedia Speedrun game. Provides base player class and AI strategy implementations.

## 📁 Folder Structure

```
src/
├── player.ts              # Abstract base Player class
├── vectorized.ts          # VectorizedPlayer implementation
└── index.ts               # Package exports
```

### [`src/player.ts`](src/player.ts)
Abstract base class that handles the core game loop logic. All player implementations must extend this class and implement the `chooseNextLink` method.

### [`src/vectorized.ts`](src/vectorized.ts)
**VectorizedPlayer** - AI player that uses semantic embeddings to choose links.

## 🎮 Available Players

### VectorizedPlayer
The current AI implementation that navigates Wikipedia using semantic similarity. It encodes text into vectors and chooses the most relevant link at each step based on cosine similarity to the target page.

## 🛠️ Creating Custom Players

Extend the `Player` base class and implement the `chooseNextLink(targetPage: string, links: string[]): Promise<string>` method with your own strategy.

