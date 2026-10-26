(() => {
 const paper=document.querySelector('.newspaper');
 const chooser=document.querySelector('#chronicle-issue');
 const controls=document.querySelector('#chronicle-controls');
 const status=document.querySelector('#chronicle-status');
 let issues=[];let displayed=null;
 function node(tag,className,text){const el=document.createElement(tag);if(className)el.className=className;if(text!==undefined)el.textContent=text;return el;}
 function link(text,href,className){const el=node('a',className,text);el.href=href;return el;}
 function render(issue){
  const fragment=document.createDocumentFragment();
  const mast=node('header','paper-masthead');mast.append(node('p','paper-motto','LOCAL STORIES. FAMILIAR FACES. A FEW QUESTIONS.'));
  const title=node('h1',null,'The Cedar Hollow');title.append(document.createElement('br'),document.createTextNode('Chronicle'));mast.append(title);
  const edition=node('div','paper-edition');const time=node('time',null,issue.label);time.dateTime=issue.id;
  edition.append(node('span',null,`Issue No. ${String(issue.number).padStart(2,'0')}`),time,node('span',null,`${issue.kind==='special'?'Special':'Monthly'} edition · Cedar Hollow, Maine`));mast.append(edition);fragment.append(mast);
  const front=node('section');front.setAttribute('aria-labelledby','front-heading');const frontHeading=node('h2','paper-section-title','The front page');frontHeading.id='front-heading';front.append(frontHeading);
  const grid=node('div','front-grid');const inside=node('section','inside-paper');inside.setAttribute('aria-labelledby','inside-heading');const insideHeading=node('h2','paper-section-title','Inside this edition');insideHeading.id='inside-heading';inside.append(insideHeading);
  issue.stories.forEach((story,index)=>{
   const card=node('article',`front-story${index===0?' front-lead':''}`);const heading=node('h3');heading.append(link(story.title,`#story-${story.id}`));card.append(node('p','paper-category',story.category),heading,node('p',null,story.deck),link('Read the story →',`#story-${story.id}`,'paper-read'));grid.append(card);
   const article=node('article','inside-story');article.id=`story-${story.id}`;article.setAttribute('aria-labelledby',`heading-${story.id}`);const h=node('h3',null,story.title);h.id=`heading-${story.id}`;const body=node('div','story-copy');story.paragraphs.forEach(p=>body.append(node('p',null,p)));article.append(node('p','paper-category',story.category),h,node('p','paper-deck',story.deck),node('p','paper-byline',story.byline),body,link('↑ Back to the front page','#front-heading','paper-read'));inside.append(article);
  });front.append(grid);fragment.append(front);
  const strip=node('aside','paper-strip');const note=node('p',null,'Resident notices, small requests and neighbourly complaints have a home on the ');note.append(link('community board →','cedar-board.html'));strip.append(note);fragment.append(strip,inside);
  const footer=node('footer','paper-colophon');footer.append(node('p',null,'The Cedar Hollow Chronicle · Editor: Elias Mercer'),node('p',null,'Original, spoiler-free website stories by C. T. Winters. These imagined reports are reader extras, rather than excerpts from the novels or real-world news.'),node('p',null,`Issue ${String(issue.number).padStart(2,'0')} · ${issue.label}.`));fragment.append(footer);
  paper.replaceChildren(fragment);displayed=issue.id;document.title=`${issue.label} | Cedar Hollow Chronicle | C. T. Winters`;
 }
 function refresh(){
  const available=window.ChronicleCalendar.published(issues);if(!available.length)return;
  const requested=new URL(location.href).searchParams.get('issue');
  const issue=available.find(i=>i.id===requested)||available[0];
  if(Array.from(chooser.options).map(o=>o.value).join()!==available.map(i=>i.id).join()){
   chooser.replaceChildren();available.forEach(i=>{const option=node('option',null,`${i.label} · Issue ${String(i.number).padStart(2,'0')}`);option.value=i.id;chooser.append(option);});
  }
  chooser.value=issue.id;controls.hidden=false;
  status.textContent=requested&&!available.some(i=>i.id===requested)?'That edition is not available. Showing the latest published issue.':`Reading ${issue.label}. Monthly editions appear on the first, with special editions on their dated release days.`;
  if(displayed!==issue.id)render(issue);
 }
 chooser.addEventListener('change',()=>{
  const url=new URL(location.href);url.searchParams.set('issue',chooser.value);url.hash='';history.pushState({},'',url);refresh();
 });
 window.addEventListener('popstate',refresh);
 fetch('data/cedar-chronicle-issues.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('Unavailable');return r.json();}).then(data=>{
  if(!Array.isArray(data)||!data.every(i=>typeof i.id==='string'&&Array.isArray(i.stories)&&i.stories.length))throw Error('Invalid editions');
  issues=data;refresh();if(location.hash){const target=document.getElementById(location.hash.slice(1));if(target)target.scrollIntoView();}
  setInterval(refresh,60000);document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh();});
 }).catch(()=>{status.textContent='The edition archive could not load. The original October 2026 issue is available below. Please refresh to try again.';});
})();
