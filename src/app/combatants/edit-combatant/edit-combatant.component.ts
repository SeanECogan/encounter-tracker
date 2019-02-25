import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from '~/app/database/sqlite.service';
import { RouterExtensions } from 'nativescript-angular/router';
import { Combatant } from '~/shared/models/combatant.model';
import { ActivatedRoute } from '@angular/router';
import { Encounter } from '~/shared/models/encounter.model';

@Component({
	moduleId: module.id,
	selector: 'edit-combatant',
	templateUrl: './edit-combatant.component.html',
	styleUrls: ['./edit-combatant.component.css']
})

export class EditCombatantComponent implements OnInit {
	constructor(
		private _database: DatabaseService,
		private _routerExtensions: RouterExtensions,
		private _route: ActivatedRoute) {
		this._encounterId = this._route.snapshot.params.encounterId;
		this._combatantId = this._route.snapshot.params.combatantId;

		this._database.initializeDatabase()
		.subscribe(() => {
			this.retrieveEncounter();
			this.retrieveCombatant();
		});
	}

	ngOnInit() { }

	public combatantName: string;
	public combatantIsActive: boolean;
	public combatantInitiative: string;
	public combatantTracksHitPoints: boolean;
	public combatantMaximumHitPoints?: string;
	public combatantCurrentHitPoints?: string;
	
	public retrieveEncounter(): void {
		this._database.retrieveEncounter(this._encounterId)
			.subscribe(encounter => this._encounter = encounter);
	}

	public retrieveCombatant(): void {
		this._database.retrieveCombatant(this._combatantId)
			.subscribe(combatant => {
				this.combatantName = combatant.name;
				this.combatantIsActive = combatant.isActive;
				this.combatantInitiative = combatant.initiative.toString();
				this.combatantTracksHitPoints = (combatant.tracksHitPoints.toString() === 'true');
				this.combatantMaximumHitPoints = combatant.maximumHitPoints.toString();
				this.combatantCurrentHitPoints = combatant.currentHitPoints.toString();
			});
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
			if (this.combatantCurrentHitPoints) {
				if(this.combatantCurrentHitPoints.trim() === '') {
					return false;
				}
	
				if(isNaN(parseInt(this.combatantCurrentHitPoints.trim()))) {
					return false;
				}
			} else {
				return false;
			}
		}

		return true;
	}

	public updateCombatant(): void {
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
				   (!this.combatantCurrentHitPoints ||
					this.combatantCurrentHitPoints.trim() === '' ||
					isNaN(parseInt(this.combatantCurrentHitPoints.trim())))) {
			let options = {
				title: "Your combatant is tracking their hit points.",
				message: "Please enter an integer value for your combatant's current hit points.",
				okButtonText: "OK"
			};

			alert(options);
		} else {
			let updateCombatant: Combatant;

			if (this.combatantTracksHitPoints) {
				updateCombatant = new Combatant(
					this._combatantId,
					this._encounterId,
					this.combatantName,
					Math.floor(+this.combatantCurrentHitPoints) > 0,
					Math.floor(+this.combatantInitiative),
					true,
					Math.floor(+this.combatantMaximumHitPoints),
					Math.floor(+this.combatantCurrentHitPoints)
				);
			} else {
				updateCombatant = new Combatant(
					this._combatantId,
					this._encounterId,
					this.combatantName,
					this.combatantIsActive,
					Math.floor(+this.combatantInitiative),
					false,
					null,
					null
				);
			}

			this._database.updateCombatant(updateCombatant)
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
	private _combatantId: number;
}