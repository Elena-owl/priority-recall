/**
 * Comprehensive Tests for Priority Recall
 */

const PriorityScorer = require('../lib/scorer');
const Recall = require('../lib/recall');

const config = {
  minPriorityScore: 3,
  maxItems: 10,
  scanLimit: 5,
  memoryPath: 'memory/priority-recall'
};

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✅ ${name}`);
    passed++;
  } catch (e) {
    console.log(`  ❌ ${name}: ${e.message}`);
    failed++;
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

console.log('🧪 Priority Recall - Full Test Suite\n');

// ============================================
// PRIORITY SCORER TESTS
// ============================================
console.log('Test Group 1: Priority Scorer');

const scorer = new PriorityScorer(config);

test('Critical keywords score 5', () => {
  const items = [
    { description: 'Bree agreed to new contract terms' },
    { description: 'Client password needs reset' },
    { description: 'Confidential financial data shared' },
    { description: 'Payment due on Friday' }
  ];
  items.forEach(item => {
    const score = scorer.autoScore(item);
    assert(score === 5, `Expected 5, got ${score} for "${item.description}"`);
  });
});

test('Important keywords score 4', () => {
  const items = [
    { description: 'Client meeting scheduled for Tuesday' },
    { description: 'Project deadline is next week' },
    { description: 'Need to update client on progress' },
    { description: 'Goal is to finish the new system' }
  ];
  items.forEach(item => {
    const score = scorer.autoScore(item);
    assert(score === 4, `Expected 4, got ${score} for "${item.description}"`);
  });
});

test('Minor/fluff keywords score 1-2', () => {
  const lowScoreItems = [
    { description: 'Said thanks for the help' },
    { description: 'Hello how are you' },
    { description: 'Okay sure no problem' },
    { description: 'Lol that is funny' }
  ];
  lowScoreItems.forEach(item => {
    const score = scorer.autoScore(item);
    assert(score <= 2, `Expected ≤2, got ${score} for "${item.description}"`);
  });
});

test('Default score is 3 for neutral items', () => {
  const neutralItems = [
    { description: 'Discussed the new system architecture' },
    { description: 'Reviewed quarterly reports' },
    { description: 'Talked about team structure' }
  ];
  neutralItems.forEach(item => {
    const score = scorer.autoScore(item);
    assert(score === 3, `Expected 3, got ${score} for "${item.description}"`);
  });
});

test('Filter keeps only items above threshold', () => {
  const items = [
    { description: 'Critical decision made', score: 5 },
    { description: 'Important update', score: 4 },
    { description: 'Normal discussion', score: 3 },
    { description: 'Minor chat', score: 2 },
    { description: 'Fluff message', score: 1 }
  ];
  const filtered = scorer.filter(items);
  assert(filtered.length === 3, `Expected 3 items, got ${filtered.length}`);
  assert(filtered[0].score === 5, 'Highest score should be first');
});

test('Format item with auto-score', () => {
  const item = scorer.formatItem('New contract signed', 'billing', 'important');
  assert(item.score === 5, `Expected 5, got ${item.score}`);
  assert(item.tag === 'billing', `Expected billing, got ${item.tag}`);
  assert(item.timestamp, 'Should have timestamp');
});

// ============================================
// RECALL SYSTEM TESTS
// ============================================
console.log('\nTest Group 2: Recall System');

const recall = new Recall(config);

test('Get sessions returns array', () => {
  const sessions = recall.getSessions();
  assert(Array.isArray(sessions), 'Should return array');
});

test('Quick scan limits items', () => {
  const scan = recall.getQuickScan();
  assert(scan.length <= config.scanLimit, `Should be ≤${config.scanLimit}, got ${scan.length}`);
});

// ============================================
// EDGE CASE TESTS
// ============================================
console.log('\nTest Group 3: Edge Cases');

test('Empty items array filters to empty', () => {
  const filtered = scorer.filter([]);
  assert(filtered.length === 0, 'Empty should stay empty');
});

test('All high-priority items respect maxItems', () => {
  const items = Array(15).fill(null).map((_, i) => ({
    description: `Important item ${i}`,
    score: 5
  }));
  const filtered = scorer.filter(items);
  assert(filtered.length === config.maxItems, `Should be capped at ${config.maxItems}`);
});

test('Custom threshold is respected', () => {
  const strictScorer = new PriorityScorer({ ...config, minPriorityScore: 4 });
  const items = [
    { description: 'Normal talk', score: 3 },
    { description: 'Important update', score: 4 },
    { description: 'Critical decision', score: 5 }
  ];
  const filtered = strictScorer.filter(items);
  assert(filtered.length === 2, `Expected 2 with threshold 4, got ${filtered.length}`);
});

// ============================================
// SUMMARY
// ============================================
console.log('\n' + '='.repeat(40));
console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);
console.log('='.repeat(40));

if (failed === 0) {
  console.log('\n🎉 All tests passed!');
} else {
  console.log('\n⚠️ Some tests failed - review above');
  process.exit(1);
}

/**
 * To run: node tests/basic.test.js
 */