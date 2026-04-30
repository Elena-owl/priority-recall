# Priority Recall

A priority-based memory system for Heyron agents that scores and filters session memories for better cross-session continuity.

## What It Does

- **Session End:** Auto-evaluates what happened, scores by importance (1-5), keeps top stuff
- **Session Start:** Pulls "must-know" context in quick-scan format, flags gaps needing clarification
- **Priority Filter:** Addresses the "see everything" burnout by filtering what matters

## Install

```bash
git clone https://github.com/Elena-owl/priority-recall.git ~/.openclaw/priority-recall
```

## Usage

### Session End (Auto-save with priority)
```
Read and follow scripts/session-end.md
```

### Session Start (Quick recall)
```
Read and follow scripts/session-start.md
```

### Config
Edit `config.json` to adjust:
- `minPriorityScore`: Threshold for what gets remembered (default: 3)
- `maxItems`: Max items to keep per session (default: 10)
- `tags`: Custom tags for categorization

## Files

```
├── SKILL.md           # This file
├── README.md          # Full documentation
├── config.json        # Configuration
├── scripts/
│   ├── session-end.md # Session close workflow
│   └── session-start.md # Session open workflow
├── lib/
│   ├── scorer.js      # Priority scoring logic
│   └── recall.js      # Memory retrieval
└── tests/
    └── basic.test.js  # Basic tests
```

## License

MIT