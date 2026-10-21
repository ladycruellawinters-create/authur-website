/* Issue dates use the author's UK calendar, including summer-time boundaries. */
(function(root){
 function monthAt(now=new Date()) {
  const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/London',year:'numeric',month:'2-digit'}).formatToParts(now);
  return `${parts.find(p=>p.type==='year').value}-${parts.find(p=>p.type==='month').value}`;
 }
 function published(issues,now=new Date()) {const month=monthAt(now);return issues.filter(issue=>/^\d{4}-(0[1-9]|1[0-2])$/.test(issue.id)&&issue.id<=month).sort((a,b)=>b.id.localeCompare(a.id));}
 const api={monthAt,published};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.ChronicleCalendar=api;
})(typeof window!=='undefined'?window:globalThis);
