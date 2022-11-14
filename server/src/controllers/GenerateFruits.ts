import IFruit from "../types/Fruit";
import IGame from "../types/IGame";

export function generateRandomFruitsPosition (game: IGame):IGame{

    let randomX =  Math.random() * 580;
    let randomY = Math.random() * 377;

    function round(a: number): number {
        return Math.ceil(a / 10) * 10;
    }
    
    const newFruit:IFruit = {x: round(randomX), y: round(randomY), id: game.fruits.length + 1}
    game.fruits.push(newFruit)

    return game
}