import {Server, Socket} from 'socket.io'
import IGame from '../types/IGame';
import MovePlayer from '../controllers/MovePlayer'
import { generateRandomFruitsPosition } from './GenerateFruits';

const EVENTS = {
    connection: 'connection',
    movePlayer: 'movePlayer'
}

let game:IGame = {players: [], fruits: []}

export default function socket (io: Server){
    io.on(EVENTS.connection,(socket: Socket)=> {

            game.players.push({id: socket.id, x: 0, y: 0})
            socket.emit('getGame', game)

        socket.on(EVENTS.movePlayer, (key)=> {

            let player = game.players.filter((player)=> player.id == socket.id);
            const newPosition = MovePlayer(key, player[0])
            let newPlayers = game.players.filter((player)=> player.id !== socket.id);
            newPlayers.push(newPosition)
            game = {players: newPlayers, fruits: game.fruits}
            
            socket.emit('getGame', game)
            
        })

        socket.on('disconnect', ()=> {

            let newPlayers = game.players.filter((player)=> player.id !== socket.id);
            game = {players: newPlayers, fruits: game.fruits}
            socket.emit('getGame', game)

        })

        
        function GenerateFruits (){
            const newGameWithFruit = generateRandomFruitsPosition(game)
            socket.emit('getGame', newGameWithFruit)
        }

        setInterval(GenerateFruits, 10000)
    })
}