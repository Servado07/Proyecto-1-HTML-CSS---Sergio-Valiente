// =====================================================
// PORTFOLIO SERGIO VALIENTE - INTERACCIONES PREMIUM
// =====================================================

const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

const body = document.body;
const navbar = document.querySelector(".navbar");
const themeBtn = document.getElementById("theme-toggle");
const menuToggle = document.getElementById("menu-toggle");
const navLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
const sections = [...document.querySelectorAll("header[id], main section[id], footer[id]")];
const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

// Barra de progreso de lectura
const scrollProgress = document.createElement("div");
scrollProgress.className = "scroll-progress";
scrollProgress.setAttribute("aria-hidden", "true");
document.body.prepend(scrollProgress);

function updateScrollProgress() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  scrollProgress.style.width = `${Math.min(progress, 100)}%`;
}

// Tema claro/oscuro persistente
function setTheme(theme) {
  const isLight = theme === "light";
  body.classList.toggle("light-theme", isLight);
  localStorage.setItem("theme", isLight ? "light" : "dark");
  if (themeBtn) themeBtn.innerHTML = isLight ? moonIcon : sunIcon;
}

setTheme(localStorage.getItem("theme") === "light" ? "light" : "dark");

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    setTheme(body.classList.contains("light-theme") ? "dark" : "light");
  });
}

// Navbar compacta al hacer scroll
function updateNavbar() {
  if (!navbar) return;
  navbar.classList.toggle("scrolled", window.scrollY > 40);
}

// Menú móvil: cerrar al navegar, al pulsar fuera o con Escape
function closeMobileMenu() {
  if (menuToggle) menuToggle.checked = false;
}

navLinks.forEach((link) => link.addEventListener("click", closeMobileMenu));

document.addEventListener("click", (event) => {
  if (!navbar || !menuToggle || !menuToggle.checked) return;
  if (!navbar.contains(event.target)) closeMobileMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMobileMenu();
});

// Enlace activo por sección visible
if ("IntersectionObserver" in window && sections.length) {
  const activeObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`);
      });
    },
    { threshold: [0.18, 0.35, 0.55], rootMargin: "-18% 0px -58% 0px" }
  );

  sections.forEach((section) => activeObserver.observe(section));
}

// Scroll suave con offset nativo
const internalAnchors = document.querySelectorAll('a[href^="#"]');
internalAnchors.forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetSelector = anchor.getAttribute("href");
    const target = document.querySelector(targetSelector);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Botones de galería "ver más"
function setupLoadMore(buttonId, hiddenSelector, expandedText, collapsedText) {
  const button = document.getElementById(buttonId);
  const hiddenItems = document.querySelectorAll(hiddenSelector);

  if (!button || !hiddenItems.length) return;

  hiddenItems.forEach((item) => {
    item.style.display = "none";
  });

  button.dataset.expanded = "false";
  button.addEventListener("click", () => {
    const isExpanded = button.dataset.expanded === "true";
    hiddenItems.forEach((item) => {
      item.style.display = isExpanded ? "none" : "block";
    });
    button.textContent = isExpanded ? collapsedText : expandedText;
    button.dataset.expanded = String(!isExpanded);
  });
}

setupLoadMore("load-more", ".hidden-img", "Ver menos", "Ver todas las fotos");
setupLoadMore("load-more-3d", ".hidden-3d-img", "Ver menos", "Ver más diseños");

// Animaciones al aparecer
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );

  revealElements.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index * 35, 220)}ms`;
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => element.classList.add("active"));
}

// Efecto premium de brillo según posición del ratón en tarjetas
if (canHover) {
  document.querySelectorAll(".card, .glass").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--mx", `${x}%`);
      card.style.setProperty("--my", `${y}%`);
    });
  });

  document.querySelectorAll(".tilt-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty("--ry", `${x * 8}deg`);
      card.style.setProperty("--rx", `${y * -8}deg`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--ry", "0deg");
      card.style.setProperty("--rx", "0deg");
    });
  });
}

// Lightbox para galerías
const galleryImages = document.querySelectorAll(".gallery-grid img, .gallery-3d-mini img");
if (galleryImages.length) {
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.innerHTML = `<button type="button" aria-label="Cerrar imagen">×</button><img alt="" />`;
  document.body.append(lightbox);

  const lightboxImg = lightbox.querySelector("img");
  const closeBtn = lightbox.querySelector("button");

  function openLightbox(source) {
    if (!lightboxImg) return;
    lightboxImg.src = source.src;
    lightboxImg.alt = source.alt || "Imagen ampliada";
    lightbox.classList.add("open");
    document.documentElement.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    document.documentElement.style.overflow = "";
  }

  galleryImages.forEach((image) => {
    image.setAttribute("tabindex", "0");
    image.addEventListener("click", () => openLightbox(image));
    image.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(image);
      }
    });
  });

  closeBtn?.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
  });
}

// Botón volver arriba
const backToTop = document.createElement("button");
backToTop.className = "back-to-top";
backToTop.type = "button";
backToTop.setAttribute("aria-label", "Volver arriba");
backToTop.innerHTML = "↑";
document.body.append(backToTop);

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

function updateBackToTop() {
  backToTop.classList.toggle("visible", window.scrollY > 620);
}

// Mejoras de carga de imágenes
const allImages = document.querySelectorAll("img");
allImages.forEach((img) => {
  if (!img.hasAttribute("decoding")) img.setAttribute("decoding", "async");
});

let ticking = false;
function onScroll() {
  if (ticking) return;
  window.requestAnimationFrame(() => {
    updateNavbar();
    updateScrollProgress();
    updateBackToTop();
    ticking = false;
  });
  ticking = true;
}

window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", updateScrollProgress);

updateNavbar();
updateScrollProgress();
updateBackToTop();
