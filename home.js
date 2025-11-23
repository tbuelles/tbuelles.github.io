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
