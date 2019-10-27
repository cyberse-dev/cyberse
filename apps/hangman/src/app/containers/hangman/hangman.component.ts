import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    templateUrl: './hangman.component.html',
    styleUrls: ['./hangman.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangmanComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
