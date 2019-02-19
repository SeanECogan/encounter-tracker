import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '~/app/database/sqlite.service';
import { RouterExtensions } from 'nativescript-angular/router';
import { Encounter } from '~/shared/models/encounter.model';
import { ActivatedRoute } from '@angular/router';

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
		private _route: ActivatedRoute) {
		this._encounterId = this._route.snapshot.params.id;

		this._database.initializeDatabase()
			.subscribe(() => this.retrieveEncounter());
	}

	ngOnInit() { }

	public returnToEncounters() {
		this._routerExtensions.back();
	}

	public retrieveEncounter(): void {
		this._database.retrieveEncounter(this._encounterId)
			.subscribe(encounter => this.encounter = encounter);
	}

	public encounter: Encounter;

	private _encounterId: number;
}