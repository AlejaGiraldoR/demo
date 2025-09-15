// ======================================================
// SERVICIO DE ENVÍO DE CORREOS CON NODemailer
// ======================================================

const nodemailer = require("nodemailer");

// variable global para almacenar el transporter
let transporter;

// ======================================================
// INICIALIZAR TRANSPORTER
// ======================================================
// crea un transporter usando cuenta de prueba de Ethereal
const initMailer = async () => {
  // si ya existe el transporter, no hacemos nada
  if (!transporter) {
    // creamos cuenta de prueba en Ethereal
    const testAccount = await nodemailer.createTestAccount();

    // configuramos transporter con host, puerto y auth
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // false = no SSL
      auth: {
        user: testAccount.user, // usuario de prueba
        pass: testAccount.pass, // contraseña de prueba
      },
    });

    // mostramos en consola credenciales de prueba
    console.log("✅ Ethereal listo. Credenciales de prueba:");
    console.log(testAccount);
  }
};

// ======================================================
// FUNCION PARA ENVIAR CORREOS
// ======================================================
// to: destinatario
// subject: asunto del correo
// html: contenido en HTML del correo
const sendMail = async (to, subject, html) => {
  // aseguramos que el transporter esté inicializado
  await initMailer();

  // enviamos el correo usando transporter
  const info = await transporter.sendMail({
    from: '"Soporte ToDoList" <no-reply@todolist.com>', // remitente
    to,        // destinatario
    subject,   // asunto
    html,      // cuerpo en HTML
  });

  // mostramos en consola info del mensaje
  console.log("📧 mensaje enviado: %s", info.messageId);
  console.log("🔗 vista previa: %s", nodemailer.getTestMessageUrl(info));

  // retornamos link de vista previa que se puede abrir en el navegador
  return nodemailer.getTestMessageUrl(info);
};

// exportamos la función para usarla en los controladores
module.exports = { sendMail };
