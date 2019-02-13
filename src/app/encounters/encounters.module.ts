import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { DatabaseService } from "../database/sqlite.service";
import { AddEncounterComponent } from "./add-encounter/add-encounter.component";
import { EncountersComponent } from "./encounters.component";

@NgModule({
    imports: [
        NativeScriptCommonModule
    ],
    declarations: [
        EncountersComponent,
        AddEncounterComponent
    ],
    providers: [        
        DatabaseService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class EncountersModule { }
