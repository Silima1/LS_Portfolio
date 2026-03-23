// Applies the selected style to the clicked navigation link
function seleccionar(link) {
  const opciones = document.querySelectorAll('#links a');
  opciones.forEach((a) => (a.className = ""));
  link.className = "seleccionado";

  // Close responsive menu after selecting an option
  const nav = document.getElementById("nav");
  nav.className = "";
}

// Toggles the responsive navigation menu
function responsiveMenu() {
  const nav = document.getElementById("nav");
  if (nav.className === "") {
    nav.className = "responsive";
  } else {
    nav.className = "";
  }
}

// Updates active menu item according to current section in viewport
function actualizarMenuActivo() {
  const secciones = document.querySelectorAll("section[id], div[id]");
  const links = document.querySelectorAll('#links a');

  let current = "";

  secciones.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  links.forEach((link) => {
    link.classList.remove("seleccionado");
    const href = link.getAttribute("href");
    if (href === `#${current}`) {
      link.classList.add("seleccionado");
    }
  });
}

// Intelligent relationship between Services and Projects
// When hovering a service card, project cards with the same data-service category get highlighted
function activarRelacionServiciosProjetos() {
  const servicios = document.querySelectorAll('#servicios .servicio[data-category]');
  const proyectos = document.querySelectorAll('#portfolio .proyecto[data-service]');

  if (!servicios.length || !proyectos.length) return;

  servicios.forEach((servicio) => {
    servicio.addEventListener("mouseenter", () => {
      const category = servicio.getAttribute("data-category");

      proyectos.forEach((proyecto) => {
        if (proyecto.getAttribute("data-service") === category) {
          proyecto.style.transform = "translateY(-6px)";
          proyecto.style.boxShadow = "0 16px 30px rgba(0, 0, 0, 0.18)";
          proyecto.style.borderColor = "#ff5080";
        } else {
          proyecto.style.opacity = "0.55";
          proyecto.style.transform = "scale(0.98)";
        }
      });
    });

    servicio.addEventListener("mouseleave", () => {
      proyectos.forEach((proyecto) => {
        proyecto.style.transform = "";
        proyecto.style.boxShadow = "";
        proyecto.style.borderColor = "";
        proyecto.style.opacity = "";
      });
    });

    // Touch/mobile support
    servicio.addEventListener("click", () => {
      const category = servicio.getAttribute("data-category");

      proyectos.forEach((proyecto) => {
        if (proyecto.getAttribute("data-service") === category) {
          proyecto.style.transform = "translateY(-6px)";
          proyecto.style.boxShadow = "0 16px 30px rgba(0, 0, 0, 0.18)";
          proyecto.style.borderColor = "#ff5080";
          proyecto.style.opacity = "1";
        } else {
          proyecto.style.opacity = "0.55";
          proyecto.style.transform = "scale(0.98)";
        }
      });

      // Scroll to portfolio on mobile when a service is tapped
      const portfolio = document.getElementById("portfolio");
      if (window.innerWidth <= 800 && portfolio) {
        setTimeout(() => {
          portfolio.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 180);
      }
    });
  });

  // Reset project highlight when user clicks outside service cards
  document.addEventListener("click", (e) => {
    const clicouServico = e.target.closest('#servicios .servicio[data-category]');
    if (!clicouServico) {
      proyectos.forEach((proyecto) => {
        proyecto.style.transform = "";
        proyecto.style.boxShadow = "";
        proyecto.style.borderColor = "";
        proyecto.style.opacity = "";
      });
    }
  });
}

// Keyboard accessibility for menu icon
function activarAcessibilidadeMenu() {
  const icono = document.getElementById("icono-nav");
  if (!icono) return;

  icono.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      responsiveMenu();
    }
  });
}

// Improve external links behavior on mobile and desktop
function reforzarLinksExternos() {
  const linksExternos = document.querySelectorAll('a[target="_blank"]');

  linksExternos.forEach((link) => {
    link.setAttribute("rel", "noopener noreferrer");
  });
}

// Initialize everything after DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  activarAcessibilidadeMenu();
  activarRelacionServiciosProjetos();
  reforzarLinksExternos();
  actualizarMenuActivo();
});

// Scroll listener
window.addEventListener("scroll", function () {
  actualizarMenuActivo();
});
