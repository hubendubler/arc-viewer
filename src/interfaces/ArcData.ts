export interface ArcData {
    timelineItems: TimelineItem[];
}

export interface TimelineItem {
    activeEnergyBurned: number;
    floorsDescended?: number | null;
    hkStepCount?: number | null;
    radius: Radius;
    place?: Place | null;
    itemId: string;
    nextItemId?: string | null;
    stepCount: number;
    endDate: string;
    manualPlace?: boolean | null;
    altitude: number;
    previousItemId?: string | null;
    placeId?: string | null;
    maxHeartRate: number;
    samples?: Sample[] | null;
    averageHeartRate: number;
    startDate: string;
    center: Coordinates;
    isVisit: boolean;
    floorsAscended?: number | null;
    streetAddress?: string | null;
    uncertainActivityType?: boolean | null;
    activityType?: string | null;
    manualActivityType?: boolean | null;
    activityTypeConfidenceScore?: number | null;
    customTitle?: string | null;
}

export interface Radius {
    mean: number;
    sd: number;
}

export interface Place {
    placeId: string;
    radius: Radius;
    name: string;
    center: Coordinates;
    isHome?: boolean | null;
    foursquareVenueId?: string | null;
    foursquareCategoryId?: string | null;
    facebookPlaceId?: string | null;
}

export interface Coordinates {
    longitude: number;
    latitude: number;
}

export interface Sample {
    zAcceleration?: number | null;
    recordingState: string;
    secondsFromGMT?: number;
    timelineItemId: string;
    sampleId: string;
    location?: Location | null;
    stepHz?: number | null;
    date: string;
    movingState: string;
    courseVariance?: number | null;
    xyAcceleration?: number | null;
    coreMotionActivityType?: string | null;
    confirmedType?: string | null;
}

export type Location = Coordinates & SampleData;

export interface SampleData {
    verticalAccuracy: number;
    speed: number;
    horizontalAccuracy: number;
    course: number;
    timestamp: string;
    altitude: number;
}
