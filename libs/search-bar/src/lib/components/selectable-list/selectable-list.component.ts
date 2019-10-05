import {
    Component,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';

@Component({
    selector: 'cyberse-selectable-list',
    templateUrl: './selectable-list.component.html',
    styleUrls: ['./selectable-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectableListComponent {
    @Input() options: SelectableListOption[] = [];
    @Input() currentlySelected: string;
    @Output() selectionChanged = new EventEmitter<SelectableListOption>();

    onSelect(option: SelectableListOption) {
        if (this.currentlySelected !== option.id) {
            this.currentlySelected = option.id;
            this.selectionChanged.emit(option);
        }
    }
}

export interface SelectableListOption {
    id: string;
    name: string;
}
