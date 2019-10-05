import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SelectableListComponent } from './components/selectable-list/selectable-list.component';

@NgModule({
    declarations: [SearchBarComponent, SelectableListComponent],
    imports: [CommonModule, ReactiveFormsModule],
    exports: [SearchBarComponent],
})
export class SearchBarModule {}
