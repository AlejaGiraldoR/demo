document.addEventListener("DOMContentLoaded", () => {

  // ===== LOGIN =====
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const response = await fetch("https://demo-290a.onrender.com/api/v1/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem("token", data.token);
          alert("Inicio de sesión exitoso ✅");
          window.location.href = "../pages/tasks.html";
        } else {
          alert(data.message || "Error al iniciar sesión ❌");
        }
      } catch (error) {
        console.error("Error en login:", error);
        alert("Hubo un problema al iniciar sesión");
      }
    });
  }

  // ===== SIGNUP =====
  const signupForm = document.getElementById("sign-up");
  if (signupForm) {
    function validatePassword(password) {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/;
      return regex.test(password);
    }

    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const firstName = document.getElementById("name").value.trim();
      const lastName = document.getElementById("lastname").value.trim();
      const age = document.getElementById("age").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirm-password").value;

      if (!validatePassword(password)) {
        alert("La contraseña debe incluir mayúscula, minúscula, número y carácter especial");
        return;
      }

      if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
      }

      try {
        const response = await fetch("https://demo-290a.onrender.com/api/v1/users/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ firstName, lastName, age, email, password, confirmPassword })
        });

        const data = await response.json();

        if (response.ok) {
          alert("✅ Usuario registrado con éxito");
          window.location.href = "../pages/index.html";
        } else {
          alert("❌ Error: " + (data.message || "Error al registrarse"));
        }
      } catch (error) {
        console.error("Error en signup:", error);
        alert("⚠️ No se pudo conectar con el servidor");
      }
    });
  }

  // ===== LOGOUT =====
  const logoutBtn = document.getElementById("logout-btn");
  const token=localStorage.getItem("token");
  
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      try {
        const response = await fetch("https://demo-290a.onrender.com/api/v1/auth/logout", {
          method: "POST",
          headers: { "Content-Type": "application/json",
            "Authorization":`Bearer ${token}`
           }
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.removeItem("token");
          alert(data.message || "Sesión cerrada correctamente ✅");
          window.location.href = "../pages/index.html";
        } else {
          alert(data.message || "Error al cerrar sesión ❌");
        }
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
        alert("Hubo un problema al cerrar sesión");
      }
    });
  }

});
