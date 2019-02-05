import { Entity } from "./entity.model";

export class Encounter {
    
    /**
     * Create a new instance of the Encounter class.
     */
    constructor(
        id: number,
        name: string
    ) {
        this.id = id;
        this.name = name;
        this.created = new Date();
        this.modified = new Date();
        this.entities = new Array<Entity>();
    }

    id: number;
    name: string;
    created: Date;
    modified: Date;
    entities: Entity[];
}