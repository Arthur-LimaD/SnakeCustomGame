import IGame from "../types/Game"

const TableInfo = ({gameState}: {gameState: IGame})=>{
    return (
    <ul className="TableInfo">
        {gameState && gameState.players.map(player => (<p>Player {player.id}: <strong>{player.points} points!</strong></p>))}
    </ul>
    )
}

export default TableInfo