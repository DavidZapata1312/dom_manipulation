document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("user-form");
  const clearBtn = document.getElementById("clear-data");
  const userDataP = document.getElementById("user-data");
  const interactionCountP = document.getElementById("interaction-count");
  const errorMsg = document.getElementById("error-msg");

  // Mostrar datos almacenados si existen
  const storedUser = localStorage.getItem("userData");
  if (storedUser) {
    const { name, age } = JSON.parse(storedUser);
    userDataP.textContent = `¡Hola de nuevo, ${name}! Tienes ${age} años.`;
  } else {
    userDataP.textContent = "Aún no has guardado tus datos.";
  }

  // Contador de interacciones con Session Storage
  let count = sessionStorage.getItem("interactionCount");
  count = count ? parseInt(count) + 1 : 1;
  sessionStorage.setItem("interactionCount", count);
  interactionCountP.textContent = `Has interactuado con esta página ${count} veces esta sesión.`;

  // Validar y guardar datos
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const age = parseInt(document.getElementById("age").value.trim());

    // Validación simple
    if (!name || /\d/.test(name)) {
      errorMsg.textContent = "⚠️ El nombre no puede estar vacío ni contener números.";
      return;
    }
    if (!age || age < 5) {
      errorMsg.textContent = "⚠️ La edad debe ser un número mayor o igual a 5.";
      return;
    }

    errorMsg.textContent = "";

    const user = { name, age };
    localStorage.setItem("userData", JSON.stringify(user));

    userDataP.textContent = `¡Gracias, ${name}! Tus datos han sido guardados correctamente.`;
    userDataP.style.color = "green";
  });

  // Limpiar datos
  clearBtn.addEventListener("click", () => {
    localStorage.removeItem("userData");
    userDataP.textContent = "Datos eliminados correctamente.";
    userDataP.style.color = "red";
    errorMsg.textContent = "";
  });
});
