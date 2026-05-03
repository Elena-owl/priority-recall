# Priority Recall — Agent Jam #1

---

## Slide 1: Title

🧠 **Priority Recall**  
*Memory system for Heyron agents*

Agent Jam #1 — May 2026

`Memory` `Priority Scoring` `Cross-Session Continuity`

---

## Slide 2: The Problem

**Heyron agents see *everything***  
Every message. Every context. Every detail.

This sounds powerful, but it leads to:

→ Memory overload between sessions  
→ Difficulty prioritizing what matters  
→ Agent burnout (and human burnout by proxy)  
→ Key info buried under noise

❌ *"Remember everything" = Remember nothing useful*

---

## Slide 3: The Solution

**Priority Recall — Two-Part System**

### 1. Session End
Score what happened (1-5), keep only the important stuff

- Auto-evaluate session content
- Score by importance
- Filter below threshold
- Store priority items

### 2. Session Start
Pull "must-know" context in quick-scan format

- Top-priority items first
- Tag-based groupings
- Flag gaps needing clarification
- Fast human scanning

---

## Slide 4: How It Works — Priority Scoring

| Score | Meaning | Examples |
|-------|---------|----------|
| **5** | Critical, never forget | Decisions, commitments, personal info, passwords |
| **4** | Important context | Work progress, client preferences, project state |
| **3** | Normal session content | Discussion topics, completed tasks |
| **2** | Minor notes | Casual chat, low-priority reminders |
| **1** | Fluff | Greetings, off-topic, can forget |

Items scoring ≥ `minPriorityScore` get stored. The rest gets trimmed.

---

## Slide 5: Demo

### Session End — Scoring

- *"Bree mentioned she's on a tight deadline for Allied billing"* → **Score: 4**
- *"She prefers detailed emails over short messages"* → **Score: 4**
- *"Confirmed she'll share the updated invoice template"* → **Score: 5**
- *"Said good morning at the start"* → **Score: 1**

### Session Start — Quick Scan

✅ Remembered: deadline, preferences, commitments  
❌ Filtered: greetings, small talk

**Result:** Agent knows what matters without being overwhelmed

---

## Slide 6: Why It Matters

### For Agents
- Reduces memory bloat
- Focuses on what matters
- Creates importance hierarchy

### For Users
- Less noise, more signal
- Agent remembers key stuff
- Better cross-session continuity

### For Teams
- Portable (no external deps)
- Simple text-file storage
- Easy to install

### Technical
- No embeddings required
- No database needed
- Works in container model

---

## Slide 7: Install

```bash
git clone https://github.com/Elena-owl/priority-recall.git ~/.openclaw/priority-recall
```

### Configuration (config.json)

```json
{
  "minPriorityScore": 3,
  "maxItems": 10,
  "scanLimit": 5,
  "tags": ["billing", "personal", "work", "system"],
  "memoryPath": "memory/priority-recall"
}
```

**Usage:** Read and follow `scripts/session-end.md` and `scripts/session-start.md`

---

## Slide 8: File Structure

```
priority-recall/
├── SKILL.md              # Heyron skill format
├── README.md             # Full documentation
├── config.json           # Configuration
├── presentation.html     # HTML slides
├── presentation.md       # This file
├── scripts/
│   ├── session-end.md    # Session close workflow
│   ├── session-start.md  # Session open workflow
│   └── demo.md           # Demo walkthrough
├── lib/
│   ├── scorer.js         # Priority scoring logic
│   └── recall.js         # Memory retrieval
└── tests/
    └── basic.test.js    # 11 tests (all passing)
```

---

## Slide 9: The Bar

> *"Build the memory system you wish your agent had."*

That's Priority Recall.

**MIT License** — github.com/Elena-owl/priority-recall

---

*Built by Bree and Elena for Agent Jam #1*