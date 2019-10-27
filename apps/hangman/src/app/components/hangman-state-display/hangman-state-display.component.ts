import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'cyberse-hangman-state-display',
    templateUrl: './hangman-state-display.component.svg',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangmanStateDisplayComponent {
    @Input() livesLeft: number;
}
