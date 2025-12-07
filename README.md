# Wikipedia Speedrun

A Wikipedia speedrunning game where AI players navigate from one Wikipedia page to another by following links using semantic similarity.

## 🎮 How It Works

Players start at a Wikipedia page and must reach a target page within a time limit by selecting links. The AI uses machine learning embeddings to choose the most semantically relevant links at each step.

## 📦 Project Structure

This is a **pnpm monorepo** with the following packages:

- [`packages/core`](packages/core) - Core Wikipedia scraping, embeddings, and utilities
- [`packages/players`](packages/players) - Player implementations (base class + AI strategies)
- [`packages/cli`](packages/cli) - Command-line interface for playing games

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Play a single game
pnpm play --start "https://en.wikipedia.org/wiki/Duolingo" --end "https://en.wikipedia.org/wiki/Portugal"

# Play multiple games from a configuration file
pnpm batch --file games.json
```
## 📋 Commands

### Single Game
```bash
pnpm play [options]

Options:
  -s, --start <url>         Starting Wikipedia URL
  -e, --end <url>          Target Wikipedia URL
  -m, --max-time <seconds> Maximum time allowed (default: 60)
  -o, --output <filename>  Output JSON file name
  --no-save                Do not save results to file
```

### Batch Mode
```bash
pnpm cli batch [options]

Options:
  -f, --file <path>        Path to JSON file with game configurations
  -m, --max-time <seconds> Default maximum time per game (default: 60)
  -o, --output <filename>  Output JSON file name
  --no-save                Do not save results to file
```

## 📊 Results

Game results are saved as JSON files in the [`results/`](results/) directory with the following structure:

```json
{
  "start_link": "https://en.wikipedia.org/wiki/Duolingo",
  "end_link": "https://en.wikipedia.org/wiki/Portugal",
  "path": ["...", "..."],
  "success": true,
  "timeTaken": 12.5,
  "averageTimePerStep": 2.5,
  "name": "Vectorized Player"
}
```

## 📄 License

MIT License - see [LICENSE](LICENSE)