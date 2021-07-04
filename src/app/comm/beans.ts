/**
 * The main structure for the data exchange during the socket communication
 */
export interface WSBean {
    type: string;
    data: string; // Since we are using a Java backend, a double JSON to String encoding might be necessary
}

export const INIT = 'INIT';
export const TURN = 'TURN';
export const MATCH_START = 'MATCHSTART';
export const GAME_OVER = 'GAMEOVER';
export const ERROR = 'ERROR';

/**
 * Data format for exchanging turn data
 */
export interface WSTurn {
    x: number;
    y: number;
    uid: string;
}

/**
 * Data format that is received by the front end when the match starts
 */
export interface WSMatchStart {
    color: number;
    turn: boolean;
}

/**
 * Data format that confirms a players turn
 */
export interface WSGameState {
    gamestate: number[];
    whoseTurn: number;
}

/**
 * Data format that transmits an error
 */
export interface WSError {
    msg: string;
    fatal: boolean;
    gamestate: number[];
}

/**
 * Data format that transmits game over information when a player wins the game
 */
export interface WSGameOver {
    winner: number;
}

export interface MatchResult {
    playerId: string;
    matchId: string;
    playerNum: number;
}

export interface IGameOver {
    victory: boolean;
    tie: boolean;
}
