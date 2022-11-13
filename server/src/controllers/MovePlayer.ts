import IPlayer from "../types/Player";
import keyRules from '../types/Movements'

const acceptedMovements: keyRules = {
    'w': (player: IPlayer): IPlayer =>{
        if(player.y - 1 >= 5){
            player.y = player.y - 10
        }
        return player
    },
    'a': (player: IPlayer): IPlayer =>{
        if(player.x - 1 >= 5){
            player.x = player.x - 10
        }
        return player
    },
    's': (player: IPlayer): IPlayer =>{
        if(player.y - 1 < 377){
            player.y = player.y + 10
        }
        return player
    },
    'd': (player: IPlayer): IPlayer =>{
        if(player.x +1 < 580){
            player.x = player.x + 10
        }
        return player
    }
}

export default function MovePlayer (key:string, player: IPlayer): IPlayer{
    
    const movement = acceptedMovements[key]
    return movement ? movement(player) : player;
}
