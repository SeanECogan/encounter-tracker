import { Component, OnInit } from "@angular/core";
import { Encounter } from "~/shared/models/encounter.model";
import { DatabaseService } from "../database/sqlite.service";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    public encounters: Array<Encounter>;

    public constructor(private database: DatabaseService) {
        this.encounters = [];

        this.database.initializeDatabase()
            .subscribe(() => this.refresh());
    }

    public insert() {
        this.database.insertEncounter(new Encounter(
            this.encounters.length + 1,
            `Encounter ${this.encounters.length + 1}`,
            new Date(),
            new Date()))
            .subscribe(encounterId => this.refresh());
    }

    public refresh() {
        this.database.retrieveEncounters()
            .subscribe(encounters => this.encounters = encounters);
    }

    public reset() {
        this.database.deleteDatabase();
        
        this.database.initializeDatabase()
            .subscribe(() => this.refresh());
            
    }

    ngOnInit() {

    }
}
