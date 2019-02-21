import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { AddCombatantComponent } from "./combatants/add-combatant/add-combatant.component";
import { AddEncounterComponent } from "./encounters/add-encounter/add-encounter.component";
import { EncounterComponent } from "./encounters/encounter/encounter.component";
import { EncountersComponent } from "./encounters/encounters.component";

const routes: Routes = [
    { path: "", redirectTo: "encounters", pathMatch: "full" },
    { path: "encounters", component: EncountersComponent },
    { path: "add-encounter", component: AddEncounterComponent },
    { path: "encounter/:id", component: EncounterComponent },
    { path: "encounter/:encounterId/add-combatant", component: AddCombatantComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
