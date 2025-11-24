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

document.addEventListener("DOMContentLoaded", function () {
  const today = new Date();
  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];
  const formatted = `${months[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;

  document.querySelectorAll(".today").forEach(el => {
    el.textContent = formatted;
  });
});
