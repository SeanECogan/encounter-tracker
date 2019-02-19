export class Combatant {    
    /**
     * Create a new instance of the Combatant class.
     */
    constructor(
        id: number,
        encounterId: number,
        name: string,
        isActive: boolean,
        initiative: number,
        tracksHitPoints: boolean,
        maximumHitPoints?: number,
        currentHitPoints?: number
    ) {
        this.id = id;
        this.encounterId = encounterId;
        this.name = name;
        this.isActive = isActive;
        this.initiative = initiative;
        this.tracksHitPoints = tracksHitPoints;

        if (tracksHitPoints) {
            this.maximumHitPoints = maximumHitPoints;
            this.currentHitPoints = currentHitPoints;
        } else {
            this.maximumHitPoints = null;
            this.currentHitPoints = null;
        }
    }

    id: number;
    encounterId: number;
    name: string;
    isActive: boolean;
    initiative: number;
    tracksHitPoints: boolean;
    maximumHitPoints?: number;
    currentHitPoints?: number;
}