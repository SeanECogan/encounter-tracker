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

    public getCreatedDateString(): string {
        return `${this._months[this.created.getMonth()]} ${this.created.getDate()}, ${this.created.getFullYear()}`;
    }

    public getModifiedDateString(): string {
        return `${this._months[this.modified.getMonth()]} ${this.modified.getDate()}, ${this.modified.getFullYear()}`;
    }

    private _months: string[] = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
}