# Session End Workflow

Follow this workflow at the end of each session to save priority memories.

## Step 1: Summarize the Session

Briefly summarize what happened in 2-4 sentences. Focus on:
- Decisions made
- Tasks completed
- Important context shared
- Commitments made

## Step 2: Extract Memory Items

List each notable item from the session. Format:

```
- [Item description] | [Tag] | [Notes]
```

Examples:
- "Bree mentioned she's overcommitted this week" | personal | might need follow-up
- "Scheduled sync with client on Tuesday" | work | deadline confirmed
- "New billing system goes live Friday" | billing | critical

## Step 3: Score Each Item

Rate each item 1-5 based on importance:

| Score | Meaning |
|-------|---------|
| 5 | Critical - decisions, commitments, personal info |
| 4 | Important - work progress, context |
| 3 | Normal - session content |
| 2 | Minor - casual chat |
| 1 | Fluff - greetings, can forget |

## Step 4: Filter by Threshold

Keep only items scoring ≥ `minPriorityScore` (default: 3)

## Step 5: Save to Memory

Write to `memory/priority-recall/session-YYYY-MM-DD.md`:

```
# Session YYYY-MM-DD

## Summary
[Your summary]

## Priority Memories

### Score 5 (Critical)
- [Item] | [Tag]

### Score 4 (Important)
- [Item] | [Tag]

### Score 3 (Normal)
- [Item] | [Tag]

## Gap Items (Needs Clarification)
- [Item that needs follow-up]
```

## Step 6: Update Index

Add session to `memory/priority-recall/index.md`:

```
- YYYY-MM-DD: [summary snippet]
```

---

**Tip:** Be honest about what matters. Less is more.