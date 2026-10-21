const {test}=require('node:test');
const assert=require('node:assert/strict');
const {creatures,questions}=require('../cedar-quiz-data.js');
const keys=Object.keys(creatures);
function winners(answers){const scores=keys.map(key=>[key,creatures[key].affinity.filter((a,i)=>a===answers[i]).length]);const max=Math.max(...scores.map(s=>s[1]));return scores.filter(s=>s[1]===max).map(s=>s[0]);}
test('all sixteen author-approved results have valid, distinct and reachable matches',()=>{
 assert.equal(keys.length,16);assert.equal(questions.length,6);
 assert.equal(new Set(keys.map(k=>creatures[k].affinity.join(''))).size,keys.length);
 for(const key of keys){const c=creatures[key];for(const field of ['name','accent','value','invitation','description','detail'])assert.ok(c[field]);assert.equal(c.affinity.length,questions.length);c.affinity.forEach((a,i)=>assert.ok(questions[i][1][a]));assert.deepEqual(winners(c.affinity),[key]);}
});
test('short questions provide four distinct choices and tied top matches remain possible',()=>{
 for(const [prompt,answers] of questions){assert.ok(prompt);assert.equal(Object.keys(answers).length,4);assert.equal(new Set(Object.values(answers)).size,4);}
 let found=false;for(let n=0;n<4096;n++){let v=n;const answers=questions.map(()=>{const a='abcd'[v%4];v=Math.floor(v/4);return a;});if(winners(answers).length>1){found=true;break;}}
 assert.ok(found);
});
