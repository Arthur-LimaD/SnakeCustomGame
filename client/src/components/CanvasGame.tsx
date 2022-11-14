import { useRef, useEffect } from "react";
import IGame from "../types/Game";

export default function CanvasGame ({gameState}: {gameState: IGame}){

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(()=> {

        const canvas = canvasRef.current;
        if(!canvas){
            return;
        }
        const context = canvas.getContext('2d');
        if(!context){
          return;
        }
    
        context.fillStyle = 'white';
        context.clearRect(0, 0, canvas.width,canvas.height);
    
        gameState?.players.map((object, index)=>{
          context.fillStyle = 'black';
          let player = gameState.players[index]
          context.fillRect(player.x, player.y, 15, 15);
          return object
        })
        gameState?.fruits.map((object, index)=>{
          const fruit = gameState.fruits[index]
          context.fillStyle = 'green';
          context.fillRect(fruit.x, fruit.y, 15, 15);
          return object
        })
    
      }, [gameState])
    
    return(<>
        <div id="game-container">
            <canvas id="game-canvas" width={600} height={400} ref={canvasRef}></canvas>
    </div></>)
}