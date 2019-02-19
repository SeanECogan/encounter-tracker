import { TestBed, inject } from '@angular/core/testing';

import { EncounterComponent } from './encounter.component';

describe('a encounter component', () => {
	let component: EncounterComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				EncounterComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([EncounterComponent], (EncounterComponent) => {
		component = EncounterComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});