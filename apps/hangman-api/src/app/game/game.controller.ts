import { Controller, Get, Param, Post, Body } from '@nestjs/common';

import { GameService } from './game.service';

@Controller('game')
export class GameController {
    constructor(private readonly gameService: GameService) {}

    @Get()
    getGame() {
        return this.gameService.createNewGame();
    }

    @Get(':id')
    getGameById(@Param('id') id: string) {
        return this.gameService.getById(+id);
    }

    @Post(':id/guess')
    guessById(@Param('id') id: string, @Body('guess') guessedLetter: string) {
        return this.gameService.processGuess(+id, guessedLetter);
    }
}
