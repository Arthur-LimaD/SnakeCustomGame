# SnakeCustomGame

This project is a Filipe Deschamps project variation but using different tools and language. This project uses:

- TypeScript
- React
- NodeJS
- Socket.io

## Demonstration

https://user-images.githubusercontent.com/98204950/203407137-bc2df1a9-3a0b-40dc-a1f0-fcb6b0681afb.mp4


## Strucuture

On this project, we are gonna work with 4 different layers:

1. **Presentation Layer**
    
    This Layer only shows up what the player will see, there is no game rules or data processing on it, just print the result made by sistem, to this project, the game will run on a canvas HTML tag.
    
2. **Logic and Data Layer**
    
    This layer stores all data to provide to the presentation Layer, all players position, all points they have got, etc. Such as all game rules, like:
    
    - What happens if a player click the X key?
    - What happens when a player pass throught a fruit?
    
    This is the onoy layer that has all information and logical to know what is the real situation of the game.
    
    This is as **abstract layer**, it only stores data and logical;
    
3. **Input Layer**
    
    This layer is responsible for catching the user’s input, such as the keys pressed and join the game itself, it will catch them, proccess and send to the Logical layer, to process the data and create an input, this layer only doesnt know what to do with that data.
    
4. **Networking Layer**
    
    This is the layer that provides to all clients will the updated info stored on the server layers.
    

First we need to understand that the Server can comminucate with many clients at same time and by a fast way, so we are gonna use the WebSockets protocol instead of HTTP;

Starting Presentation layer and Creating the Canvas;

```tsx
import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import IPlayer from './types/Player';

function App() {

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [player, setPlayer] = useState<IPlayer>({x: 0, y: 0, w: 15, h: 15, color: 'blue'})

  useEffect(()=> {

    const canvas = canvasRef.current;
    if(!canvas){
      return
    }
    const context = canvas.getContext('2d');
    if(!context){
      return;
    }

    /* JUST A TEST!
    context.fillStyle = player.color;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(player.x, player.y, player.w, player.h);
    */

  }, [player])

  useEffect(() => {
    const keyDownHandler = (event:KeyboardEvent) => {
        /*get the keys pressed by the event.key*/
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [player]);

  return (<>
      <div id="game-container">
          <canvas id="game-canvas" width={800} height={600} ref={canvasRef}></canvas>
      </div>
  </>

  );
}

export default App;
```

```
context.fillStyle = 'white';
    context.clearRect(0, 0, canvas.width,canvas.height);
```

I used the useRef hook to catch the canvas and then we can draw on it by the .fillStyle and .fillRect (creates a rectangle, receives as argument and array with x position, y position, height and width) method;

## Presentation Layer

The game has to function on a dynamic way, so we are gonna encapsulate the fruits and the players position into and Object called “game”.

```tsx
//First we are goin to create a type for the object “game”:
import IFruit from './Fruit'
import IPlayer from './Player'

interface IGame {
    players: IPlayer[],
    fruits: IFruit[]
}

//and now we can create the object itself
const game: IGame = {
    players: [
      {x: 700, y: 500, id: '1'},
      {x: 100, y: 278, id: '2'},
      {x: 200, y: 400, id: '3'}
    ],
    fruits: [
      {x: 300, y: 350, id: '1'},
      {x: 600, y: 150, id: '2'},
    ]
  }
```

We have to be able to identify who is the player logged (to set a different color to it) and also identify a fruit to delete only it when the user collect it. There are many ways to do this;

Now we are going to create a function that renders the players and fruits on the screen:

```
const renderGame = ()=> {
      game.players.map((object, index)=>{
        const player = game.players[index]
        context.fillStyle = 'black';
        context.fillRect(player.x, player.y, 15, 15);
      })

      game.fruits.map((object, index)=>{
        const fruit = game.fruits[index]
        context.fillStyle = 'green';
        context.fillRect(fruit.x, fruit.y, 15, 15);
      })
    }

renderGame()
```

But here is a problem with this system, beacuse when we cange a player’s position, it will generate a new fill on the canvas but wont delete the old fill’s position. There is a way to solve this, its clearing all the canvas before the renderization, like this:

```tsx
context.fillStyle = 'white';        
context.fillRect(0, 0, canvas.width,canvas.height)
```

Now we are going to transform this into a React application, the game object will be an state, this way every time its cheanges, the compoent will join a reconciliation flow and the function to render the game (now a useeffect function) will be executed again;

```tsx
const canvasRef = useRef<HTMLCanvasElement | null>(null);
const [players, setPlayers] = useState<IPlayer[]>([{x: 700, y: 500, id: '1'},{x: 100, y: 278, id: '2'},{x: 200, y: 400, id: '3'}])
const [fruits, setFruits] = useState<IFruit[]>([{x: 300, y: 350, id: '1'},{x: 600, y: 150, id: '2'},])
const [game, setGame] = useState<IGame>({players: players, fruits: fruits})

 useEffect(()=> {
    const canvas = canvasRef.current;
    if(!canvas){
      return
    }
    const context = canvas.getContext('2d');
    if(!context){
      return;
    }

    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width,canvas.height);

    game.players.map((object, index)=>{
      context.fillStyle = 'black';
      const player = game.players[index]
      context.fillRect(player.x, player.y, 15, 15);
    })

    game.fruits.map((object, index)=>{
      const fruit = game.fruits[index]
      context.fillStyle = 'green';
      context.fillRect(fruit.x, fruit.y, 15, 15);
    })

  }, [players, game, fruits])
```

## Input Layer

Now we has to catch the user’s key pressed. Its possible to get the event “keydown” from the document and set a callback to it:

```tsx
useEffect(() => {

    const keyDownHandler = (event:KeyboardEvent) => {
      console.log(event.key)
    };

    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };

}, [players]);
```

We could easily change the game state tight there, on the keyDownHandler function and also program our first game rule, the player mustn’t pass throught the borders of the canvas, but remember that all game state changing must happen only on the **Logical and Data layer**, **not on the Input layer**; Then we has to send this info to the data and logical layer instead of chaning it directly;

So, on another file, we will create a rule and export a function from it, this function receives  a key and a player object and returns a new player with the positions after processing;

```tsx
useEffect(() => {
    const keyDownHandler = (event:KeyboardEvent) => {
        let currentPlayer = players[0]
				//use the function passing the parmeters to get the new player position
        let newPlayerPosition = PlayerMovement(event.key, currentPlayer);
				//actualize player array with the new player position
        setPlayers([...players, players[0] = newPlayerPosition])
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [players]);
```

The function we call seems like this:

```tsx
import IPlayer from "../types/Player";

export default function PlayerMovement (key: string, player: IPlayer): IPlayer{
    if(/*input layer responsability*/key === /*game rule responsability*/'w' && player.y - 1 >= 0){
        player.y = player.y - 5
    }
    if(key === 'a' && player.x - 1 >= 0){
        player.x = player.x - 5
    }
    if(key === 's' && player.y - 1 < 580){
        console.log(player)
        player.y = player.y + 5
    }
    if(key === 'd' && player.x +1 < 785){
        player.x = player.x + 5
    }

    return player
}
```

But here, the layers are still acompled!  To exemplify this problem, we can see that there are two responsabilities from two different layer at the same place:

```tsx
if(/*input layer responsability*/
key === 
/*game rule*/
'w' && player.y - 1 >= 0){

	/*data and logical responsability*/
    player.y = player.y - 5

  }

```
