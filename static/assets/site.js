document.querySelector('.mobile-toggle')?.addEventListener('click',()=>document.querySelector('.header')?.classList.toggle('open'));
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const typingProduct=document.querySelector('.typing-product');
if(typingProduct&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  const products=(typingProduct.dataset.products||'').split('|').filter(Boolean);
  let productIndex=0;
  let letterIndex=0;
  let deleting=false;
  typingProduct.textContent='';
  const typeNext=()=>{
    const word=products[productIndex];
    if(!deleting){
      letterIndex++;
      typingProduct.textContent=word.slice(0,letterIndex);
      if(letterIndex===word.length){
        deleting=true;
        window.setTimeout(typeNext,1450);
      }else{
        window.setTimeout(typeNext,72);
      }
    }else{
      letterIndex--;
      typingProduct.textContent=word.slice(0,letterIndex);
      if(letterIndex===0){
        deleting=false;
        productIndex=(productIndex+1)%products.length;
        window.setTimeout(typeNext,320);
      }else{
        window.setTimeout(typeNext,38);
      }
    }
  };
  window.setTimeout(typeNext,350);
}


document.querySelectorAll('.product-menu').forEach((menu)=>{
  const trigger=menu.querySelector('.product-menu-trigger');
  let closeTimer;
  const openMenu=()=>{
    window.clearTimeout(closeTimer);
    menu.classList.add('menu-open');
    trigger?.setAttribute('aria-expanded','true');
  };
  const closeMenu=()=>{
    window.clearTimeout(closeTimer);
    closeTimer=window.setTimeout(()=>{
      menu.classList.remove('menu-open');
      trigger?.setAttribute('aria-expanded','false');
    },180);
  };
  menu.addEventListener('mouseenter',openMenu);
  menu.addEventListener('mouseleave',closeMenu);
  menu.addEventListener('focusin',openMenu);
  menu.addEventListener('focusout',(event)=>{
    if(!menu.contains(event.relatedTarget)) closeMenu();
  });
});

const contactStage=document.querySelector('#contact-stage');
if(contactStage&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  contactStage.addEventListener('pointermove',(event)=>{
    const rect=contactStage.getBoundingClientRect();
    contactStage.style.setProperty('--mx',((event.clientX-rect.left)/rect.width*100).toFixed(1)+'%');
    contactStage.style.setProperty('--my',((event.clientY-rect.top)/rect.height*100).toFixed(1)+'%');
  });
}
const contactForm=document.querySelector('.contact-form');
const successModal=document.querySelector('#agent-success-modal');
const closeSuccess=()=>{
  if(!successModal)return;
  successModal.hidden=true;
  document.body.style.overflow='';
};
contactForm?.addEventListener('submit',(event)=>{
  event.preventDefault();
  if(!contactForm.checkValidity()){contactForm.reportValidity();return;}
  if(successModal){
    successModal.hidden=false;
    document.body.style.overflow='hidden';
    successModal.querySelector('[data-close-success]')?.focus();
  }
  contactForm.reset();
});
document.querySelectorAll('[data-close-success]').forEach(button=>button.addEventListener('click',closeSuccess));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&successModal&&!successModal.hidden)closeSuccess()});
