import { Component, OnInit } from "@angular/core";
import { Encounter } from "~/shared/models/encounter.model";
var Sqlite = require("nativescript-sqlite");

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    private database: any;
    public encounters: Array<Encounter>;

    public constructor() {
        this.encounters = [];
        (new Sqlite("encounter-tracker")).then(db => {
            db.execSQL("CREATE TABLE IF NOT EXISTS encounters (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, created DATETIME, modified DATETIME)").then(id => {
                this.database = db;
            }, error => {
                console.log("CREATE TABLE ERROR", error);
            });
        }, error => {
            console.log("OPEN DB ERROR", error);
        });
    }

    public insert() {
        this.database.execSQL("INSERT INTO encounters (name, created, modified) VALUES (?, ?, ?)", ["Encounter", new Date(), new Date()]).then(id => {
            console.log("INSERT RESULT", id);
            this.fetch();
        }, error => {
            console.log("INSERT ERROR", error);
        });
    }

    public fetch() {
        this.database.all("SELECT * FROM encounters").then(rows => {
            this.encounters = [];
            for(var row in rows) {
                this.encounters.push(
                    new Encounter(
                        rows[row][0],
                        rows[row][1]
                    ));
            }
        }, error => {
            console.log("SELECT ERROR", error);
        });
    }

    ngOnInit() {

    }
}
