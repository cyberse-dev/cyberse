import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    HostListener,
} from '@angular/core';

@Component({
    selector: 'cyberse-letter-button',
    templateUrl: './letter-button.component.html',
    styleUrls: ['./letter-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LetterButtonComponent implements OnInit {
    @Input() letter: string;

    constructor() {}

    ngOnInit() {}

    @HostListener('click')
    clicked() {
        console.log(this.letter);
    }
}
