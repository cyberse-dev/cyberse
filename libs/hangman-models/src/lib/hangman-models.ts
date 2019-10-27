export interface GameState {
    possibleLetters: string[];
    displayedString: string;
    guesses: string[];
    livesLeft: number;
    finished: boolean;
}

export interface Game {
    readonly id: number;
    readonly word: string | null;
    gameState: GameState;
}
