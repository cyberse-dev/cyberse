import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {
    SelectableListComponent,
    SelectableListOption,
} from './selectable-list.component';

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
        <cyberse-selectable-list
            [options]="options"
            [currentlySelected]="currentlySelected"
            (selectionChanged)="onChange($event)"
        >
        </cyberse-selectable-list>
    `,
})
class TestHostComponent {
    options = testOptions;
    selectedValue: SelectableListOption;
    currentlySelected: string;

    onChange(value: SelectableListOption) {
        this.selectedValue = value;
    }
}

describe('SelectableListComponent', () => {
    let testHost: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SelectableListComponent, TestHostComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestHostComponent);
        testHost = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(testHost).toBeTruthy();
    });

    it('should have 3 list elements', () => {
        const listElementDivs = (fixture.nativeElement as HTMLElement).querySelectorAll(
            'div',
        );

        expect(listElementDivs.length).toBe(testOptions.length);
    });

    it('should have selected the second element upon clicking on it', () => {
        const selectedElementNo = 1;
        const listElementDivs = (fixture.nativeElement as HTMLElement).querySelectorAll(
            'div',
        );

        listElementDivs[selectedElementNo].click();

        fixture.detectChanges();

        expect(testHost.selectedValue.id).toBe(
            testOptions[selectedElementNo].id,
        );

        expect(listElementDivs[selectedElementNo].classList).toContain(
            'selected',
        );
    });

    it('should be able to be passed a default selection', () => {
        const selectedElementNo = 1;
        testHost.currentlySelected = testOptions[selectedElementNo].id;
        fixture.detectChanges();

        const listElementDivs = (fixture.nativeElement as HTMLElement).querySelectorAll(
            'div',
        );

        expect(listElementDivs[selectedElementNo].classList).toContain(
            'selected',
        );
    });
});
