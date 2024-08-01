import XLSX from 'xlsx';
import mysql from 'mysql2/promise';
import ProgressBar from 'progress';

// Lee el archivo Excel
const workbook = XLSX.readFile('./OTROS.xlsx');
const sheet_name_list = workbook.SheetNames;
const datos = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

// Crea la conexión a la base de datos
const pool = mysql.createPool({
  host: 'localhost',
  user: 'CGOMAPS',
  password: 'CGOMAPS.2023',
  port: 3306,
  database: 'cgomaps'
});

// Crea una nueva barra de progreso
const bar = new ProgressBar(':bar', { total: datos.length });

// Inserta los datos en la base de datos
(async () => {
  const connection = await pool.getConnection();
  await connection.beginTransaction();
  try {
    for (let dato of datos) {
      await connection.query(
        "INSERT INTO cliente(Cliente, Nombre, EstadoCliente, Direccion,RutaLectura, Regional,Ciclo,Ddata,Tranformador,Municipio,Barrio,Area,Telefono,TelefonoCelular, TelefonoContacto,DMedidor,Medidor, Facturacion, Latitud,Longitud,Posterior, Anterior) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          dato.Cliente,
          dato.Nombre,
          dato.EstadoCliente,
          dato.Direccion,
          dato.RutaLectura,
          dato.Regional,
          dato.Ciclo,
          dato.Ddata,
          dato.Tranformador,
          dato.Municipio,
          dato.Barrio,
          dato.Area,
          dato.Telefono,
          dato.TelefonoCelular,
          dato.TelefonoContacto,
          dato.DMedidor,
          dato.Medidor,
          dato.Facturacion,
          dato.Latitud,
          dato.Longitud,
          dato.Posterior,
          dato.Anterior,
        ]
      );
      // Actualiza la barra de progreso
      bar.tick();
    }
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
})();