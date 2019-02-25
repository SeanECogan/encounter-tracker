import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '~/app/database/sqlite.service';
import { RouterExtensions } from 'nativescript-angular/router';
import { Encounter } from '~/shared/models/encounter.model';
import { ActivatedRoute } from '@angular/router';
import { Page } from 'tns-core-modules/ui/page/page';
import { Combatant } from '~/shared/models/combatant.model';
import { GestureEventData } from 'tns-core-modules/ui/gestures/gestures';

@Component({
	moduleId: module.id,
	selector: 'encounter',
	templateUrl: './encounter.component.html',
	styleUrls: ['./encounter.component.css']
})

export class EncounterComponent implements OnInit {

	constructor(
		private _database: DatabaseService,
		private _routerExtensions: RouterExtensions,
		private _route: ActivatedRoute,
		private _page: Page) {
		this._encounterId = this._route.snapshot.params.id;

		this.initialize();

		this._page.on('navigatingTo', (data) => {
			this.initialize();
		});
	}

	ngOnInit() { }

	public initialize(): void {
		this.encounter = null;

		this._database.initializeDatabase()
			.subscribe(() => this.refresh());
	}

	public refresh(): void {
		this.retrieveEncounter();
		this.retrieveCombatants();
	}

	public returnToEncounters() {
		this._routerExtensions.back();
	}

	public retrieveEncounter(): void {
		this._database.retrieveEncounter(this._encounterId)
			.subscribe(encounter => this.encounter = encounter);
	}

	public retrieveCombatants(): void {
		this._database.retrieveCombatants(this._encounterId)
			.subscribe(combatants => this.combatants = combatants);
	}

	public navigateToAddCombatant(): void {
		this._routerExtensions.navigate([ 'encounter', this._encounterId.toString(), 'add-combatant' ]);
	}

	public navigateToEditCombatant(args: GestureEventData, combatantId: number): void {
		const previousClass = args.object.get('class');

		args.object.set('class', 'tapped ' + previousClass);
		this._routerExtensions.navigate([ 'encounter', this._encounterId.toString(), 'edit-combatant', combatantId.toString() ]);
		setTimeout(() => args.object.set('class', previousClass), 100);
	}

	public encounter: Encounter;
	public combatants: Combatant[];

	private _encounterId: number;
}