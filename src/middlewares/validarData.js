export function validardata(data) {
  const { id, title, price, description, category, image, stock, Observation } =
    data;
  let error = "";
  let formatoImg = "http://localhost:3001/api/public/img/";

  switch (true) {
    case !id || typeof id !== "string":
      error = "El Id es requerido y debe ser un número";
      break;
    case !title || typeof title !== "string" || !title.trim():
      error = "El título es requerido y debe ser un texto";
      break;
    case !price || typeof price !== "string" || isNaN(price):
      error = "El precio del producto es requerido y debe ser un número válido";
      break;
    case !description || typeof description !== "string" || !description.trim():
      error = "La descripción es requerida y debe ser un texto";
      break;
    case !category || typeof category !== "string" || !category.trim():
      error = "La categoría es requerida y debe ser un texto";
      break;
    case !image || typeof image !== "string" || !image.trim():
      error =
        `El nombre del archivo de imagen es requerido y debe ser un texto ${image}`;
      break;
    case !stock || typeof stock !== "string" || isNaN(stock):
      error = "El stock del producto es requerido y debe ser un número válido";
      break;
    case !Observation || typeof Observation !== "string" || !Observation.trim():
      error = "La observación es requerida y debe ser un texto";
      break;
  }

  data.imagen = formatoImg+data.imagen;

  if (error) {
    return { error }; // Devolver el mensaje de error
  } else {
    return data; // Devolver los datos validados
  }
}
