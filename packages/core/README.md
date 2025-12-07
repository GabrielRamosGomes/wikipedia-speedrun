# @wiki-speedrun/core

Core functionality package for the Wikipedia Speedrun game. Provides Wikipedia scraping, text embeddings, and result reporting utilities.

## 📁 Folder Structure

```
src/
├── wikipedia/
│   └── wikipedia.ts       # Wikipedia page fetching and link extraction
├── embeddings/
│   └── embeddings.ts      # Semantic text encoding and similarity ranking
├── reporters/
│   └── reporters.ts       # Game result output and JSON persistence
├── types.ts               # TypeScript interfaces (GameResult, etc.)
└── index.ts               # Main package entry point
```

## 🧠 Key Features

- Wikipedia page scraping with link extraction
- Semantic text embeddings for similarity comparison
- Result reporting and JSON persistence