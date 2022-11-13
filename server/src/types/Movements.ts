import IPlayer from './Player'

type keyRules = {
    [ T: string ] : (player: IPlayer)=> IPlayer
}

export default keyRules