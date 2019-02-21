import { Component, OnInit } from "@angular/core";
import { Encounter } from "~/shared/models/encounter.model";
import { DatabaseService } from "../database/sqlite.service";
import { RouterExtensions } from "nativescript-angular/router";
import { EventData, Page } from "tns-core-modules/ui/page/page";

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

    public navigateToEncounter(encounterId: number) {
        this._routerExtensions.navigate([ 'encounter', encounterId.toString() ]);
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