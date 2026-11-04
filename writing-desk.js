/* Published books leave the writing desk after their UK publication day. */
(function(root){
 function ukDay(now=new Date()){
  const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/London',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);
  const part=type=>parts.find(p=>p.type===type).value;
  return `${part('year')}-${part('month')}-${part('day')}`;
 }
 function isPastPublication(date,now=new Date()){
  if(typeof date!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(date))return false;
  const parsed=new Date(date+'T00:00:00Z');
  if(!Number.isFinite(parsed.getTime())||parsed.toISOString().slice(0,10)!==date)return false;
  return date<ukDay(now);
 }
 if(typeof module!=='undefined'&&module.exports){module.exports={ukDay,isPastPublication};return;}
 const section=root.document.querySelector('#writing');
 if(!section)return;
 const grid=section.querySelector('.writing-projects');
 const projects=[...section.querySelectorAll('.writing-project')];
 if(!grid||!projects.length)return;
 function refresh(){
  const now=new Date();
  projects.forEach(project=>{const date=project.querySelector('.book-release-date time[datetime]')?.getAttribute('datetime');project.hidden=isPastPublication(date,now);});
  const visible=projects.filter(project=>!project.hidden).length;
  grid.style.setProperty('--writing-columns',String(Math.min(3,Math.max(1,visible))));
  section.hidden=visible===0;
 }
 refresh();
 root.setInterval(refresh,60000);
 root.document.addEventListener('visibilitychange',()=>{if(!root.document.hidden)refresh();});
})(typeof window!=='undefined'?window:globalThis);
