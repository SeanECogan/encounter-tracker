import { Injectable } from '@angular/core';
import { Encounter } from '~/shared/models/encounter.model';
import { Observable, from } from 'rxjs';
import { Combatant } from '~/shared/models/combatant.model';
var Sqlite = require('nativescript-sqlite');

@Injectable()
export class DatabaseService {
    public initializeDatabase(): Observable<void> {
        var initializePromise = (new Sqlite('encounter-tracker')).then(db => {
            this._database = db;

            this._database.execSQL('CREATE TABLE IF NOT EXISTS encounters (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name TEXT NOT NULL, created DATETIME NOT NULL, modified DATETIME NOT NULL)').then(
                id => { },
                error => {
                    console.log('Error creating encounters tables: ', error);
                }
            );

            this._database.execSQL('CREATE TABLE IF NOT EXISTS combatants (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, encounterId INTEGER NOT NULL, name TEXT NOT NULL, isActive BOOLEAN NOT NULL, initiative INTEGER NOT NULL, tracksHitPoints BOOLEAN NOT NULL, maximumHitPoints INTEGER, currentHitPoints INTEGER, FOREIGN KEY (encounterId) REFERENCES encounters(id))').then(
                id => { },
                error => {
                    console.log('Error creating combatants tables: ', error);
                }
            );
        }, error => {
            console.log('Error opening database connection: ', error);
        });

        return from(initializePromise);
    }

    public deleteDatabase(): void {
        Sqlite.deleteDatabase('encounter-tracker');
    }

    public retrieveEncounters(): Observable<Encounter[]> {
        const retrievePromise = this._database.all('SELECT * FROM encounters').then(rows => {
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
            console.log('Error retrieving all encounters: ', error);
        });

        return from(retrievePromise);
    }

    public retrieveEncounter(encounterId: number): Observable<Encounter> {
        const retrievePromise = this._database.all(`SELECT * FROM encounters WHERE id = ${encounterId}`).then(rows => {
            if (rows.length > 0) {
                const encounterRow = rows[0];

                return new Encounter(
                    +encounterRow[0],
                    encounterRow[1],
                    new Date(encounterRow[2]),
                    new Date(encounterRow[3])
                );
            } else {
                return null;
            }
        }, error => {
            console.log(`Error retrieving encounter ${encounterId}: `, error);
        });

        return from(retrievePromise);
    }

    public insertEncounter(encounter: Encounter): Observable<number> {
        const insertPromise = this._database.execSQL(
            'INSERT INTO encounters (name, created, modified) VALUES (?, ?, ?)',
            [encounter.name, encounter.created, encounter.modified])
            .then(id => {
                return id;
            }, error => {
                console.log('Error inserting encounter: ', error);
            });

        return from(insertPromise);
    }

    public retrieveCombatants(encounterId: number): Observable<Combatant[]> {
        const retrievePromise = this._database.all(`SELECT * FROM combatants WHERE encounterId = ${encounterId}`).then(rows => {
            let combatants = [];

            for (var row in rows) {
                combatants.push(
                    new Combatant(
                        +rows[row][0],
                        +rows[row][1],
                        rows[row][2],
                        rows[row][3] as boolean,
                        +rows[row][4],
                        rows[row][5] as boolean,
                        +rows[row][6],
                        +rows[row][7],
                    ));
            }

            combatants.sort((a: Combatant, b: Combatant) => {
                return b.initiative - a.initiative;
            });

            return combatants;
        }, error => {
            console.log(`Error retrieving combatants for encounter ${encounterId}: `, error);
        });

        return from(retrievePromise);
    }

    public retrieveCombatant(combatantId: number): Observable<Combatant> {
        const retrievePromise = this._database.all(`SELECT * FROM combatants WHERE id = ${combatantId}`).then(rows => {
            if (rows.length > 0) {
                const combatantRow = rows[0];

                return new Combatant(
                    +combatantRow[0],
                    +combatantRow[1],
                    combatantRow[2],
                    combatantRow[3] as boolean,
                    +combatantRow[4],
                    combatantRow[5] as boolean,
                    +combatantRow[6],
                    +combatantRow[7],
                );
            } else {
                return null;
            }
        }, error => {
            console.log(`Error retrieving combatant ${combatantId}: `, error);
        });

        return from(retrievePromise);
    }

    public insertCombatant(combatant: Combatant): Observable<number> {
        const insertPromise = this._database.execSQL(
            'INSERT INTO combatants (encounterId, name, isActive, initiative, tracksHitPoints, maximumHitPoints, currentHitPoints) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [combatant.encounterId, combatant.name, combatant.isActive, combatant.initiative, combatant.tracksHitPoints, combatant.maximumHitPoints, combatant.currentHitPoints])
            .then(id => {
                return id;
            }, error => {
                console.log('Error inserting combatant: ', error);
            });

        return from(insertPromise);
    }

    private _database: any;
}