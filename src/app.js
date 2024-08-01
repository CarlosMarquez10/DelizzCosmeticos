import express  from "express";
import morgan from "morgan";
import path from 'path'
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js'
import rutadata from './routes/clientes.routes.js'
import cookieParser from 'cookie-parser'
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json({ limit: "70mb" }));
app.use(bodyParser.urlencoded({ limit: "70mb", extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/api/public', express.static(path.join(__dirname, 'public')));
app.use('/api',authRoutes);
app.use("/api", rutadata);

app.use((req, res, next) =>{
    res.status(404).json({
        message: 'La ruta no es valida, no se encontro'
    })
})



export default app;


