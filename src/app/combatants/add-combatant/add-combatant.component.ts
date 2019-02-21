import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from '~/app/database/sqlite.service';
import { RouterExtensions } from 'nativescript-angular/router';
import { Combatant } from '~/shared/models/combatant.model';
import { ActivatedRoute } from '@angular/router';
import { Encounter } from '~/shared/models/encounter.model';

@Component({
	moduleId: module.id,
	selector: 'add-combatant',
	templateUrl: './add-combatant.component.html',
	styleUrls: ['./add-combatant.component.css']
})

export class AddCombatantComponent implements OnInit {
	constructor(
		private _database: DatabaseService,
		private _routerExtensions: RouterExtensions,
		private _route: ActivatedRoute) {
		this._encounterId = this._route.snapshot.params.encounterId;

		this._database.initializeDatabase()
		.subscribe(() => this.retrieveEncounter());
	}

	ngOnInit() { }

	public combatantName: string;

	public retrieveEncounter(): void {
		this._database.retrieveEncounter(this._encounterId)
			.subscribe(encounter => this._encounter = encounter);
	}

	public returnToEncounter(): void {
		this._routerExtensions.back();
	}

	public formIsValid(): boolean {
		if (this.combatantName) {
			return this.combatantName.trim() !== '';
		} else {
			return false;
		}
	}

	public addCombatant(): void {
		if (!this.combatantName ||
			this.combatantName.trim() === '') {
			let options = {
				title: "Your combatant needs a name!",
				message: "Please enter a name for your combatant.",
				okButtonText: "OK"
			};

			alert(options);
		} else {
			this._database.insertCombatant(new Combatant(
				0,
				this._encounterId,
				this.combatantName,
				true,
				Math.ceil(Math.random() * 20),
				true,
				20,
				20
			))
			.subscribe(combatantId => {
				this._database.updateEncounter(new Encounter(
					this._encounter.id,
					this._encounter.name,
					this._encounter.created,
					new Date()
				))
				.subscribe(success => this.returnToEncounter());
			});
		}
	}

	
	private _encounterId: number;
	private _encounter: Encounter;
}