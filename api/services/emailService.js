// ======================================================
// SERVICIO DE ENVÍO DE CORREOS CON NODemailer
// ======================================================

const nodemailer = require("nodemailer");

// configuramos el transporter directamente con tu cuenta real
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,    // ejemplo: smtp.gmail.com
  port: process.env.EMAIL_PORT,    // ejemplo: 587
  secure: false,                   // true si usas puerto 465
  auth: {
    user: process.env.EMAIL_USER,  // tu correo real
    pass: process.env.EMAIL_PASS,  // contraseña de app de Gmail
  },
});

// ======================================================
// FUNCION PARA ENVIAR CORREOS
// ======================================================
const sendMail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Soporte ToDoList" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("📧 mensaje enviado: %s", info.messageId);
    return info.messageId; // ya no usamos Ethereal
  } catch (err) {
    console.error("Error enviando correo:", err);
    throw err;
  }
};

module.exports = { sendMail };

