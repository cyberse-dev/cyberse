import { async, TestBed } from '@angular/core/testing';
import { SearchBarModule } from './search-bar.module';

describe('SearchBarModule', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SearchBarModule],
        }).compileComponents();
    }));

    it('should create', () => {
        expect(SearchBarModule).toBeDefined();
    });
});
