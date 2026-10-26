const {test}=require('node:test');const assert=require('node:assert/strict');const {published,releaseDay}=require('../chronicle-calendar.js');const issues=require('../data/cedar-chronicle-issues.json');const monthly=issues.filter(i=>i.kind!=='special');const specials=issues.filter(i=>i.kind==='special');
test('monthly issues release at UK midnight across winter, summer time and year rollover',()=>{
 for(const [stamp,expected] of [['2026-10-31T23:59:59Z','2026-10'],['2026-11-01T00:00:00Z','2026-11'],['2026-12-31T23:59:59Z','2026-12'],['2027-01-01T00:00:00Z','2027-01'],['2027-03-31T22:59:59Z','2027-03'],['2027-03-31T23:00:00Z','2027-04'],['2027-08-01T00:00:00Z','2027-04']])assert.equal(published(monthly,new Date(stamp))[0].id,expected);
 assert.equal(published(issues,new Date('2026-09-30T12:00:00Z')).length,0);
});
test('approved specials release on their exact UK days, not the start of June',()=>{
 assert.equal(specials.length,5);assert.equal(published(issues,new Date('2027-06-01T12:00:00Z')).length,7);
 for(const [index,issue]of specials.entries()){
  const midnight=Date.parse(issue.id+'T00:00:00+01:00');
  const before=published(issues,new Date(midnight-1));const after=published(issues,new Date(midnight));
  assert.ok(!before.some(i=>i.id===issue.id));assert.equal(after[0].id,issue.id);assert.equal(after.length,8+index);
 }
 assert.equal(published(issues,new Date('2027-08-01T00:00:00Z'))[0].id,'2027-06-30');
 const mixed=[{id:'2027-06'},...specials];assert.equal(published(mixed,new Date('2027-06-29T12:00:00Z'))[0].id,'2027-06-29');
 for(const id of ['2027-02-30','2027-04-31','2027-13','2027-06-00','2027-6-26','anything'])assert.equal(releaseDay({id}),null);
});
test('monthly archive and all approved story content have stable unique identities',()=>{
 assert.equal(monthly.length,7);assert.equal(new Set(issues.map(i=>i.id)).size,12);
 for(const [index,issue]of monthly.entries()){assert.equal(issue.number,index+1);assert.equal(issue.stories.length,6);}
 assert.equal(specials.reduce((sum,i)=>sum+i.stories.length,0),6);assert.equal(specials.find(i=>i.id==='2027-06-29').stories.length,2);
 for(const issue of issues){assert.equal(new Set(issue.stories.map(s=>s.id)).size,issue.stories.length);for(const story of issue.stories){assert.match(story.id,/^[a-z0-9-]+$/);for(const field of ['title','deck','category','byline'])assert.ok(story[field]);assert.ok(story.paragraphs.length>=2);assert.ok(story.paragraphs.every(p=>typeof p==='string'&&p.length>30));}}
 assert.equal(new Set(issues.flatMap(i=>i.stories.map(s=>s.title))).size,48);
});
