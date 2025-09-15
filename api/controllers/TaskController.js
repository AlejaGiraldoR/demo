// ======================================================
// CONTROLADOR DE TAREAS
// ======================================================

// importamos el modelo de Task para interactuar con la base de datos
const Task = require("../models/Task");

// ======================================================
// FUNCION PARA CREAR UNA TAREA
// ======================================================
const createTask = async (req, res) => {
  try {
    // destructuramos title y detail desde el cuerpo de la solicitud
    const { title, detail } = req.body;

    // validamos que el campo title exista
    if (!title) {
      return res.status(400).json({ message: "El campo title es obligatorio" });
    }

    // generamos fecha y hora actual
    const now = new Date();
    const date = now.toISOString().split("T")[0]; // yyyy-mm-dd
    const time = now.toTimeString().split(" ")[0].slice(0, 5); // hh:mm

    // creamos la tarea usando el modelo Task
    const newTask = await Task.create({
      title,                // titulo obligatorio
      detail: detail || "", // detalle opcional
      date,                 // fecha actual
      time,                 // hora actual
      status: "Por hacer",  // estado inicial
      userId: req.user.id,  // asociamos la tarea al usuario logueado
    });

    // enviamos respuesta 201 con datos de la tarea creada
    res.status(201).json({
      message: "Tarea creada exitosamente",
      task: {
        id: newTask._id,
        title: newTask.title,
        detail: newTask.detail,
        date: newTask.date,
        time: newTask.time,
        status: newTask.status,
        userId: newTask.userId,
      },
    });
  } catch (err) {
    console.error("createTask error:", err.message);
    res.status(500).json({
      message: "No pudimos guardar tu tarea, inténtalo de nuevo",
      error: err.message,
    });
  }
};

// exportamos la funcion para usarla en rutas
module.exports = { createTask };
