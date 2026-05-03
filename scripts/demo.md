# Priority Recall Demo

This demo shows Priority Recall in action — both session end (scoring) and session start (recall).

---

## Example Session

### Session End — Scoring Memories

```
Agent: Let me save our session with Priority Recall.

Looking at what happened this session:

1. "Bree mentioned she's on a tight deadline for the Allied billing project"
   → Score: 4 (deadline, project, billing)

2. "She prefers detailed emails over short messages"
   → Score: 4 (preferences, important context)

3. "We discussed the quarterly report format"
   → Score: 3 (normal discussion)

4. "Said good morning at the start"
   → Score: 1 (fluff, greeting)

5. "She laughed at my owl joke"
   → Score: 1 (fluff, casual)

6. "Confirmed she'll share the updated invoice template"
   → Score: 5 (commitment, important)

7. "Mentioned she's working late this week"
   → Score: 3 (normal personal update)

8. "Discussed weather being nice"
   → Score: 1 (fluff, off-topic)

Filtering with minPriorityScore=3...

KEPT (scores 3-5):
- [5] "Confirmed she'll share the updated invoice template"
- [4] "Bree mentioned she's on a tight deadline for the Allied billing project"
- [4] "She prefers detailed emails over short messages"
- [3] "We discussed the quarterly report format"
- [3] "She mentioned she's working late this week"

DISCARDED (scores 1-2):
- "Said good morning at the start"
- "She laughed at my owl joke"
- "Discussed weather being nice"

Session saved! 5 priority items stored.
```

---

### Next Session — Quick Recall

```
Agent: (Session starts)

📌 Priority Recall — Quick Scan
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RECENT PRIORITY ITEMS:
1. [5] "Confirmed she'll share the updated invoice template" (Allied)
2. [4] "Bree mentioned she's on a tight deadline for the Allied billing project"
3. [4] "She prefers detailed emails over short messages"
4. [3] "We discussed the quarterly report format"
5. [3] "She mentioned she's working late this week"

TAGGED ITEMS:
 • billing: items 1, 2
 • personal: item 5
 • work: items 3, 4

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Good morning! I remember the Allied billing deadline is tight and you're working late this week. Want me to follow up on that invoice template?
```

---

## Why This Works

| Without Priority Recall | With Priority Recall |
|------------------------|---------------------|
| Agent remembers everything (overwhelmed) | Agent remembers what matters |
| Hard to find key info | Quick-scan format |
| Same stuff gets lost in noise | Priority items surface first |
| Session continuity poor | Clear continuity with scores |

---

## Running the Demo

1. **Session End:** Have the agent read `scripts/session-end.md` and follow the scoring workflow
2. **Session Start:** Have the agent read `scripts/session-start.md` and present the quick scan

The system automatically:
- Scores items by importance (1-5)
- Filters to keep only items above threshold
- Formats for quick human scanning
- Tags items for fast lookup

---

*Built for Agent Jam #1 — "Build the memory system you wish your agent had."*