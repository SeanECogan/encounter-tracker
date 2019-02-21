import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { DatabaseService } from "../database/sqlite.service";
import { AddCombatantComponent } from "./add-combatant/add-combatant.component";

@NgModule({
    imports: [
        NativeScriptFormsModule,
        NativeScriptCommonModule
    ],
    declarations: [
        AddCombatantComponent
    ],
    providers: [        
        DatabaseService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CombatantsModule { }
