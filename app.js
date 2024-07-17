import  express  from "express";
import {config} from 'dotenv' 
import ErrorMiddleware from './middlewares/Error.js'
import cors from 'cors'
import cookieParser from "cookie-parser";

config({
    path:'../backend/config.env'
})


const app=express()
const corsOptions={
    origin:process.env.FRONTEND_URL,
    credentials:true,
}

app.use(express.json())
app.use(express.urlencoded({
    extended:true,
}))
app.use(cookieParser())
app.use(cors(corsOptions))

import user from './routes/userRoutes.js'
import payment from './routes/paymentRoutes.js'
import inventory from './routes/inventoryRoutes.js'

app.use('/api/v1',user)
app.use('/api/v1',payment)
app.use('/api/v1',inventory)

export default app

app.get("/", (req, res) =>
    res.send(
      `<h1> click <a href=${process.env.FRONTEND_URL}>here</a> to visit frontend.</h1>`
    )
  );

app.use(ErrorMiddleware)
