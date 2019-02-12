export class Encounter {
    
    /**
     * Create a new instance of the Encounter class.
     */
    constructor(
        id: number,
        name: string,
        created: Date,
        modified: Date
    ) {
        this.id = id;
        this.name = name;
        this.created = created;
        this.modified = modified;
    }

    id: number;
    name: string;
    created: Date;
    modified: Date;
}