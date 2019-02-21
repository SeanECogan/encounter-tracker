import { TestBed, inject } from '@angular/core/testing';

import { AddCombatantComponent } from './add-combatant.component';

describe('a add-combatant component', () => {
	let component: AddCombatantComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				AddCombatantComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([AddCombatantComponent], (AddCombatantComponent) => {
		component = AddCombatantComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});