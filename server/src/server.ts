import express from "express"
import {createServer} from 'http'
import cors from 'cors'
import config from '../config/default'
import {version} from '../package.json'
import {Server} from 'socket.io'
import socketRun from "./controllers/SocketRun"

const port:number = config.port
const host:string = config.host
const corsDr:string = config.corsOrigin

const app = express()
const httpServer = createServer(app)

app.get('/', (req, res)=> {
    res.send(`server is up! on version ${version}`)
})

httpServer.listen(port, host, ()=> {
    console.log(`Server is Running on version ${version} on URL:`)
    console.log(`http://${host}:${port}`)
})

const io = new Server(httpServer, {
    cors: {
        origin: corsDr,
        methods: ['GET', 'POST'],
        credentials: true
    }
})

socketRun(io)

