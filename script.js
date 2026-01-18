// Applies selected style to the clicked nav link and removes it from the others
function seleccionar(link) {
  const opciones = document.querySelectorAll('#links a');
  opciones.forEach((a) => (a.className = ""));
  link.className = "seleccionado";

  // Hide the menu after selecting an option in responsive mode
  const nav = document.getElementById("nav");
  nav.className = "";
}

// Toggles the responsive menu
function responsiveMenu() {
  const nav = document.getElementById("nav");
  if (nav.className === "") {
    nav.className = "responsive";
  } else {
    nav.className = "";
  }
}

// Detect scrolling to apply the skills bar animation
window.onscroll = function () {
  efectoHabilidades();
};

// Applies the animation to the skills bars when the section is visible
function efectoHabilidades() {
  const skills = document.getElementById("skills");
  if (!skills) return;

  const distancia_skills = window.innerHeight - skills.getBoundingClientRect().top;

  if (distancia_skills >= 300) {
    // Updated IDs aligned with the current HTML
    const mlops = document.getElementById("mlops");
    const cloud = document.getElementById("cloud");
    const ai = document.getElementById("ai");
    const devops = document.getElementById("devops");
    const obs = document.getElementById("obs");

    // Add classes only if elements exist (safe in case of future edits)
    if (mlops) mlops.classList.add("barra-progreso1");
    if (cloud) cloud.classList.add("barra-progreso2");
    if (ai) ai.classList.add("barra-progreso3");
    if (devops) devops.classList.add("barra-progreso4");
    if (obs) obs.classList.add("barra-progreso5");

    // Optional: stop listening after animation runs once
    window.onscroll = null;
  }
}

// Optional: Allow opening/closing the responsive menu using Enter/Space on the icon
document.addEventListener("DOMContentLoaded", function () {
  const icono = document.getElementById("icono-nav");
  if (!icono) return;

  icono.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      responsiveMenu();
    }
  });
});
