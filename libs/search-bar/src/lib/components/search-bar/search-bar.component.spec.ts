import { Component } from '@angular/core';
import {
    async,
    ComponentFixture,
    TestBed,
    fakeAsync,
    tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import {
    SelectableListOption,
    SelectableListComponent,
} from '../selectable-list/selectable-list.component';
import { SearchBarComponent } from './search-bar.component';

const testOptions: SelectableListOption[] = [
    { id: 'jonas', name: 'Jonas Brothers' },
    {
        id: 'scooby',
        name: 'Scooby-Doo',
    },
    {
        id: 'shrek',
        name: 'Shrek',
    },
];

@Component({
    template: `
        <cyberse-search-bar
            [options]="options"
            [debounce]="debounce"
            [currentlySelected]="currentlySelected"
            (searchValueChanged)="onValueChange($event)"
            (selectedOptionChanged)="onOptionChange($event)"
        >
        </cyberse-search-bar>
    `,
})
class TestHostComponent {
    options = testOptions;
    selectedOption: SelectableListOption;
    debounce = 400;
    currentValue = '';
    currentlySelected = testOptions[1].id;

    onOptionChange(value: SelectableListOption) {
        this.selectedOption = value;
    }

    onValueChange(value: string) {
        this.currentValue = value;
    }
}

describe('SearchBarComponent', () => {
    let testHost: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SearchBarComponent,
                SelectableListComponent,
                TestHostComponent,
            ],
            imports: [ReactiveFormsModule],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestHostComponent);
        testHost = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(testHost).toBeTruthy();
    });

    it('should throw an error if the options array was not specified', () => {
        testHost.options = [];

        expect(() => {
            fixture.detectChanges();
        }).toThrowError('The list of options cannot be empty');
    });

    it('should set the search value after the debounce time', fakeAsync(() => {
        fixture.detectChanges();
        const searchExpression = 'test search';
        const inputElement = (fixture.nativeElement as HTMLElement).querySelector(
            'input',
        );

        inputElement.value = searchExpression;
        inputElement.dispatchEvent(new Event('input'));

        tick(testHost.debounce - 1);

        expect(testHost.currentValue).toBeFalsy();

        tick(1);

        expect(testHost.currentValue).toBe(searchExpression);
    }));

    it('should not emit the same search value twice', fakeAsync(() => {
        fixture.detectChanges();
        const searchExpression = 'test search';
        const inputElement = (fixture.nativeElement as HTMLElement).querySelector(
            'input',
        );

        inputElement.value = searchExpression;
        inputElement.dispatchEvent(new Event('input'));

        tick(testHost.debounce);

        expect(testHost.currentValue).toBe(searchExpression);

        inputElement.value = searchExpression + 'something';
        inputElement.dispatchEvent(new Event('input'));

        testHost.currentValue = undefined;

        tick(testHost.debounce - 1);

        inputElement.value = searchExpression;
        inputElement.dispatchEvent(new Event('input'));

        tick(testHost.debounce);

        expect(testHost.currentValue).toBeUndefined();
    }));

    it('should display the currently selected option but should NOT emit it', () => {
        fixture.detectChanges();

        const selectedOptionContainer = (fixture.nativeElement as HTMLElement).querySelector(
            '.selected-option',
        ) as HTMLSpanElement;

        expect(selectedOptionContainer.textContent).toContain(
            testOptions[1].name,
        );

        expect(testHost.selectedOption).toBeUndefined();
    });

    it('should select the first option if nothing is provided and it should emit it', () => {
        testHost.currentlySelected = undefined;
        fixture.detectChanges();

        const selectedOptionContainer = (fixture.nativeElement as HTMLElement).querySelector(
            '.selected-option',
        ) as HTMLSpanElement;

        expect(selectedOptionContainer.textContent).toContain(
            testOptions[0].name,
        );

        expect(testHost.selectedOption.id).toBe(testOptions[0].id);
    });

    it('should toggle the dropdown upon clicking on the currently selected name', () => {
        fixture.detectChanges();

        let dropdownQuery = (fixture.nativeElement as HTMLElement).querySelectorAll(
            'div.dropdown',
        ) as NodeListOf<HTMLDivElement>;

        expect(dropdownQuery.length).toBe(0);

        const selectedOptionContainer = (fixture.nativeElement as HTMLElement).querySelector(
            '.selected-option',
        ) as HTMLSpanElement;

        selectedOptionContainer.click();

        fixture.detectChanges();

        dropdownQuery = (fixture.nativeElement as HTMLElement).querySelectorAll(
            'div.dropdown',
        ) as NodeListOf<HTMLDivElement>;

        expect(dropdownQuery.length).toBe(1);
    });

    it('should close the dropdown upon clicking the currently selected list item', () => {
        fixture.detectChanges();

        const selectedOptionContainer = (fixture.nativeElement as HTMLElement).querySelector(
            '.selected-option',
        ) as HTMLSpanElement;

        selectedOptionContainer.click();

        fixture.detectChanges();

        const options = (fixture.nativeElement as HTMLElement).querySelectorAll(
            'div.dropdown div',
        ) as NodeListOf<HTMLDivElement>;

        options[1].click();

        fixture.detectChanges();

        const dropdownQuery = (fixture.nativeElement as HTMLElement).querySelectorAll(
            'div.dropdown',
        ) as NodeListOf<HTMLDivElement>;

        expect(dropdownQuery.length).toBe(0);
    });
});
