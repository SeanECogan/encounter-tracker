import { Injectable } from "@angular/core";
var Sqlite = require("nativescript-sqlite");

@Injectable()
export class DatabaseService {

    public getdbConnection() {
        return new Sqlite('encounter-tracker');
    }

    public closedbConnection() {
        new Sqlite('encounter-tracker')
            .then((db) => {
                db.close();
            })
    }
}