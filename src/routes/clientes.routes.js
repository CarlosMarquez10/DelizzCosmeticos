import {Router} from 'express'
import {getproducto, postProducto} from '../controllers/clientes.controller.js';
import upload from '../middlewares/multerConfig.js'
// import {authRequiered} from '../middlewares/validateToken.js'

const ruta = Router()

ruta.get("/productos", getproducto)
ruta.post("/producto", upload.single('image'), postProducto)




export default ruta;