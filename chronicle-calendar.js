/* Issue dates use the author's UK calendar, including summer-time boundaries. */
(function(root){
 function dayAt(now=new Date()) {
  const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/London',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);
  const part=type=>parts.find(p=>p.type===type).value;
  return `${part('year')}-${part('month')}-${part('day')}`;
 }
 function monthAt(now=new Date()){return dayAt(now).slice(0,7);}
 function releaseDay(issue){
  if(typeof issue?.id!=='string'||!/^\d{4}-(0[1-9]|1[0-2])(?:-(0[1-9]|[12]\d|3[01]))?$/.test(issue.id))return null;
  const day=issue.id.length===7?issue.id+'-01':issue.id;
  const parsed=new Date(day+'T00:00:00Z');
  return Number.isFinite(parsed.getTime())&&parsed.toISOString().slice(0,10)===day?day:null;
 }
 function published(issues,now=new Date()) {
  const today=dayAt(now);
  return issues.filter(issue=>{const day=releaseDay(issue);return day&&day<=today;}).sort((a,b)=>releaseDay(b).localeCompare(releaseDay(a))||b.id.localeCompare(a.id));
 }
 const api={monthAt,dayAt,releaseDay,published};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.ChronicleCalendar=api;
})(typeof window!=='undefined'?window:globalThis);
