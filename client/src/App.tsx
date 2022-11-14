import { useEffect, useState } from 'react';
import './App.css'
import IGame from './types/Game'
import { socket } from './config/socketConnection';
import CanvasGame from './components/CanvasGame';
import TableInfo from './components/TableInfo';

function App() {

  const [game, setGame] = useState<IGame>({players: [], fruits: []})

  useEffect(():any=> {
    socket.on('getGame', (data)=> {
      setGame(data)
    })
    return ()=> socket.off('getGame') 
  }, [])

  useEffect(() => {

    const keyDownHandler = (event:KeyboardEvent) => {
      socket.emit('movePlayer', event.key)
    };

    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };

    
  }, []);

  useEffect(() => {

    const handleTabClose = (event:BeforeUnloadEvent) => {
      event.preventDefault();

      socket.emit('disconnect')

      return (event.returnValue = 'Are you sure you want to exit?');
    };

    window.addEventListener('beforeunload', handleTabClose);

    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
    };

  }, []);

  return (<>
    <h1>O pai é pika dms Slk</h1>
      <CanvasGame gameState={game}/>
      <TableInfo gameState={game}/>
  </>);
}

export default App;


  