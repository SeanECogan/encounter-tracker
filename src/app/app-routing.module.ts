import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { EncountersComponent } from "./encounters/encounters.component";
import { AddEncounterComponent } from "./encounters/add-encounter/add-encounter.component";
import { EncounterComponent } from "./encounters/encounter/encounter.component";

const routes: Routes = [
    { path: "", redirectTo: "encounters", pathMatch: "full" },
    { path: "encounters", component: EncountersComponent },
    { path: "add-encounter", component: AddEncounterComponent },
    { path: "encounter/:id", component: EncounterComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
