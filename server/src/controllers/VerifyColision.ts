import IGame from "../types/IGame";

export const VerifyColisions = (game:IGame)=>{

    let {fruits, players} = game;

    fruits.map((fruit)=> {
        players.map((player, playerIndex)=> {
            if(fruit.x == player.x && fruit.y == player.y){
                players[playerIndex].points += 1;
                const newFruits = game.fruits.filter(obj => obj.id != fruit.id)
                fruits = newFruits;
            }
        })

    })

    return {fruits, players}

}