import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { HangmanComponent } from './containers/hangman/hangman.component';
import { LetterButtonComponent } from './components/letter-button/letter-button.component';
import { HangmanStateDisplayComponent } from './components/hangman-state-display/hangman-state-display.component';

@NgModule({
    declarations: [
        AppComponent,
        HangmanComponent,
        LetterButtonComponent,
        HangmanStateDisplayComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(
            [
                {
                    path: '',
                    pathMatch: 'full',
                    redirectTo: 'hangman',
                },
                {
                    path: 'hangman',
                    component: HangmanComponent,
                },
            ],
            { initialNavigation: true },
        ),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
