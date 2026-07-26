document.querySelector('.mobile-toggle')?.addEventListener('click',()=>document.querySelector('.header')?.classList.toggle('open'));
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.querySelector('.contact-form')?.addEventListener('submit',event=>{event.preventDefault();const button=event.currentTarget.querySelector('button');button.textContent='Thank you — we will contact you';button.disabled=true});
