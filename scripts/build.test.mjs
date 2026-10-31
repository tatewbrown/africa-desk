import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs/promises';import {validate,root} from './build.mjs';
const fixture=JSON.parse(await fs.readFile(root+'/content/desk.json','utf8'));
test('public edition data is valid and every source uses HTTPS',()=>assert.deepEqual(validate(fixture),[]));
test('editions cannot reference missing leads',()=>{const d=structuredClone(fixture);d.editions[0].activeLeadIds.push('missing');assert.ok(validate(d).some(e=>e.includes('missing lead')));});
test('malicious source links and unsupported statuses are rejected',()=>{const d=structuredClone(fixture);d.leads[0].sources[0].url='javascript:alert(1)';d.leads[0].status='Verified exclusive';assert.ok(validate(d).some(e=>e.includes('URL')));assert.ok(validate(d).some(e=>e.includes('status')));});
test('internal raw responses are excluded from published payloads',()=>{const d=structuredClone(fixture);d.rawResponse='internal';assert.ok(validate(d).some(e=>e.includes('Internal')));});
test('latest edition truthfully retains a no-new-finding state',()=>{assert.equal(fixture.editions[0].date,'2026-10-29');assert.equal(fixture.editions[0].newDevelopedLeads,0);assert.ok(fixture.editions[0].activeLeadIds.length>0);});
