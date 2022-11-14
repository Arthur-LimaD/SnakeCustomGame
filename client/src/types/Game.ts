import IFruit from './Fruit'
import IPlayer from './Player'

interface IGame {
    players: IPlayer[],
    fruits: IFruit[]
}

export default IGame