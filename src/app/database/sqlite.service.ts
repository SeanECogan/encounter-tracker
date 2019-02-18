import { Injectable } from "@angular/core";
import { Encounter } from "~/shared/models/encounter.model";
import { Observable, from } from "rxjs";
var Sqlite = require("nativescript-sqlite");

@Injectable()
export class DatabaseService {
    public initializeDatabase(): Observable<void> {
        var initializePromise = (new Sqlite("encounter-tracker")).then(db => {
            db.execSQL("CREATE TABLE IF NOT EXISTS encounters (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, created DATETIME, modified DATETIME)").then(id => {
                this._database = db;
            }, error => {
                console.log("Error creating encounters tables: ", error);
            });
        }, error => {
            console.log("Error opening database connection: ", error);
        });

        return from(initializePromise);
    }

    public deleteDatabase(): void {
        Sqlite.deleteDatabase("encounter-tracker");
    }

    public retrieveEncounters(): Observable<Encounter[]> {
        const retrievePromise = this._database.all("SELECT * FROM encounters").then(rows => {
            let encounters = [];

            for (var row in rows) {
                encounters.push(
                    new Encounter(
                        +rows[row][0],
                        rows[row][1],
                        new Date(rows[row][2]),
                        new Date(rows[row][3])
                    ));
            }

            encounters.sort((a: Encounter, b: Encounter) => {
                return b.modified.getTime() - a.modified.getTime();
            });

            return encounters;
        }, error => {
            console.log("Error retrieving all encounters: ", error);
        });

        return from(retrievePromise);
    }

    public insertEncounter(encounter: Encounter): Observable<number> {
        const insertPromise = this._database.execSQL(
            "INSERT INTO encounters (name, created, modified) VALUES (?, ?, ?)",
            [encounter.name, encounter.created, encounter.modified])
            .then(id => {
                return id;
            }, error => {
                console.log("Error inserting encounter: ", error);
            });

        return from(insertPromise);
    }

    private _database: any;
}