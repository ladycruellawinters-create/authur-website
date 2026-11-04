const {test}=require('node:test');const assert=require('node:assert/strict');const {isPastPublication}=require('../writing-desk.js');
test('books stay throughout their release day and leave on the next UK day',()=>{
 assert.equal(isPastPublication('2027-06-25',new Date('2027-06-25T22:59:59Z')),false);
 assert.equal(isPastPublication('2027-06-25',new Date('2027-06-25T23:00:00Z')),true);
 assert.equal(isPastPublication('2027-07-25',new Date('2027-07-25T22:59:59Z')),false);
 assert.equal(isPastPublication('2027-07-25',new Date('2027-07-25T23:00:00Z')),true);
 assert.equal(isPastPublication('2027-06-25',new Date('2026-11-04T12:00:00Z')),false);
});
test('winter and clock-change boundaries follow UK calendar dates',()=>{
 for(const [release,before,after]of [['2027-01-01','2027-01-01T23:59:59Z','2027-01-02T00:00:00Z'],['2027-03-28','2027-03-28T22:59:59Z','2027-03-28T23:00:00Z'],['2027-10-31','2027-10-31T23:59:59Z','2027-11-01T00:00:00Z']]){assert.equal(isPastPublication(release,new Date(before)),false);assert.equal(isPastPublication(release,new Date(after)),true);}
});
test('missing or invalid publication dates never hide a work in progress',()=>{
 for(const value of [undefined,null,'','not-a-date','2027-02-30','2027-13-01','2027-6-25','2027-06-25T00:00:00Z'])assert.equal(isPastPublication(value,new Date('2030-01-01')),false);
});
