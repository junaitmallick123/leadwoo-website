(() => {
  const template = document.getElementById('pricing-mascot-template');
  const mascot = template.content.firstElementChild.cloneNode(true);
  const cards = document.querySelectorAll('.outreach-plans > .growth-plan');
  let activeCard;
  let pointedCard;

  function showGuide(card) {
    if (activeCard === card) return;
    activeCard = card;
    pointedCard?.removeAttribute('data-guide-target');
    pointedCard = null;
    mascot.remove();

    const guide = card?.querySelector('.pricing-plan-guide');
    if (!guide) return;
    const link = guide.querySelector('a');
    pointedCard = document.getElementById(link.hash.slice(1));
    pointedCard?.setAttribute('data-guide-target', '');
    guide.prepend(mascot);
  }

  function focusedCard() {
    return document.activeElement?.closest('.outreach-plans > .growth-plan');
  }

  for (const card of cards) {
    card.addEventListener('pointerenter', () => showGuide(card));
    card.addEventListener('pointerleave', event => {
      if (event.pointerType !== 'touch' && activeCard === card) showGuide(focusedCard());
    });
    card.addEventListener('focusin', () => showGuide(card));
    card.addEventListener('focusout', event => {
      if (activeCard !== card || card.contains(event.relatedTarget)) return;
      if (!card.matches(':hover')) showGuide();
    });
  }
})();
