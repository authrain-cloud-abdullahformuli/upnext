import fs from 'fs';
import path from 'path';

console.log('Running UpNext test suite...');

let passed = 0;
let total = 0;

function assert(condition, message) {
  total++;
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    process.exit(1);
  } else {
    passed++;
    console.log(`✓ PASS: ${message}`);
  }
}

// 1. Check workspace directories
assert(fs.existsSync('./backend/src/server.ts'), 'backend/src/server.ts exists');
assert(fs.existsSync('./backend/prisma/schema.prisma'), 'backend/prisma/schema.prisma exists');
assert(fs.existsSync('./frontend/src/App.tsx'), 'frontend/src/App.tsx exists');

// 2. Metadata files
assert(fs.existsSync('./LICENSE'), 'LICENSE exists');
const lic = fs.readFileSync('./LICENSE', 'utf-8');
assert(lic.includes('Abdullah Formuli'), 'LICENSE lists Abdullah Formuli');

assert(fs.existsSync('./MAINTAINERS.md'), 'MAINTAINERS.md exists');
const maint = fs.readFileSync('./MAINTAINERS.md', 'utf-8');
assert(maint.includes('Maintained solely by Abdullah Formuli'), 'MAINTAINERS.md asserts sole maintainership');

assert(fs.existsSync('./package.json'), 'Root package.json exists');
const rootPkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
assert(rootPkg.author.includes('Abdullah Formuli'), 'Root package.json author matches Abdullah Formuli');
assert(rootPkg.repository.url.includes('authrain-cloud-abdullahformuli/upnext'), 'Root package.json repository matches');

assert(fs.existsSync('./CITATION.cff'), 'CITATION.cff exists');
const cff = fs.readFileSync('./CITATION.cff', 'utf-8');
assert(cff.includes('Abdullah'), 'CITATION.cff contains author name');

assert(fs.existsSync('./backend/package.json'), 'backend/package.json exists');
const bpkg = JSON.parse(fs.readFileSync('./backend/package.json', 'utf-8'));
assert(bpkg.author.includes('Abdullah Formuli'), 'backend/package.json author matches');

// 3. Governance check
assert(!fs.existsSync('./CONTRIBUTING.md'), 'CONTRIBUTING.md is not present');
assert(!fs.existsSync('./CODE_OF_CONDUCT.md'), 'CODE_OF_CONDUCT.md is not present');

// 4. Asset checks
assert(fs.existsSync('./docs/demo.gif'), 'docs/demo.gif exists');

console.log(`\nAll ${passed}/${total} test checks passed successfully!`);
