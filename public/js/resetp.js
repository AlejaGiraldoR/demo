document.addEventListener("DOMContentLoaded", () => {
  // --- FORMULARIO DE RECUPERACIÓN POR CORREO (forgot.html) ---
  const forgotForm = document.querySelector("form#forgotForm") || document.querySelector("form#forgot-email-form");
  const emailInput = document.getElementById("email");

  if (forgotForm && emailInput) {
    forgotForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = emailInput.value.trim();
      if (!email) {
        alert("Por favor ingresa tu correo electrónico");
        return;
      }

      try {
        const response = await fetch("https://demo-290a.onrender.com/api/v1/auth/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (response.ok) {
          alert("✅ Se ha enviado un enlace de recuperación a tu correo");
          forgotForm.reset();
        } else {
          alert(data.message || "❌ Error al enviar el enlace de recuperación");
        }
      } catch (error) {
        console.error("Error al enviar el enlace de recuperación:", error);
        alert("Hubo un problema al conectarse con el servidor");
      }
    });
  }

  // --- FORMULARIO DE RESTABLECIMIENTO CON TOKEN (reset.html) ---
  const resetForm = document.getElementById("resetForm");
  const newPass = document.getElementById("new-password");
  const confirmPass = document.getElementById("confirm-password");
  const errorMessage = document.getElementById("error-message");

  if (resetForm) {
    errorMessage.style.display = "none";

    // Capturamos el token desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (!token) {
      errorMessage.style.display = "block";
      errorMessage.textContent = "Token no encontrado en la URL";
    }

    // Función para validar contraseña
    const isValidPassword = (password) => {
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
    };

    resetForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (newPass.value !== confirmPass.value) {
        errorMessage.style.display = "block";
        errorMessage.textContent = "Las contraseñas no coinciden";
        return;
      }

      if (!isValidPassword(newPass.value)) {
        errorMessage.style.display = "block";
        errorMessage.textContent = "La contraseña no cumple los requisitos";
        return;
      }

      errorMessage.style.display = "none";

      try {
        const response = await fetch(`https://demo-290a.onrender.com/api/v1/auth/reset-password/${token}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: newPass.value }),
        });

        const data = await response.json();

        if (response.ok) {
          alert("✅ Contraseña actualizada con éxito");
          window.location.href = "index.html"; // redirigir al login
        } else {
          errorMessage.style.display = "block";
          errorMessage.textContent = data.message || "Error al actualizar contraseña";
        }
      } catch (err) {
        errorMessage.style.display = "block";
        errorMessage.textContent = "Error de conexión con el servidor";
        console.error(err);
      }
    });
  }
});
