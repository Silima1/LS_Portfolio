// Aplica o estilo ao link selecionado e remove do anterior
function seleccionar(link) {
  const opciones = document.querySelectorAll('#links a');
  opciones.forEach((a) => (a.className = ""));
  link.className = "seleccionado";

  // Fecha o menu no modo responsive após clicar
  const nav = document.getElementById("nav");
  nav.className = "";
}

// Mostra/oculta o menu responsive
function responsiveMenu() {
  const nav = document.getElementById("nav");
  nav.className = nav.className === "" ? "responsive" : "";
}

// Deteta scroll para animar as barras de skills
window.onscroll = function () {
  efectoHabilidades();
};

// Aplica a animação às barras de skills quando entra na viewport
function efectoHabilidades() {
  const skills = document.getElementById("skills");
  if (!skills) return;

  const distancia_skills = window.innerHeight - skills.getBoundingClientRect().top;

  if (distancia_skills >= 300) {
    // NOVOS IDs (de acordo com o HTML que te enviei)
    const mlops = document.getElementById("mlops");
    const cloud = document.getElementById("cloud");
    const ai = document.getElementById("ai");
    const devops = document.getElementById("devops");
    const obs = document.getElementById("obs");

    // Adiciona classes se existirem (não quebra caso falte algum)
    if (mlops) mlops.classList.add("barra-progreso1");
    if (cloud) cloud.classList.add("barra-progreso2");
    if (ai) ai.classList.add("barra-progreso3");
    if (devops) devops.classList.add("barra-progreso4");
    if (obs) obs.classList.add("barra-progreso5");

    // Opcional: parar de verificar scroll depois de aplicar uma vez
    window.onscroll = null;
  }
}
