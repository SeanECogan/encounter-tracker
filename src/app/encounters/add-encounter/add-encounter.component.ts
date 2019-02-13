import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '~/app/database/sqlite.service';
import { RouterExtensions } from 'nativescript-angular/router';
import { Encounter } from '~/shared/models/encounter.model';

@Component({
	moduleId: module.id,
	selector: 'add-encounter',
	templateUrl: 'add-encounter.component.html'
})

export class AddEncounterComponent implements OnInit {
	constructor(
		private _database: DatabaseService,
		private _routerExtensions: RouterExtensions) { 
		this._database.initializeDatabase();
	}

	ngOnInit() {

	}

	public returnToEncounters() {
		this._routerExtensions.back();
	}
	
    public addEncounter() {
		var currentTimestamp = new Date().getTime();

        this._database.insertEncounter(new Encounter(
            currentTimestamp,
            `Encounter ${currentTimestamp}`,
            new Date(),
            new Date()))
            .subscribe(encounterId => this.returnToEncounters());
    }
}