//login
document.getElementById("login-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:3000/api/v1/auth/loging", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Inicio de sesión exitoso ✅");

      // Guardar token si backend lo devuelve
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // 👉 Redirigir al tasks.html
      window.location.href = "../pages/tasks.html";
    } else {
      alert(data.message || "Error al iniciar sesión ❌");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Hubo un problema al iniciar sesión");
  }
});
// signup
function validatePassword(password) {
  // Revisa mayúscula, minúscula, número y carácter especial
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/;
  return regex.test(password);
}

const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Capturamos los valores del formulario
 const firstName = document.getElementById("name").value.trim();
 const lastName = document.getElementById("lastname").value.trim();
 const age = document.getElementById("age").value;
 const email = document.getElementById("email").value;
 const password = document.getElementById("password").value;
 const confirmPassword = document.getElementById("confirm-password").value;

  // ✅ Validar contraseña
  if (!validatePassword(password)) {
    alert("La contraseña debe incluir mayúscula, minúscula, número y carácter especial");
    return; // Sale y no envía al backend
  }

  if (password !== confirmPassword) {
    alert("Las contraseñas no coinciden");
    return; // Sale y no envía al backend
  }

  // Validación de contraseñas
  if (password !== confirmPassword) {
    alert("⚠️ Las contraseñas no coinciden");
    return;
  }

  try {
    // Petición al backend
    const response = await fetch("http://localhost:3000/api/v1/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({      
        firstName: firstName,
        lastName: lastName,
        age: age,
        email: email,
        password: password,
        confirmPassword: confirmPassword
      }),
    });

    if (response.ok) {
      alert("✅ Usuario registrado con éxito");
      window.location.href = "index.html"; // Redirige al login
    } else {
      const errorData = await response.json();
      alert("❌ Error: " + errorData.message);
    }
  } catch (error) {
    console.error("Error de red:", error);
    alert("⚠️ No se pudo conectar con el servidor");
  }
});
