import {config} from 'dotenv'

config()

export const PORT = process.env.PORT || 3000
export const DB_HOST = process.env.DB_HOST ||'localhost'
export const DB_USER = process.env.DB_USER || 'DELIZZ'
export const DB_PASSWORD = process.env.DB_PASSWORD ||'DELIZZ.2024'
export const DB_DATABASE = process.env.DB_DATABASE ||'delizz'
export const DB_PORT = process.env.DB_PORT || 3306
export const TOKEN_SECRET = 'cgo secrto key'