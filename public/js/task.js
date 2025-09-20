// Funciones básicas para los botones
function editTask(button) {
  const taskCard = button.closest(".task-card")
  alert("Función de editar tarea - aquí puedes integrar tu lógica de edición")
}

// Función de búsqueda básica
document.getElementById("searchInput").addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase()
  const taskCards = document.querySelectorAll(".task-card")

  taskCards.forEach((card) => {
    const title = card.querySelector(".task-title").textContent.toLowerCase()
    const date = card.querySelector(".task-date").textContent.toLowerCase()
    const description = card.querySelector(".task-description").textContent.toLowerCase()

    if (title.includes(searchTerm) || date.includes(searchTerm) || description.includes(searchTerm)) {
      card.style.display = "block"
    } else {
      card.style.display = "none"
    }
  })
})

// Función para agregar nueva tarea
async function loadTasks() {
  try {
    const response = await fetch("https://demo-290a.onrender.com/api/v1/tasks/mytasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Si tu backend requiere autenticación, aquí se añade el token
        // "Authorization": "Bearer " + localStorage.getItem("token")
      }
    });

    if (!response.ok) {
      throw new Error("Error al cargar las tareas");
    }

    const tasks = await response.json();

    // Limpiar columnas antes de volver a renderizar
    document.getElementById("todo-column").innerHTML = "";
    document.getElementById("doing-column").innerHTML = "";
    document.getElementById("done-column").innerHTML = "";

    tasks.forEach(task => {
      const taskCard = document.createElement("div");
      taskCard.classList.add("task-card");

      taskCard.innerHTML = `
        <div class="task-title">TÍTULO: ${task.title}</div>
        <div class="task-date">${task.date || "Sin fecha"}</div>
        <div class="task-description">${task.description || "Sin descripción"}</div>
        <div class="task-time">${task.time || "00:00"}</div>
        <div class="task-actions">
          <button class="edit-button" onclick="editTask('${task._id}')">Editar</button>
          <button class="delete-button" onclick="deleteTask('${task._id}')">Borrar</button>
        </div>
      `;

      // Colocar la tarjeta en la columna correcta
      if (task.status === "todo") {
        document.getElementById("todo-column").appendChild(taskCard);
      } else if (task.status === "doing") {
        document.getElementById("doing-column").appendChild(taskCard);
      } else if (task.status === "done") {
        document.getElementById("done-column").appendChild(taskCard);
      }
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

// Llamar cuando se cargue la página
document.addEventListener("DOMContentLoaded", loadTasks);

