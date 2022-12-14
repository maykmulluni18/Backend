import express, { response } from "express"
import cors from 'cors'
import db from './database/db.js'
import router from "./routers/routes.js"
import RoutesUsers from "./routers/RoutesUsers.js"
import RoutesLogin from "./routers/auth.js"
import RouteSedes from "./routers/sedes.js"
import RouteBienes from "./routers/bienes.js"
import RouteNeabienes from "./routers/neabienes.js"
import RouteNeaEntradas from "./routers/neaentradas.js"
import RouteBienesNeasEntradas from "./routers/neabienesentradas.js"
import RoutePecosaBienes from "./routers/pecosabienes.js"
import RoutePecosaPedidos from "./routers/pecosapedidos.js"
import RouteBienesPedidos from "./routers/pecosabienespedidos.js"
import RouteMetas from "./routers/metas.js"
import RouteIventarioInicial from "./routers/invetinicial.js"
import RouteInvenrarioInicialFilterDate from  "./routers/invetariadoInicialFilterdate.js"

import RouteImportExel from "./routers/ExelInventariado.js"

import Ejemp from "./routers/Ejemp.js"
import Stock from "./routers/stoks.js"

import session from "express-session"
import dotenv from "dotenv"
import SequelizeS from "connect-session-sequelize"

import {PORT, SECRET_KEY} from './config/config.js'

import { adminOnly, verifyUser } from "./middleware/VerifyAuth.js"
dotenv.config()



const sessionS = SequelizeS(session.Store)
const store = new sessionS({
    db: db,
    // expiration: 10 * 30 * 1000

})


const app = express()
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))
app.use(session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        httpOnly: false,
        secure: 'auto',
        //maxAge: 60000,
        //expires: 60000

    }
})
)

app.use('/login', RoutesLogin)
app.use('/user', verifyUser, router)
app.use('/admin',verifyUser, adminOnly, RoutesUsers)
app.use('/sedes', verifyUser, RouteSedes)
app.use('/bienes', verifyUser, RouteBienes)
app.use('/neasbienes', verifyUser, RouteNeabienes)
app.use('/neasentradas', verifyUser, RouteNeaEntradas)
app.use('/neasbienesentradas', verifyUser, RouteBienesNeasEntradas)
app.use('/pecosabienes', verifyUser, RoutePecosaBienes)
app.use('/pecosapedidos', verifyUser, RoutePecosaPedidos)
app.use('/pecosabienespedidos', RouteBienesPedidos)
app.use('/metas', verifyUser, RouteMetas)
app.use('/invetinicial', verifyUser, RouteIventarioInicial)
app.use('/invetinicialfilterdate',verifyUser, RouteInvenrarioInicialFilterDate)

app.use('/excelimport',RouteImportExel)

app.use('/ejmp', Ejemp)
app.use('/stock', Stock)


try {
    await db.authenticate()
    console.log('Authenticated successfully DB')
} catch (error) {
    console.log(`Error conextion DB : ${error}`)
}

//store.sync()

/*app.get('/',(req,res)=>{
    res.send('Hola mundo')
})
*/
app.listen(PORT, () => {
    console.log('Server Up running in', PORT)
})


