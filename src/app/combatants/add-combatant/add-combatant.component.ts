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
		this.combatantTracksHitPoints = false;

		this._database.initializeDatabase()
		.subscribe(() => this.retrieveEncounter());
	}

	ngOnInit() { }

	public combatantName: string;
	public combatantInitiative: string;
	public combatantTracksHitPoints: boolean;
	public combatantMaximumHitPoints: string;

	public retrieveEncounter(): void {
		this._database.retrieveEncounter(this._encounterId)
			.subscribe(encounter => this._encounter = encounter);
	}

	public returnToEncounter(): void {
		this._routerExtensions.back();
	}

	public formIsValid(): boolean {
		if (this.combatantName) {
			if(this.combatantName.trim() === '') {
				return false;
			}
		} else {
			return false;
		}

		if (this.combatantInitiative) {
			if(this.combatantInitiative.trim() === '') {
				return false;
			}

			if(isNaN(parseInt(this.combatantInitiative.trim()))) {
				return false;
			}
		} else {
			return false;
		}

		if (this.combatantTracksHitPoints) {
			if (this.combatantMaximumHitPoints) {
				if(this.combatantMaximumHitPoints.trim() === '') {
					return false;
				}
	
				if(isNaN(parseInt(this.combatantMaximumHitPoints.trim()))) {
					return false;
				}

				if (parseInt(this.combatantMaximumHitPoints) < 1) {
					return false;
				}
			} else {
				return false;
			}
		}

		return true;
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
		} else if (!this.combatantInitiative ||
				this.combatantInitiative.trim() === '' ||
				isNaN(parseInt(this.combatantInitiative.trim()))) {
			let options = {
				title: "You need a valid number for your combatant's initiative!",
				message: "Please enter an integer value for your combatant's initiative.",
				okButtonText: "OK"
			};

			alert(options);
		} else if (this.combatantTracksHitPoints && 
				   (!this.combatantMaximumHitPoints ||
					this.combatantMaximumHitPoints.trim() === '' ||
					isNaN(parseInt(this.combatantMaximumHitPoints.trim())) ||
					parseInt(this.combatantMaximumHitPoints) < 1)) {
			let options = {
				title: "Your combatant needs some hit points to track.",
				message: "Please enter a positive integer value for your combatant's maximum hit points.",
				okButtonText: "OK"
			};

			alert(options);
		} else {
			this._database.insertCombatant(new Combatant(
				0,
				this._encounterId,
				this.combatantName,
				true,
				Math.floor(+this.combatantInitiative),
				this.combatantTracksHitPoints,
				this.combatantTracksHitPoints ? Math.floor(+this.combatantMaximumHitPoints) : null,
				this.combatantTracksHitPoints ? Math.floor(+this.combatantMaximumHitPoints) : null
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