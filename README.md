# ⚔️ AI Game Generator

A dependency-free browser MVP that turns a plain-English game idea into a playable HTML game prototype.

## Features

- No backend
- No API key required
- Mobile-friendly controls
- Canvas-based gameplay
- Enemies, HP, XP, coins and levels
- Difficulty and theme controls
- Exports a standalone `generated-game.html`

## Run locally

Just open `index.html` in a modern browser.

For a local server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Project structure

```text
ai-game-generator/
├── index.html
├── style.css
├── app.js
├── README.md
└── LICENSE
```

## Roadmap

- [ ] Connect an LLM to convert descriptions into richer game specifications
- [ ] Generate multiple game genres
- [ ] Procedural maps
- [ ] Sprite/image generation
- [ ] Sound effects and music
- [ ] Save projects
- [ ] Export ZIP
- [ ] One-click deployment
- [ ] Prompt history
- [ ] AI-generated quests and NPC dialogue

## License

MIT
