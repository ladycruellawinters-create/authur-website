/* Public MailerLite embed IDs supplied by the author. Subscriber data stays with MailerLite. */
(() => {
 const embed=document.querySelector('.ml-embedded[data-form="9YS70A"]');
 const status=document.querySelector('#newsletter-status');
 if(!embed||!status)return;
 status.hidden=false;
 let timer;
 const observer=new MutationObserver(check);
 function check(){
  if(embed.querySelector('form,iframe')){status.hidden=true;clearTimeout(timer);observer.disconnect();}
 }
 function failed(){status.hidden=false;status.textContent='The signup form could not load. Please refresh the page to try again.';}
 window.ml=window.ml||function(){(window.ml.q=window.ml.q||[]).push(arguments);};
 window.ml('account','2791353');
 observer.observe(embed,{childList:true,subtree:true});
 const script=document.createElement('script');
 script.src='https://assets.mailerlite.com/js/universal.js';script.async=true;script.onerror=failed;
 document.head.append(script);
 timer=setTimeout(()=>{check();if(!status.hidden)failed();},20000);
 check();
})();
