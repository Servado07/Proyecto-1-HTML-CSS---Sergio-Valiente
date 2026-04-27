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

// --- UPGRADE: luz reactiva, navegación activa y galería premium ---
document.addEventListener("pointermove", (event) => {
  const x = Math.round((event.clientX / window.innerWidth) * 100);
  const y = Math.round((event.clientY / window.innerHeight) * 100);
  document.documentElement.style.setProperty("--mx", `${x}%`);
  document.documentElement.style.setProperty("--my", `${y}%`);
});

const sections = document.querySelectorAll(
  "main section[id], header[id], footer[id]",
);
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const setActiveNav = () => {
  let currentId = "inicio";
  sections.forEach((section) => {
    const top = section.getBoundingClientRect().top;
    if (top <= 140) currentId = section.id;
  });

  navAnchors.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${currentId}`,
    );
  });
};

window.addEventListener("scroll", setActiveNav, { passive: true });
setActiveNav();

const lightbox = document.createElement("div");
lightbox.className = "lightbox";
lightbox.innerHTML =
  '<button type="button" aria-label="Cerrar imagen">×</button><img alt="Imagen ampliada" />';
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector("img");
const closeLightbox = () => lightbox.classList.remove("active");

lightbox.querySelector("button").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
});

document
  .querySelectorAll(".gallery-grid img, .gallery-3d-mini img")
  .forEach((image) => {
    image.addEventListener("click", () => {
      lightboxImg.src = image.src;
      lightboxImg.alt = image.alt || "Imagen ampliada";
      lightbox.classList.add("active");
    });
  });

const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", () => {
    const button = form.querySelector('button[type="submit"]');
    if (button) button.textContent = "Enviando...";
  });
}

// --- STELLAR UPGRADE: starfield canvas, cursor premium, tilt 3D y microinteracciones ---
(() => {
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const progress = document.querySelector(".scroll-progress");
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    if (progress) progress.style.width = `${pct}%`;
  };
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  let mx = innerWidth / 2,
    my = innerHeight / 2,
    rx = mx,
    ry = my;
  document.addEventListener(
    "pointermove",
    (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot)
        dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    },
    { passive: true },
  );
  const animateCursor = () => {
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    if (ring)
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateCursor);
  };
  animateCursor();

  document
    .querySelectorAll("a, button, input, textarea, .card, img")
    .forEach((el) => {
      el.addEventListener("pointerenter", () =>
        document.body.classList.add("cursor-hover"),
      );
      el.addEventListener("pointerleave", () =>
        document.body.classList.remove("cursor-hover"),
      );
    });

  document
    .querySelectorAll(".card, .aura-brand-box, .contact-box, .final-cta-inner")
    .forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty("--card-x", `${x}%`);
        card.style.setProperty("--card-y", `${y}%`);
        card.style.setProperty("--tilt-x", `${((x - 50) / 50) * 5}deg`);
        card.style.setProperty("--tilt-y", `${((50 - y) / 50) * 5}deg`);
      });
      card.addEventListener("pointerleave", () => {
        card.style.setProperty("--tilt-x", "0deg");
        card.style.setProperty("--tilt-y", "0deg");
      });
    });

  if (!prefersReduced) {
    const canvas = document.getElementById("starfield");
    const ctx = canvas && canvas.getContext("2d");
    if (canvas && ctx) {
      let stars = [];
      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.floor(innerWidth * dpr);
        canvas.height = Math.floor(innerHeight * dpr);
        canvas.style.width = `${innerWidth}px`;
        canvas.style.height = `${innerHeight}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const count = Math.min(
          145,
          Math.floor((innerWidth * innerHeight) / 9800),
        );
        stars = Array.from({ length: count }, () => ({
          x: Math.random() * innerWidth,
          y: Math.random() * innerHeight,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: Math.random() * 1.8 + 0.4,
          a: Math.random() * 0.65 + 0.15,
        }));
      };
      const draw = () => {
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        stars.forEach((s, i) => {
          s.x += s.vx + (mx - innerWidth / 2) * 0.000025;
          s.y += s.vy + (my - innerHeight / 2) * 0.000025;
          if (s.x < 0) s.x = innerWidth;
          if (s.x > innerWidth) s.x = 0;
          if (s.y < 0) s.y = innerHeight;
          if (s.y > innerHeight) s.y = 0;
          ctx.beginPath();
          ctx.fillStyle = `rgba(216,180,254,${s.a})`;
          ctx.shadowBlur = 10;
          ctx.shadowColor = "rgba(192,132,252,.8)";
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fill();
          for (let j = i + 1; j < stars.length; j++) {
            const t = stars[j];
            const dist = Math.hypot(s.x - t.x, s.y - t.y);
            if (dist < 118) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(103,232,249,${(1 - dist / 118) * 0.13})`;
              ctx.lineWidth = 1;
              ctx.moveTo(s.x, s.y);
              ctx.lineTo(t.x, t.y);
              ctx.stroke();
            }
          }
        });
        requestAnimationFrame(draw);
      };
      window.addEventListener("resize", resize);
      resize();
      draw();
    }
  }

  const form = document.getElementById("contact-form");
  if (form) {
    const toast = document.createElement("div");
    toast.className = "form-toast";
    toast.textContent = "Mensaje listo para despegar 🚀";
    document.body.appendChild(toast);
    form.addEventListener("submit", () => {
      toast.classList.add("active");
      setTimeout(() => toast.classList.remove("active"), 2200);
    });
  }
})();
