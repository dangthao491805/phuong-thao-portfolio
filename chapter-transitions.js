/* Four chapters: cancellable smooth navigation and visible section entrances. */
(() => {
  'use strict';
  const ids=['about','experience','activities','contact'];
  const sections=ids.map(id=>document.getElementById(id)).filter(Boolean);
  const root=document.documentElement;
  const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
  const rail=[...document.querySelectorAll('.chapter-rail a')];
  let current=null,scrollFrame=0,trackingFrame=0,navigating=false;
  const canAnimate=()=>!motion.matches&&!root.classList.contains('motion-paused');
  function cancelNavigation(){
    cancelAnimationFrame(scrollFrame);scrollFrame=0;navigating=false;
    if(root.classList.contains('chapter-scrolling')||root.classList.contains('chapter-navigating'))root.classList.remove('chapter-scrolling','chapter-navigating');
  }
  function setCurrent(section){
    if(section===current)return;
    current?.classList.remove('chapter-enter');current=section;
    if(section&&canAnimate())section.classList.add('chapter-enter');
    rail.forEach(link=>{
      if(section&&link.getAttribute('href')==='#'+section.id)link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    });
  }
  function trackChapter(){
    trackingFrame=0;
    const marker=Math.min(window.innerHeight*.34,300);
    let next=null;
    for(const section of sections){if(section.getBoundingClientRect().top<=marker)next=section;}
    const bottom=document.documentElement.scrollHeight-window.innerHeight;
    if(bottom>0&&window.scrollY>=bottom-8)next=sections.at(-1);
    setCurrent(next);
  }
  function scheduleTracking(){if(!trackingFrame)trackingFrame=requestAnimationFrame(trackChapter);}
  function arrive(section){
    cancelNavigation();setCurrent(section);
    history.replaceState(history.state,'','#'+section.id);
    const heading=section.querySelector('h2');
    if(heading){heading.setAttribute('tabindex','-1');heading.focus({preventScroll:true});}
  }
  function navigate(section){
    cancelNavigation();
    const start=window.scrollY;
    const header=document.querySelector('.site-header');
    const top=Math.max(0,Math.min(start+section.getBoundingClientRect().top-(header?.getBoundingClientRect().height||108)-16,root.scrollHeight-window.innerHeight));
    root.classList.add('chapter-scrolling');
    if(!canAnimate()){window.scrollTo(0,top);arrive(section);return;}
    navigating=true;root.classList.add('chapter-navigating');
    const duration=Math.min(1150,Math.max(650,Math.abs(top-start)*.23));
    let started;
    function tick(now){
      if(!navigating)return;
      if(started===undefined)started=now;
      const t=Math.min(1,(now-started)/duration);
      const ease=t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
      window.scrollTo(0,start+(top-start)*ease);
      if(t<1)scrollFrame=requestAnimationFrame(tick);
      else arrive(section);
    }
    scrollFrame=requestAnimationFrame(tick);
  }
  document.addEventListener('click',event=>{
    if(event.defaultPrevented||event.button>0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
    const link=event.target.closest?.('a[href^="#"]');if(!link)return;
    const id=link.getAttribute('href').slice(1);
    if(!ids.includes(id))return;
    const section=document.getElementById(id);if(!section)return;
    event.preventDefault();navigate(section);
  });
  window.addEventListener('wheel',cancelNavigation,{passive:true});
  window.addEventListener('touchstart',cancelNavigation,{passive:true});
  document.addEventListener('keydown',event=>{if(['ArrowDown','ArrowUp','PageDown','PageUp','Home','End','Escape',' '].includes(event.key))cancelNavigation();});
  window.addEventListener('scroll',scheduleTracking,{passive:true});
  window.addEventListener('resize',()=>{cancelNavigation();scheduleTracking();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)cancelNavigation();});
  motion.addEventListener?.('change',()=>{cancelNavigation();if(!canAnimate())sections.forEach(s=>s.classList.remove('chapter-enter'));});
  if('MutationObserver' in window)new MutationObserver(()=>{
    if(!canAnimate()){cancelNavigation();sections.forEach(s=>s.classList.remove('chapter-enter'));}
  }).observe(root,{attributes:true,attributeFilter:['class']});
  trackChapter();
})();
