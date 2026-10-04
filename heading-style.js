/* Decorate existing translated headings; no text or images are replaced. */
(() => {
  'use strict';
  const headings=[...document.querySelectorAll('.section-heading h2[data-i18n],#contact-title')];
  function decorate(heading){
    if(heading.querySelector('.title-line'))return;
    const arrow=heading.id==='contact-title'?[...heading.children].find(el=>el.textContent.trim()==='↗'):null;
    const text=[...heading.childNodes].map(node=>node===arrow?'':node.nodeName==='BR'?'\n':node.textContent).join('');
    const lines=text.split(/\n/).map(line=>line.trim()).filter(Boolean);
    if(!lines.length)return;
    const fragments=lines.map((line,i)=>{
      const span=document.createElement(i?'em':'span');span.className=i?'title-line title-accent':'title-line';span.textContent=line;return span;
    });
    heading.replaceChildren(...fragments.flatMap((fragment,i)=>i?['\n',fragment]:[fragment]));
    if(arrow){arrow.className='title-arrow';arrow.setAttribute('aria-hidden','true');heading.append(arrow);}
    heading.classList.add('expressive-title');
  }
  headings.forEach(decorate);
  if('MutationObserver' in window){
    const observer=new MutationObserver(()=>headings.forEach(decorate));
    headings.forEach(heading=>observer.observe(heading,{childList:true,characterData:true,subtree:true}));
  }
})();
