document.querySelector('.mobile-toggle')?.addEventListener('click',()=>document.querySelector('.header')?.classList.toggle('open'));
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.querySelector('.contact-form')?.addEventListener('submit',event=>{event.preventDefault();const button=event.currentTarget.querySelector('button');button.textContent='Thank you — we will contact you';button.disabled=true});


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
