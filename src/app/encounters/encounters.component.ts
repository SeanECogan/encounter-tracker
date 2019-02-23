import { Component, OnInit } from "@angular/core";
import { Encounter } from "~/shared/models/encounter.model";
import { DatabaseService } from "../database/sqlite.service";
import { RouterExtensions } from "nativescript-angular/router";
import { EventData, Page } from "tns-core-modules/ui/page/page";
import { GestureEventData } from "tns-core-modules/ui/gestures/gestures";

@Component({
    selector: "Encounters",
    moduleId: module.id,
    templateUrl: "./encounters.component.html"
})
export class EncountersComponent implements OnInit {
    public constructor(
        private _database: DatabaseService,
        private _routerExtensions: RouterExtensions,
        private _page: Page) {
        this.initialize();
    }

    ngOnInit() {
        this.initialize();

        this._page.on('navigatingTo', (data) => {  
            this.initialize();
        });
    }

    public encounters: Array<Encounter>;

    public navigateToAddEncounter() {
        this._routerExtensions.navigate([ 'add-encounter' ]);
    }

    public navigateToEncounter(args: GestureEventData, encounterId: number) {
        args.object.set('backgroundColor', '#E8E8E8');
        this._routerExtensions.navigate([ 'encounter', encounterId.toString() ]);
		setTimeout(() => args.object.set('backgroundColor', '#FFFFFF'), 100);
    }

    public refresh() {
        this._database.retrieveEncounters()
            .subscribe(encounters => this.encounters = encounters);
    }

    public reset() {
        this._database.deleteDatabase();
        
        this._database.initializeDatabase()
            .subscribe(() => this.refresh());            
    }

    private initialize() {
        this.encounters = [];

        this._database.initializeDatabase()
            .subscribe(() => this.refresh());
    }
}