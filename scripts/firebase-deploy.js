#!/usr/bin/env node

const { spawnSync } = require('node:child_process');

function shouldTreatAsSuccess(output, exitCode) {
  if (exitCode === 0) {
    return true;
  }

  const normalized = `${output ?? ''}`.toLowerCase();
  return /is the current active version|already up[- ]to[- ]date|no changes to deploy|nothing to deploy|no files to deploy/.test(normalized);
}

function run() {
  const args = process.argv.slice(2);
  const cliVersion = process.env.FIREBASE_CLI_VERSION || '15.22.2';
  const command = ['npx', '--yes', `firebase-tools@${cliVersion}`, 'deploy', ...args];

  console.log(`> ${command.join(' ')}`);

  const result = spawnSync(command[0], command.slice(1), {
    stdio: 'pipe',
    encoding: 'utf8',
    shell: false,
  });

  const combinedOutput = [result.stdout ?? '', result.stderr ?? ''].filter(Boolean).join('\n').trim();
  if (combinedOutput) {
    process.stdout.write(`${combinedOutput}\n`);
  }

  if (result.error) {
    console.error(result.error.message);
    process.exit(1);
  }

  if (shouldTreatAsSuccess(combinedOutput, result.status ?? 1)) {
    if ((result.status ?? 1) !== 0) {
      console.log('ℹ️ Firebase Hosting reported a no-op deployment; treating it as success.');
    }
    process.exit(0);
  }

  process.exit(result.status ?? 1);
}

if (require.main === module) {
  run();
}

module.exports = {
  shouldTreatAsSuccess,
};
