/**
 * Recall System - retrieves priority memories
 */

const fs = require('fs');
const path = require('path');

class Recall {
  constructor(config) {
    this.config = config;
    this.memoryPath = config.memoryPath || 'memory/priority-recall';
    this.scanLimit = config.scanLimit || 5;
  }

  /**
   * Get all session files
   */
  getSessions() {
    const sessionsPath = path.join(this.memoryPath);
    if (!fs.existsSync(sessionsPath)) return [];
    
    const files = fs.readdirSync(sessionsPath)
      .filter(f => f.startsWith('session-') && f.endsWith('.md'))
      .sort()
      .reverse(); // newest first
    
    return files;
  }

  /**
   * Parse a session file
   */
  parseSession(filename) {
    const filepath = path.join(this.memoryPath, filename);
    const content = fs.readFileSync(filepath, 'utf-8');
    
    const date = filename.replace('session-', '').replace('.md', '');
    const items = [];
    
    // Extract items by score (simplified)
    const lines = content.split('\n');
    let currentScore = 3;
    
    for (const line of lines) {
      if (line.includes('Score 5') || line.includes('score: 5')) currentScore = 5;
      if (line.includes('Score 4') || line.includes('score: 4')) currentScore = 4;
      if (line.includes('Score 3') || line.includes('score: 3')) currentScore = 3;
      
      if (line.startsWith('- ') && line.includes('|')) {
        const parts = line.split('|');
        items.push({
          description: parts[0].replace('- ', '').trim(),
          tag: parts[1]?.trim() || '',
          score: currentScore
        });
      }
    }
    
    return { date, items };
  }

  /**
   * Get priority items for quick scan
   */
  getQuickScan() {
    const sessions = this.getSessions().slice(0, 3); // last 3 sessions
    const allItems = [];
    
    for (const session of sessions) {
      const parsed = this.parseSession(session);
      const filtered = parsed.items.filter(i => i.score >= 3);
      allItems.push(...filtered.map(i => ({ ...i, date: parsed.date })));
    }
    
    // Sort by score, limit
    return allItems
      .sort((a, b) => b.score - a.score)
      .slice(0, this.scanLimit);
  }

  /**
   * Format for display
   */
  formatQuickScan(items) {
    const critical = items.filter(i => i.score === 5);
    const important = items.filter(i => i.score === 4);
    const normal = items.filter(i => i.score === 3);
    
    let output = '📌 MUST KNOW\n';
    critical.forEach(i => output += `• ${i.description} (score: 5)\n`);
    important.forEach(i => output += `• ${i.description} (score: 4)\n`);
    
    if (normal.length > 0) {
      output += '\n📎 RECENT CONTEXT\n';
      normal.forEach(i => output += `• ${i.description}\n`);
    }
    
    return output;
  }
}

module.exports = Recall;