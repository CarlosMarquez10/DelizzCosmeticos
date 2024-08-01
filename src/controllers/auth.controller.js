import { pool } from "../db.js";
import { createUser } from "../models/user.model.js";
import bcrypt from "bcrypt";

import { createAccesToken } from "../libs/jwt.js";

export const register = async (req, res) => {
  const { nombre, apellido, password, telefono, username, rol, imguser } =
    req.body;

  try {
    const user = await createUser(
      nombre,
      apellido,
      username,
      password,
      telefono,
      rol,
      imguser
    );
    const connection = await pool.getConnection();
    try {
      await connection.query(
        "INSERT INTO user(id, nombre, apellido, username, password,  telefono,  rol, imguser) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          user.Id,
          user.nombre,
          user.apellido,
          user.username,
          user.password,
          user.telefono,
          user.rol,
          user.imguser,
        ]
      );
    } finally {
      connection.release();
    }

    const token = await createAccesToken({ Id: user.Id });
    res.cookie("token", token);
    res.json({
      message: "User Creado",
    });
    // res.send("register");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(
        "SELECT * FROM user WHERE username = ?",
        [username]
      );
      if (!rows[0]) {
        return res.status(400).json({ message: "Credenciales inválidas" });
      } else {
        const match = await bcrypt.compare(password, rows[0].password);
        if (match) {
          const token = await createAccesToken({ Id: rows[0].Id });
          res.cookie("token", token);
          res.json({
            username: rows[0].username,
            fullname: rows[0].nombre + " " + rows[0].apellido,
          });
        } else {
          return res.status(400).json({ message: "Credenciales inválidas" });
        }
      }
    } finally {
      connection.release();
    }

  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const { Id } = req.user;
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM user WHERE Id = ?", [
      Id,
    ]);

    return res.json({
      name: rows[0].nombre + " " + rows[0].apellido,
      imguser: rows[0].imguser,
      rol: rows[0].rol,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }

  return res.send("profile");
};
