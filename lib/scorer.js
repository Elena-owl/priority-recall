/**
 * Priority Scorer - scores memory items by importance
 */

const fs = require('fs');
const path = require('path');

class PriorityScorer {
  constructor(config) {
    this.config = config;
    this.minScore = config.minPriorityScore || 3;
    this.maxItems = config.maxItems || 10;
  }

  /**
   * Score a memory item based on keywords and patterns
   */
  autoScore(item) {
    const text = item.description.toLowerCase();
    let score = 3; // default

    // Score 5 keywords (critical)
    const critical = ['decision', 'commitment', 'password', 'personal', 'confidential', 'money', 'pay', 'billing', 'contract', 'agreed'];
    // Score 4 keywords (important)
    const important = ['deadline', 'meeting', 'project', 'client', 'task', 'progress', 'update', 'goal'];
    // Score 1-2 keywords (minor/fluff)
    const minor = ['hello', 'thanks', 'okay', 'sure', 'nice', 'cool', 'lol'];

    if (critical.some(k => text.includes(k))) score = 5;
    else if (important.some(k => text.includes(k))) score = 4;
    else if (minor.some(k => text.includes(k))) score = 2;

    return score;
  }

  /**
   * Filter items by minimum score
   */
  filter(items) {
    return items
      .filter(item => item.score >= this.minScore)
      .sort((a, b) => b.score - a.score)
      .slice(0, this.maxItems);
  }

  /**
   * Format item for storage
   */
  formatItem(description, tag, notes = '') {
    const score = this.autoScore({ description });
    return {
      description,
      tag,
      notes,
      score,
      timestamp: new Date().toISOString()
    };
  }
}

module.exports = PriorityScorer;