/* Plain JavaScript: no build step, framework or remote font dependency. */
(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let language = 'vi';
  try { const saved = localStorage.getItem('tharo-language'); if (saved === 'vi' || saved === 'en') language = saved; } catch (_) {}
  let filter = 'all';
  let galleryItems = [];
  let lightboxIndex = 0;
  let lightboxItems = [];
  let slide = 0;
  let timer;
  let paused = motion.matches;
  let effectsPaused = motion.matches;
  let activeTrigger;
  const lightbox = $('#lightbox');
  const text = () => PORTFOLIO[language];
  function element(tag, className, value) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (value !== undefined) el.textContent = value;
    return el;
  }
  function taskList(items) {
    const ul = element('ul');
    items.forEach(item => ul.append(element('li', '', item)));
    return ul;
  }
  function detailsContent(item) {
    const container = element('div', 'detail-content');
    if (item.tasks.length) {
      container.append(element('h4', '', text().working));
      container.append(taskList(item.tasks));
    }
    if (item.results.length) {
      container.append(element('h4', '', text().results), taskList(item.results));
    }
    return container;
  }
  function createDetails(item) {
    const details = element('details', 'work-details');
    details.append(element('summary', '', text().details), detailsContent(item));
    return details;
  }
  function renderExperiences() {
    const list = $('#experience-list');
    const openStates = $$('details', list).map(item => item.open);
    list.replaceChildren();
    text().jobs.forEach((job, i) => {
      const article = element('article', 'experience-card reveal');
      article.append(element('span', 'experience-number', String(i+1).padStart(2,'0')));
      const copy = element('div', 'experience-copy');
      const meta = element('div', 'experience-meta');
      meta.append(element('span', '', job.category), element('span', '', job.date));
      copy.append(meta, element('h3', '', job.name), element('p', 'job-role', job.role));
      const details = createDetails(job);
      details.open = !!openStates[i];
      copy.append(details);
      const media = element('button', 'experience-media');
      media.type = 'button';
      media.setAttribute('aria-label', `${text().photo}: ${job.name}`);
      const img = element('img', 'experience-image');
      img.src = `assets/${job.image}.jpg`;
      img.alt = job.name;
      img.loading = 'eager';
      const expand = element('span','image-expand','↗');
      expand.setAttribute('aria-hidden','true');
      media.append(img,expand);
      media.addEventListener('click', () => openLightbox([{src:img.getAttribute('src'),caption:job.name}], 0, media));
      article.append(copy,media);
      list.append(article);
    });
    observeReveals();
  }
  function renderClubs() {
    const container = $('#activity-details');
    const oldStates = new Map($$('article',container).map(a=>[a.dataset.group,$('details',a)?.open]));
    container.replaceChildren();
    text().clubs.forEach(club => {
      if (filter !== 'all' && club.group !== filter) return;
      const article = element('article','activity-detail');
      article.dataset.group = club.group;
      if (club.logo) {
        const logoButton = element('button','club-logo-button');
        logoButton.type='button';logoButton.setAttribute('aria-label',`Logo — ${club.name}`);
        const logo = element('img','club-logo');
        logo.src = `assets/${club.logo}.${club.logoExtension || 'jpg'}`; logo.alt = `Logo ${club.name}`; logo.loading='lazy';
        logoButton.append(logo);
        logoButton.addEventListener('click',()=>openLightbox([{src:logo.getAttribute('src'),caption:`Logo ${club.name}`}],0,logoButton));
        article.append(logoButton);
      }
      article.append(element('h3','',club.name),element('p','job-role',club.role));
      if (club.date) article.append(element('p','experience-meta',club.date));
      if (club.tasks.length || club.results.length) {
        const details = createDetails(club); details.open = !!oldStates.get(club.group); article.append(details);
      }
      container.append(article);
    });
  }
  function renderGallery() {
    galleryItems = GALLERY.filter(item => filter === 'all' || item.group === filter);
    const container = $('#gallery-grid');
    container.replaceChildren();
    galleryItems.forEach((item,i) => {
      const button = element('button',`gallery-item${item.portrait?' portrait':''}`);
      button.type='button';
      button.style.animationDelay = `${Math.min(i * 18,150)}ms`;
      button.setAttribute('aria-label',`${item.label} — ${text().photo} ${i+1}`);
      const frame = element('span','gallery-image-frame');
      const img = element('img');
      img.src=`assets/${item.image}.jpg`; img.alt=`${item.label} — ${text().photo} ${i+1}`; img.loading='lazy';img.decoding='async';
      const expand=element('span','image-expand','↗');expand.setAttribute('aria-hidden','true');frame.append(img,expand);
      const caption=element('span','gallery-caption');caption.append(element('span','',item.label),element('span','',String(i+1).padStart(2,'0')));
      button.append(frame,caption);
      button.addEventListener('click',()=>openLightbox(galleryItems.map((g,j)=>({src:`assets/${g.image}.jpg`,caption:`${g.label} · ${text().photo} ${j+1}`})),i,button));
      container.append(button);
    });
    renderClubs();
  }
  function setLanguage(next) {
    language=next;
    document.documentElement.lang=language;
    try {localStorage.setItem('tharo-language',language);} catch (_) {}
    $$('[data-i18n]').forEach(el=>{
      const value=text()[el.dataset.i18n];
      if (typeof value !== 'string') return;
      if (el.id==='contact-title') {
        el.replaceChildren(document.createTextNode(value));
        const arrow=element('span','','↗');arrow.setAttribute('aria-hidden','true');el.append(arrow);
      } else el.textContent=value;
    });
    $$('[data-lang]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.lang===language)));
    $$('[data-close-dialog]').forEach(button=>button.setAttribute('aria-label',text().close));
    [['[data-lightbox-prev]','previousPhoto'],['[data-lightbox-next]','nextPhoto']].forEach(([selector,key])=>$(selector).setAttribute('aria-label',text()[key]));
    $$('[data-slide]').forEach((button,i)=>button.setAttribute('aria-label',`${text().photo} ${i+1}`));
    $('.slide-pause').setAttribute('aria-label',paused?text().resume:text().pause);
    updateMotionControl();
    document.querySelector('meta[name="description"]').content=language==='vi'?'Portfolio 2026 của Phương Thảo — kinh nghiệm bán hàng, chăm sóc khách hàng, nội dung và hoạt động ngoại khóa.':'Phương Thảo — Portfolio 2026. Sales, customer service, creative work and extracurricular activities.';
    renderExperiences();renderGallery();
  }
  let revealObserver;
  if ('IntersectionObserver' in window) {
    if (!motion.matches) document.documentElement.classList.add('js-motion');
    revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if (entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target);}
    }),{threshold:.08});
  }
  function observeReveals(){
    if (revealObserver) $$('.reveal:not(.is-visible)').forEach(el=>revealObserver.observe(el));
  }
  function openDialog(dialog,trigger) {
    activeTrigger=trigger;
    if(typeof dialog.showModal==='function') dialog.showModal();
    else {dialog.setAttribute('open','');dialog.setAttribute('role','dialog');dialog.setAttribute('aria-modal','true');}
    $('[data-close-dialog]',dialog).focus();
  }
  function closeDialog(dialog) {
    if(typeof dialog.close==='function') dialog.close();else dialog.removeAttribute('open');
    activeTrigger?.focus();
  }
  function openLightbox(items,index,trigger) {
    lightboxItems=items;lightboxIndex=index;updateLightbox();openDialog(lightbox,trigger);
  }
  function updateLightbox() {
    const item=lightboxItems[lightboxIndex];if(!item)return;
    $('#lightbox-photo').src=item.src;$('#lightbox-photo').alt=item.caption;
    $('#lightbox-caption').textContent=item.caption;$('#lightbox-count').textContent=`${lightboxIndex+1} / ${lightboxItems.length}`;
    $('[data-lightbox-prev]').disabled=lightboxItems.length<2;$('[data-lightbox-next]').disabled=lightboxItems.length<2;
  }
  function stepLightbox(step) {lightboxIndex=(lightboxIndex+step+lightboxItems.length)%lightboxItems.length;updateLightbox();}
  $$('[data-lightbox-image]').forEach(button=>button.addEventListener('click',()=>openLightbox([{src:button.dataset.lightboxImage,caption:button.dataset.lightboxLabel}],0,button)));
  $$('[data-close-dialog]').forEach(button=>button.addEventListener('click',()=>closeDialog(button.closest('dialog'))));
  [lightbox].forEach(dialog=>{
    dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeDialog(dialog);}});
    dialog.addEventListener('close',()=>activeTrigger?.focus());
    dialog.addEventListener('keydown',event=>{
      if(event.key==='ArrowLeft'||event.key==='ArrowRight'){
        event.preventDefault();const step=event.key==='ArrowLeft'?-1:1;
        stepLightbox(step);
      }
      if(event.key==='Escape'&&typeof dialog.close!=='function')closeDialog(dialog);
      if(event.key==='Tab'&&typeof dialog.showModal!=='function'){
        const focusable=$$('button:not(:disabled),select,a[href]',dialog);const first=focusable[0],last=focusable.at(-1);
        if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
        else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
      }
    });
  });
  $('[data-lightbox-prev]').addEventListener('click',()=>stepLightbox(-1));$('[data-lightbox-next]').addEventListener('click',()=>stepLightbox(1));
  $$('[data-lang]').forEach(button=>button.addEventListener('click',()=>setLanguage(button.dataset.lang)));
  $$('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
    filter=button.dataset.filter;
    $$('[data-filter]').forEach(el=>{el.classList.toggle('is-active',el===button);el.setAttribute('aria-pressed',String(el===button));});
    renderGallery();
  }));
  const menu=$('.menu-toggle');
  function closeMenu(){menu.setAttribute('aria-expanded','false');$('#mobile-nav').hidden=true;}
  menu.addEventListener('click',()=>{const expanded=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!expanded));$('#mobile-nav').hidden=expanded;});
  $$('#mobile-nav a').forEach(link=>link.addEventListener('click',closeMenu));
  document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
  function setSlide(next){slide=next;$$('.hero-photo').forEach((img,i)=>img.classList.toggle('is-current',i===slide));$$('[data-slide]').forEach((button,i)=>{button.classList.toggle('is-current',i===slide);button.setAttribute('aria-pressed',String(i===slide));});$('.slide-count').textContent=`${String(slide+1).padStart(2,'0')} / 03`;}
  function resetTimer(){clearInterval(timer);if(!paused&&!effectsPaused&&!motion.matches&&!document.hidden)timer=setInterval(()=>setSlide((slide+1)%3),6500);}
  $$('[data-slide]').forEach(button=>button.addEventListener('click',()=>{setSlide(Number(button.dataset.slide));resetTimer();}));
  $('.slide-pause').addEventListener('click',()=>{paused=!paused;$('.slide-pause').textContent=paused?'▷':'Ⅱ';$('.slide-pause').setAttribute('aria-pressed',String(paused));$('.slide-pause').setAttribute('aria-label',paused?text().resume:text().pause);resetTimer();});
  document.addEventListener('visibilitychange',resetTimer);
  motion.addEventListener?.('change',()=>{paused=motion.matches;effectsPaused=motion.matches;document.documentElement.classList.toggle('js-motion',!motion.matches);$('.slide-pause').textContent=paused?'▷':'Ⅱ';$('.slide-pause').setAttribute('aria-pressed',String(paused));updateMotionControl();resetTimer();});
  function updateMotionControl(){
    document.documentElement.classList.toggle('motion-paused',effectsPaused);
    const control=$('.motion-control');
    control.setAttribute('aria-pressed',String(effectsPaused));
    $('[data-motion-label]').textContent=language==='vi'?(effectsPaused?'Bật hiệu ứng':'Tạm dừng hiệu ứng'):(effectsPaused?'Enable motion':'Pause animations');
  }
  $('.motion-control').addEventListener('click',()=>{effectsPaused=!effectsPaused;updateMotionControl();resetTimer();});
  const heroArt=$('.hero-art');
  let pointerQueued=false;
  let pointerPosition={x:0,y:0};
  heroArt.addEventListener('pointermove',event=>{
    if(event.pointerType==='touch'||motion.matches||effectsPaused)return;
    const rect=heroArt.getBoundingClientRect();
    pointerPosition={x:(event.clientX-rect.left)/rect.width-.5,y:(event.clientY-rect.top)/rect.height-.5};
    if(pointerQueued)return;
    pointerQueued=true;
    requestAnimationFrame(()=>{
      heroArt.style.setProperty('--tilt-x',`${-pointerPosition.y*9}deg`);
      heroArt.style.setProperty('--tilt-y',`${pointerPosition.x*9}deg`);
      heroArt.style.setProperty('--depth-x',`${pointerPosition.x*12}px`);
      heroArt.style.setProperty('--depth-y',`${pointerPosition.y*12}px`);
      pointerQueued=false;
    });
  });
  heroArt.addEventListener('pointerleave',()=>{['--tilt-x','--tilt-y','--depth-x','--depth-y'].forEach(property=>heroArt.style.removeProperty(property));});
  let toastTimeout;
  function toast(message){const el=$('.toast');el.textContent=message;el.classList.add('is-visible');clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>el.classList.remove('is-visible'),4000);}
  $('.copy-email').addEventListener('click',async()=>{
    try {
      if(navigator.clipboard?.writeText){await navigator.clipboard.writeText('dangthao983999@gmail.com');}
      else {const temp=element('textarea','','dangthao983999@gmail.com');temp.style.position='fixed';temp.style.opacity='0';document.body.append(temp);temp.select();const copied=document.execCommand('copy');temp.remove();if(!copied)throw new Error('Copy unavailable');}
      toast(text().copied);
    } catch(_){toast(text().copyFailed);}
  });
  function progress(){const max=document.documentElement.scrollHeight-window.innerHeight;$('.reading-progress').style.width=`${max>0?Math.min(100,window.scrollY/max*100):0}%`;}
  let scrollQueued=false;
  window.addEventListener('scroll',()=>{if(!scrollQueued){scrollQueued=true;requestAnimationFrame(()=>{progress();scrollQueued=false;});}},{passive:true});
  window.addEventListener('resize',progress);
  function createBackgroundMotion(){
    const ns='http://www.w3.org/2000/svg';
    const definitions=[
      {kind:'flower',viewBox:'-90 -90 180 180',paths:['M0-58C27-111 76-58 33-19C101-18 100 52 35 32C55 99-15 110-18 42C-59 94-110 44-48 13C-115-17-79-80-29-41C-32-106 34-112 0-58Z'],circle:true},
      {kind:'orbit',viewBox:'0 0 240 180',paths:['M24 98C-14 24 104-15 195 47S230 171 113 147S-10 52 104 32S268 119 162 151']},
      {kind:'spark',viewBox:'0 0 60 60',paths:['M30 2C32 22 38 28 58 30C38 32 32 38 30 58C28 38 22 32 2 30C22 28 28 22 30 2Z']},
      {kind:'petal',viewBox:'0 0 80 120',paths:['M40 110C-19 81-7 17 40 4C87 17 99 81 40 110Z','M40 17V101']}
    ];
    $$('.section-pattern').forEach((layer,index)=>{
      const glow=element('span','section-glow');layer.append(glow);
      definitions.forEach((definition,i)=>{
        const svg=document.createElementNS(ns,'svg');svg.setAttribute('viewBox',definition.viewBox);
        svg.setAttribute('aria-hidden','true');svg.setAttribute('focusable','false');
        svg.classList.add('floating-motif',`motif-${definition.kind}`);
        svg.style.setProperty('--motif-delay',`${-(index*4+i*3)}s`);
        svg.style.setProperty('--motif-duration',`${19+index*4+i*3}s`);
        definition.paths.forEach(d=>{const path=document.createElementNS(ns,'path');path.setAttribute('d',d);path.setAttribute('pathLength','100');svg.append(path);});
        if(definition.circle){const circle=document.createElementNS(ns,'circle');circle.setAttribute('r','9');svg.append(circle);}
        layer.append(svg);
      });
      for(let i=0;i<4;i++){
        const dot=element('span','drifting-light');dot.style.setProperty('--dot-left',`${13+i*23+index*2}%`);dot.style.setProperty('--dot-top',`${16+(i*29+index*17)%70}%`);dot.style.setProperty('--dot-delay',`${-i*3-index*2}s`);layer.append(dot);
      }
    });
    if('IntersectionObserver' in window){
      const observer=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle('motion-outside',!entry.isIntersecting)),{rootMargin:'120px',threshold:0});
      $$('.section-pattern').forEach(layer=>observer.observe(layer));
    }
  }
  createBackgroundMotion();
  if('IntersectionObserver' in window){const navObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){$$('.desktop-nav a').forEach(a=>a.classList.toggle('is-active',a.hash===`#${entry.target.id}`));}
  }),{rootMargin:'-10% 0px -65% 0px',threshold:0});$$('main section[id]').forEach(section=>navObserver.observe(section));}
  setLanguage(language);observeReveals();resetTimer();progress();
  $('.slide-pause').textContent=paused?'▷':'Ⅱ';$('.slide-pause').setAttribute('aria-pressed',String(paused));
})();
