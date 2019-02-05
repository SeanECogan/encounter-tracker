export class Entity {
    
    /**
     * Create a new instance of the Entity class.
     */
    constructor(
        id: number,
        name: string,
        initiative: number,
        isTrackingHitPoints: boolean,
        maximumHitPoints?: number
    ) {
        this.id = id;
        this.name = name;
        this.initiative = initiative;
        this.isTrackingHitPoints = isTrackingHitPoints;

        if (isTrackingHitPoints) {
            this.maximumHitPoints = maximumHitPoints;
            this.currentHitPoints = maximumHitPoints;
        } else {
            this.maximumHitPoints = null;
            this.currentHitPoints = null;
        }
    }

    id: number;
    name: string;
    initiative: number;
    isTrackingHitPoints: boolean;
    maximumHitPoints?: number;
    currentHitPoints?: number;
    isActive: boolean;
}