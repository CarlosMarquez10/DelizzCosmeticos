import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

// const isValidEmail = (email) => {
//   const re =
//     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return re.test(String(email).toLowerCase());
// };

const isValidString = (str) => {
  return typeof str === "string" && str.trim().length > 0;
};

const isValidUsername = (username) => {
  const re = /^[A-Za-z]{3,}$/;
  if (!re.test(username)) {
    // throw new Error("Invalid username");
    console.log(username);
  }
  return true;
};

const isValidPassword = (password) => {
  const re = /^(?=.*[A-Z])(?=.*[*])(?=.*[\.])[A-Za-z*\.\d]{6,}$/;
  if (
    typeof password !== "string" ||
    password === null ||
    password.trim() === "" ||
    !re.test(password)
  ) {
    // throw new Error("Invalid Password");
    console.log(password);
  }
  return true;
};

export const passwordSegurity = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  return hashedPassword;
};

const datarol = (rol) => {
  let Permisos = "";
  switch (rol) {
    case "admin":
      Permisos = "2";
      break;
    case "user":
      Permisos = "1";
      break;
    case "invitado":
      Permisos = "0";
      break;
    default:
      break;
  }
  return Permisos;
};

export const createUser = async (
  nombre,
  apellido,
  username,
  password,
  telefono,
  rol,
  imguser
) => {
  if (!isValidString(username)) {
    // throw new Error("Invalid username");
    console.log(username);
  }

  if (!isValidUsername(username)) {
    // throw new Error("Invalid username");
    console.log(username);
  }

  //   if (!isValidEmail(email)) {
  //     throw new Error("Invalid email");
  //   }

  if (!isValidString(password)) {
    throw new Error("Invalid password");
  }

  if (!isValidPassword(password)) {
    throw new Error("Invalid password");
  }
  const Id = uuidv4();

  const passwordInc = await passwordSegurity(password);

  const rolUser = datarol(rol);

  const user = {
    Id,
    nombre,
    apellido,
    username,
    telefono,
    password: passwordInc,
    rol: rolUser,
    imguser,
  };

  console.log(user);

  return user;
};
