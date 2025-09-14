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

// Función para agregar nueva tarea (ejemplo)
function addTask(columnId, title, date, time, description = "Sin descripción") {
  const column = document.getElementById(columnId)
  const taskCard = document.createElement("div")
  taskCard.className = "task-card"

  taskCard.innerHTML = `
        <div class="task-title">TÍTULO: ${title}</div>
        <div class="task-date">${date}</div>
        <div class="task-description">${description}</div>
        <div class="task-time">${time}</div>
        <div class="task-actions">
            <button class="edit-button" onclick="editTask(this)">Editar</button>
            <button class="delete-button" onclick="deleteTask(this)">Borrar</button>
        </div>
    `

  column.appendChild(taskCard)
}
function goToProfile() {
    window.location.href = "profile.html";
}

function goToCreateTask() {
    window.location.href = "newtask.html";
}
