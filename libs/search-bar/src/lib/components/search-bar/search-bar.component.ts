import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
    OnDestroy,
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { SelectableListOption } from '../selectable-list/selectable-list.component';

@Component({
    selector: 'cyberse-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent implements OnInit, OnDestroy {
    @Input() currentlySelected: string;
    /** Debounce time in milliseconds */
    @Input() debounce = 400;
    @Input() options: SelectableListOption[] = [];

    @Output() searchValueChanged = new EventEmitter<string>();
    @Output() selectedOptionChanged = new EventEmitter<SelectableListOption>();

    currentlySelectedOptionName = '';
    dropdownOpened = false;
    searchInput = new FormControl();

    private searchInputSubscription: Subscription;

    ngOnInit() {
        if (this.options.length === 0) {
            throw new Error('The list of options cannot be empty');
        }

        if (this.currentlySelected === undefined) {
            this.onSelect(this.options[0]);
        }

        this.searchInputSubscription = this.searchInput.valueChanges
            .pipe(
                debounceTime(this.debounce),
                distinctUntilChanged(),
            )
            .subscribe(value => this.searchValueChanged.emit(value));
    }

    onSelect(option: SelectableListOption) {
        if (this.currentlySelected !== option.id) {
            this.currentlySelected = option.id;
            this.currentlySelectedOptionName = option.name;
            this.dropdownOpened = false;

            this.selectedOptionChanged.emit(option);
        }
    }

    toggleDropdown() {
        this.dropdownOpened = !this.dropdownOpened;
    }

    ngOnDestroy() {
        this.searchInputSubscription.unsubscribe();
    }
}
