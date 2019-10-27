import {
    Component,
    ChangeDetectionStrategy,
    Input,
    HostListener,
    Output,
    EventEmitter,
} from '@angular/core';

@Component({
    selector: 'cyberse-letter-button',
    templateUrl: './letter-button.component.html',
    styleUrls: ['./letter-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LetterButtonComponent {
    @Input() letter: string;
    @Output() letterClicked = new EventEmitter<string>();

    @HostListener('click')
    clicked() {
        this.letterClicked.emit(this.letter);
    }
}
