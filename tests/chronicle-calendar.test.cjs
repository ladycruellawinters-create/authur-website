const {test}=require('node:test');const assert=require('node:assert/strict');const {published}=require('../chronicle-calendar.js');const issues=require('../data/cedar-chronicle-issues.json');
test('monthly issues release at UK midnight across winter, summer time and year rollover',()=>{
 for(const [stamp,expected] of [['2026-10-31T23:59:59Z','2026-10'],['2026-11-01T00:00:00Z','2026-11'],['2026-12-31T23:59:59Z','2026-12'],['2027-01-01T00:00:00Z','2027-01'],['2027-03-31T22:59:59Z','2027-03'],['2027-03-31T23:00:00Z','2027-04'],['2027-08-01T00:00:00Z','2027-04']])assert.equal(published(issues,new Date(stamp))[0].id,expected);
 assert.equal(published(issues,new Date('2026-09-30T12:00:00Z')).length,0);
});
test('every issue has six complete original stories and a stable unique archive identity',()=>{
 assert.equal(issues.length,7);assert.equal(new Set(issues.map(i=>i.id)).size,7);
 for(const [index,issue]of issues.entries()){assert.equal(issue.number,index+1);assert.equal(issue.stories.length,6);assert.equal(new Set(issue.stories.map(s=>s.id)).size,6);for(const story of issue.stories){assert.match(story.id,/^[a-z0-9-]+$/);for(const field of ['title','deck','category','byline'])assert.ok(story[field]);assert.ok(story.paragraphs.length>=2);assert.ok(story.paragraphs.every(p=>typeof p==='string'&&p.length>30));}}
 assert.equal(new Set(issues.flatMap(i=>i.stories.map(s=>s.title))).size,42);
});
