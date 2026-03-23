// ==============================
// NAVIGATION SELECTION
// ==============================
function seleccionar(link) {
  const opciones = document.querySelectorAll('#links a');
  opciones.forEach(a => a.classList.remove("seleccionado"));
  link.classList.add("seleccionado");

  // fechar menu no mobile
  const nav = document.getElementById("nav");
  nav.className = "";
}

// ==============================
// RESPONSIVE MENU
// ==============================
function responsiveMenu() {
  const nav = document.getElementById("nav");
  nav.classList.toggle("responsive");
}

// ==============================
// ACTIVE SECTION ON SCROLL
// ==============================
function actualizarMenuActivo() {
  const secciones = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll('#links a');

  let current = "";

  secciones.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  links.forEach(link => {
    link.classList.remove("seleccionado");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("seleccionado");
    }
  });
}

// ==============================
// SERVICES → PROJECTS INTELLIGENCE
// ==============================
function activarRelacionServiciosProjetos() {
  const servicios = document.querySelectorAll('#servicios .servicio[data-category]');
  const proyectos = document.querySelectorAll('#portfolio .proyecto[data-service]');

  if (!servicios.length || !proyectos.length) return;

  servicios.forEach(servicio => {
    const category = servicio.getAttribute("data-category");

    // HOVER (desktop)
    servicio.addEventListener("mouseenter", () => {
      highlightProjects(category, proyectos);
    });

    servicio.addEventListener("mouseleave", () => {
      resetProjects(proyectos);
    });

    // CLICK (mobile)
    servicio.addEventListener("click", () => {
      highlightProjects(category, proyectos);

      // scroll automático para projetos
      if (window.innerWidth <= 800) {
        const portfolio = document.getElementById("portfolio");
        if (portfolio) {
          setTimeout(() => {
            portfolio.scrollIntoView({ behavior: "smooth" });
          }, 150);
        }
      }
    });
  });

  // reset ao clicar fora
  document.addEventListener("click", (e) => {
    const clicouServico = e.target.closest('#servicios .servicio');
    if (!clicouServico) {
      resetProjects(proyectos);
    }
  });
}

// ==============================
// PROJECT HIGHLIGHT HELPERS
// ==============================
function highlightProjects(category, proyectos) {
  proyectos.forEach(proyecto => {
    if (proyecto.getAttribute("data-service") === category) {
      proyecto.style.transform = "translateY(-8px)";
      proyecto.style.boxShadow = "0 20px 40px rgba(0,0,0,0.2)";
      proyecto.style.borderColor = "#ff5080";
      proyecto.style.opacity = "1";
    } else {
      proyecto.style.opacity = "0.4";
      proyecto.style.transform = "scale(0.96)";
    }
  });
}

function resetProjects(proyectos) {
  proyectos.forEach(proyecto => {
    proyecto.style.transform = "";
    proyecto.style.boxShadow = "";
    proyecto.style.borderColor = "";
    proyecto.style.opacity = "";
  });
}

// ==============================
// ACCESSIBILITY (keyboard menu)
// ==============================
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

// ==============================
// EXTERNAL LINKS SECURITY
// ==============================
function reforzarLinksExternos() {
  const links = document.querySelectorAll('a[target="_blank"]');

  links.forEach(link => {
    link.setAttribute("rel", "noopener noreferrer");
  });
}

// ==============================
// SMOOTH SCROLL (improved UX)
// ==============================
function activarSmoothScroll() {
  const anchors = document.querySelectorAll('a[href^="#"]');

  anchors.forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      }
    });
  });
}

// ==============================
// INIT
// ==============================
document.addEventListener("DOMContentLoaded", function () {
  activarAcessibilidadeMenu();
  activarRelacionServiciosProjetos();
  reforzarLinksExternos();
  activarSmoothScroll();
  actualizarMenuActivo();
});

// ==============================
// SCROLL LISTENER
// ==============================
window.addEventListener("scroll", function () {
  actualizarMenuActivo();
});
