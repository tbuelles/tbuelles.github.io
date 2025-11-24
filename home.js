document.addEventListener('click', (e) => {
  if (!e.target.matches('.copy-btn')) return;
  const id = e.target.getAttribute('data-target');
  const text = document.getElementById(id).innerText;
  navigator.clipboard?.writeText(text).then(() => {
    const old = e.target.innerText;
    e.target.innerText = 'Copied';
    setTimeout(()=> e.target.innerText = old, 1200);
  });
});

(function () {
  // create the floating tooltip element once
  const tip = document.createElement('div');
  tip.className = 'footnote-tip';
  tip.setAttribute('role', 'note');
  document.body.appendChild(tip);

  // find footnote refs and install handlers
  const refs = Array.from(document.querySelectorAll('.footnote-ref'));
  refs.forEach((el, i) => {
    // number the ref (wrap in <sup>)
    const n = i + 1;
    el.innerHTML = '<sup aria-hidden="true">' + n + '</sup>';
    el.setAttribute('tabindex', '0');           // keyboard focusable
    el.setAttribute('aria-describedby', 'fn-' + n);

    const noteText = el.getAttribute('data-note') || '';

    // handlers to show/hide tip
    const show = (evt) => {
      tip.innerText = noteText;
      tip.classList.add('show');

      // try to position vertically near the element (avoid overflow)
      const rect = el.getBoundingClientRect();
      const tipHeight = tip.offsetHeight || 100; // fallback
      // target top: align roughly with element center, but clamp to viewport
      const desiredTop = rect.top + window.scrollY - (tipHeight / 2) + (rect.height / 2);
      const minTop = 10 + window.scrollY;
      const maxTop = window.scrollY + window.innerHeight - tip.offsetHeight - 10;
      const top = Math.max(minTop, Math.min(desiredTop, maxTop));
      tip.style.top = (top - window.scrollY) + 'px'; // fixed positioning relative to viewport
      tip.setAttribute('id', 'fn-' + n);
    };

    const hide = () => {
      tip.classList.remove('show');
    };

    // mouse and keyboard interactions
    el.addEventListener('mouseenter', show);
    el.addEventListener('mouseleave', hide);
    el.addEventListener('focus', show);
    el.addEventListener('blur', hide);

    // keep visible if pointer moves from ref into tooltip
    tip.addEventListener('mouseenter', () => tip.classList.add('show'));
    tip.addEventListener('mouseleave', hide);
  });

  // hide on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') tip.classList.remove('show');
  });
})();


// // copy raw
// document.addEventListener('click', (e) => {
//   if (!e.target.matches('.copy-btn')) return;
//   const id = e.target.getAttribute('data-target');
//   const codeEl = document.getElementById(id);
//   if (!codeEl) return;
//   const text = codeEl.dataset.raw || codeEl.innerText;
//   navigator.clipboard?.writeText(text).then(() => {
//     const old = e.target.innerText;
//     e.target.innerText = 'Copied';
//     setTimeout(()=> e.target.innerText = old, 1200);
//   });
// });
