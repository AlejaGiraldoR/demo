// ======================================================
// MODELO DE USUARIOS (User)
// ======================================================

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// definimos el esquema de la colección User
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minlength: [2, "First name must be at least 2 characters long"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      minlength: [2, "Last name must be at least 2 characters long"],
      trim: true,
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [13, "You must be at least 13 years old"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      validate: {
        validator: function (value) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
            value
          );
        },
        message:
          "Password must include uppercase, lowercase, number and special character",
      },
    },

    // ======================================================
    // CAMPOS EXTRA PARA RECUPERACIÓN DE CONTRASEÑA
    // ======================================================
    resetPasswordToken: {
      type: String,
      default: null, // token temporal de recuperación
    },
    resetPasswordExpires: {
      type: Date,
      default: null, // fecha de expiración del token
    },
  },
  { timestamps: true }
);

// ======================================================
// HASH DE CONTRASEÑA ANTES DE GUARDAR
// ======================================================
userSchema.pre("save", async function (next) {
  // solo hash si la contraseña fue modificada
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// ======================================================
// METODO PARA COMPARAR CONTRASEÑAS
// ======================================================
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// ======================================================
// EXPORTAR MODELO
// ======================================================
const User = mongoose.model("User", userSchema);
module.exports = User;
