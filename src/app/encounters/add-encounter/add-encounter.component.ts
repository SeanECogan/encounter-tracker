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

	public encounterName: string;

	public returnToEncounters() {
		this._routerExtensions.back();
	}

	public formIsValid(): boolean {
		if (this.encounterName) {
			return this.encounterName.trim() !== '';
		} else {
			return false;
		}
	}

	public addEncounter() {
		if (!this.encounterName ||
			this.encounterName.trim() === '') {
			let options = {
				title: "Your encounter needs a name!",
				message: "Please enter a name for your encounter.",
				okButtonText: "OK"
			};

			alert(options);
		} else {
			this._database.insertEncounter(new Encounter(
				0,
				this.encounterName,
				new Date(),
				new Date()))
				.subscribe(encounterId => this.returnToEncounters());
		}
	}
}