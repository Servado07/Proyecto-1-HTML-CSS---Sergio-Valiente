// --- ICONOS SVG MINIMALISTAS ---
const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;

const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

// --- MODO OSCURO / CLARO ---
const themeBtn = document.getElementById("theme-toggle");
const body = document.body;

// Comprobar si hay un tema guardado en el navegador
const currentTheme = localStorage.getItem("theme");
if (currentTheme === "light") {
  body.classList.add("light-theme");
  themeBtn.innerHTML = moonIcon; // Mostrar Luna si está en modo claro
} else {
  themeBtn.innerHTML = sunIcon; // Mostrar Sol si está en modo oscuro (por defecto)
}

themeBtn.addEventListener("click", () => {
  body.classList.toggle("light-theme");

  if (body.classList.contains("light-theme")) {
    localStorage.setItem("theme", "light");
    themeBtn.innerHTML = moonIcon; // Cambiar icono a Luna
  } else {
    localStorage.setItem("theme", "dark");
    themeBtn.innerHTML = sunIcon; // Cambiar icono a Sol
  }
});

// --- EFECTO NAVBAR DINÁMICA ---
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// --- BOTONES "VER MÁS" ---
const loadMoreBtn = document.getElementById("load-more");
const hiddenImages = document.querySelectorAll(".hidden-img");

if (loadMoreBtn) {
  loadMoreBtn.addEventListener("click", () => {
    hiddenImages.forEach((img) => {
      if (img.style.display === "block") {
        img.style.display = "none";
        loadMoreBtn.innerText = "Ver todas las fotos";
      } else {
        img.style.display = "block";
        loadMoreBtn.innerText = "Ver menos";
      }
    });
  });
}

const loadMore3dBtn = document.getElementById("load-more-3d");
const hidden3dImages = document.querySelectorAll(".hidden-3d-img");

if (loadMore3dBtn) {
  loadMore3dBtn.addEventListener("click", () => {
    hidden3dImages.forEach((img) => {
      if (img.style.display === "block") {
        img.style.display = "none";
        loadMore3dBtn.innerText = "Ver más diseños";
      } else {
        img.style.display = "block";
        loadMore3dBtn.innerText = "Ver menos";
      }
    });
  });
}

// --- ANIMACIONES DE APARICIÓN (REVEAL) ---
function reveal() {
  var reveals = document.querySelectorAll(".reveal");
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    }
  }
}

window.addEventListener("scroll", reveal);
reveal();

// --- DESPLAZAMIENTO SUAVE ---
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    // Cerrar menú en móviles si se hace clic
    const menuToggle = document.getElementById("menu-toggle");
    if (menuToggle && menuToggle.checked) {
      menuToggle.checked = false;
    }

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
