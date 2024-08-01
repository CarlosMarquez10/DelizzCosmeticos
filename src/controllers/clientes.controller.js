import { pool } from "../db.js";
import {validardata} from '../middlewares/validarData.js'

export const getproducto = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM productos");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const postProducto = async (req, res) => {
  const { id, title, price, description, category, image, stock, Observation } =
    req.body;
    console.log('Datos recibidos del cliente:', req.body);
  try {
    const data = await validardata({
      id,
      title,
      price,
      description,
      category,
      image,
      stock,
      Observation,
    });

    if (data.error) { // Verificar si hay un error de validación
      return res.status(400).json({ message: data.error }); // Devolver el mensaje de error
    }


    const [rows] = await pool.query(
      "INSERT INTO productos(id, title, price, description, category, image, stock, Observation) VALUES (?,?,?,?,?,?,?,?)",
      [
        data.id,
        data.title,
        data.price,
        data.description,
        data.category,
        data.image,
        data.stock,
        data.Observation,
      ]
    );
    res.send({ rows });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something goes wrong",
      error: error.message,
    });
  }
};
