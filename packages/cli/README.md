# @wiki-speedrun/cli

Command-line interface for playing Wikipedia Speedrun games.

## 📁 Folder Structure

```
src/
├── cli.ts                 # CLI commands and argument parsing
└── index.ts               # Package entry point
```

### [`src/cli.ts`](src/cli.ts)
Main CLI implementation using Commander.js. Defines two commands:

- **`play`** - Run a single Wikipedia speedrun game
- **`batch`** - Run multiple games from a JSON configuration file

## 📋 Available Commands

### `play`
Play a single game from a start Wikipedia URL to an end URL with optional time limits and result saving.

### `batch`
Play multiple games defined in a JSON configuration file (default: `games.json`). Useful for running benchmarks or testing different start/end combinations.

## 💾 Results

Results are automatically saved to the `results/` directory as timestamped JSON files containing the game path, success status, timing metrics, and player information.

## 🎮 Current Player

Uses **VectorizedPlayer** from `@wiki-speedrun/players` which employs semantic embeddings for intelligent link selection.