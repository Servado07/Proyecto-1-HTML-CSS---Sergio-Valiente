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

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
