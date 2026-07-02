const test = require('node:test');
const assert = require('node:assert/strict');
const { shouldTreatAsSuccess } = require('./firebase-deploy');

test('treats current active version as success', () => {
  assert.equal(
    shouldTreatAsSuccess('Error: ... supplied version ... is the current active version.', 1),
    true
  );
});

test('treats no-op deploy output as success', () => {
  assert.equal(shouldTreatAsSuccess('No changes to deploy.', 1), true);
});

test('keeps real deploy failures as failures', () => {
  assert.equal(shouldTreatAsSuccess('Error: Permission denied', 1), false);
});
