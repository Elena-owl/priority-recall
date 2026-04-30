/**
 * Basic Tests for Priority Recall
 */

const PriorityScorer = require('./lib/scorer');
const Recall = require('./lib/recall');

const config = {
  minPriorityScore: 3,
  maxItems: 10,
  scanLimit: 5,
  memoryPath: 'memory/priority-recall'
};

console.log('🧪 Running Priority Recall Tests\n');

// Test 1: Scorer
const scorer = new PriorityScorer(config);

const testItems = [
  { description: 'Bree agreed to new contract terms', tag: 'billing' },
  { description: 'Client meeting scheduled for Tuesday', tag: 'work' },
  { description: 'Said thanks for the help', tag: 'personal' },
  { description: 'Password reset needed', tag: 'system' }
];

console.log('Test 1: Priority Scoring');
testItems.forEach(item => {
  const score = scorer.autoScore(item);
  console.log(`  "${item.description}" => ${score}`);
});

// Test 2: Filter
console.log('\nTest 2: Filtering');
const scored = testItems.map(item => ({
  ...item,
  score: scorer.autoScore(item)
}));
const filtered = scorer.filter(scored);
console.log(`  Kept ${filtered.length} items (threshold: ${config.minPriorityScore})`);

console.log('\n✅ Tests complete!');

/**
 * To run: node tests/basic.test.js
 */