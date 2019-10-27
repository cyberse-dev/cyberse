import { Injectable, BadRequestException } from '@nestjs/common';

import { Game } from '@cyberse/hangman-models';

import { POSSIBLE_LETTERS, POSSIBLE_WORDS, MAX_LIVES } from './constants';

@Injectable()
export class GameService {
    private readonly games: Game[] = [];

    getById(id: number) {
        const currentGame = this.games.find(game => game.id === id);

        if (currentGame !== undefined) {
            return this.mapGameForClient(currentGame);
        }
    }

    createNewGame() {
        const selectedWord =
            POSSIBLE_WORDS[Math.floor(Math.random() * POSSIBLE_WORDS.length)];

        const game: Game = {
            id: this.games.length,
            word: selectedWord,
            gameState: {
                displayedString: selectedWord.replace(/./g, ' '),
                possibleLetters: POSSIBLE_LETTERS,
                guesses: [],
                livesLeft: MAX_LIVES,
                finished: false,
            },
        };

        this.games.push(game);

        return this.getById(game.id);
    }

    processGuess(id: number, guessedLetter: string) {
        const currentGame = this.games.find(game => game.id === id);

        if (currentGame === undefined) {
            throw new BadRequestException('Game not found');
        }

        if (currentGame.gameState.finished) {
            throw new BadRequestException('The game is already over');
        }

        this.processGuessedLetter(currentGame, guessedLetter);

        if (currentGame.word && currentGame.word.includes(guessedLetter)) {
            currentGame.gameState.displayedString = this.getDisplayString(
                currentGame.word,
                currentGame.gameState.guesses,
            );
        } else {
            currentGame.gameState.livesLeft--;
        }

        this.processGameResults(currentGame);

        return this.getById(id);
    }

    private processGuessedLetter(currentGame: Game, guessedLetter: string) {
        const indexOfGuessedLetter = currentGame.gameState.possibleLetters.indexOf(
            guessedLetter,
        );

        if (indexOfGuessedLetter === -1) {
            throw new BadRequestException(`Invalid guess: '${guessedLetter}'`);
        }

        currentGame.gameState.guesses.push(guessedLetter);
        currentGame.gameState.possibleLetters.splice(indexOfGuessedLetter, 1);
    }

    private processGameResults(game: Game) {
        if (game.gameState.livesLeft <= 0) {
            game.gameState.finished = true;
        }

        if (game.word === game.gameState.displayedString) {
            game.gameState.finished = true;
        }
    }

    private getDisplayString(word: string, guesses: string[]) {
        const regExpLetterMatchString = guesses.join('');

        const replaceRegExp = new RegExp(`[^${regExpLetterMatchString}]`, 'g');

        return word.replace(replaceRegExp, ' ');
    }

    private mapGameForClient(game: Game) {
        if (!game.gameState.finished) {
            return game;
        } else {
            return { ...game, word: null };
        }
    }
}
