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

document.addEventListener("DOMContentLoaded", function () {
  // Create / find the floating box
  let box = document.querySelector(".footnote-box");
  if (!box) {
    box = document.createElement("div");
    box.className = "footnote-box";
    document.body.appendChild(box);
  }

  // Attach click handlers to refs
  document.querySelectorAll(".footnote-ref").forEach((ref, idx) => {
    const source = ref.nextElementSibling; // expects .footnote-source next
    if (!source || !source.classList.contains("footnote-source")) return;

    ref.textContent = idx + 1;  // 1,2,3,...
    ref.addEventListener("click", () => {
      box.innerHTML = source.innerHTML;
      box.classList.add("show");
    });
  });

  // Close when clicking outside
  document.addEventListener("click", e => {
    if (!e.target.closest(".footnote-ref") && !e.target.closest(".footnote-box")) {
      box.classList.remove("show");
    }
  });

  // 🔹 Close when pressing ESC
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" || e.key === "Esc") {
      box.classList.remove("show");
    }
  });
});
