import Color from 'color';

export enum ActivityType {
    // special types
    Unknown = 'unknown',
    Bogus = 'bogus',

    // base types
    Stationary = 'stationary',
    Walking = 'walking',
    Running = 'running',
    Cycling = 'cycling',
    Car = 'car',
    Airplane = 'airplane',

    // transport types
    Train = 'train',
    Bus = 'bus',
    Motorcycle = 'motorcycle',
    Boat = 'boat',
    Tram = 'tram',
    Tractor = 'tractor',
    Tuktuk = 'tuktuk',
    Songthaew = 'songthaew',
    Scooter = 'scooter',
    Metro = 'metro',
    CableCar = 'cableCar',
    Funicular = 'funicular',
    Chairlift = 'chairlift',
    SkiLift = 'skiLift',
    Taxi = 'taxi',

    // active types
    Skateboarding = 'skateboarding',
    InlineSkating = 'inlineSkating',
    Snowboarding = 'snowboarding',
    Skiing = 'skiing',
    Horseback = 'horseback',
    Swimming = 'swimming',
    Golf = 'golf',
    Wheelchair = 'wheelchair',
    Rowing = 'rowing',
    Kayaking = 'kayaking'
}

export const ActivityTypes: Array<ActivityType> = [
    // special types
    ActivityType.Unknown,
    ActivityType.Bogus,

    // base types
    ActivityType.Stationary,
    ActivityType.Walking,
    ActivityType.Running,
    ActivityType.Cycling,
    ActivityType.Car,
    ActivityType.Airplane,

    // transport types
    ActivityType.Train,
    ActivityType.Bus,
    ActivityType.Motorcycle,
    ActivityType.Boat,
    ActivityType.Tram,
    ActivityType.Tractor,
    ActivityType.Tuktuk,
    ActivityType.Songthaew,
    ActivityType.Scooter,
    ActivityType.Metro,
    ActivityType.CableCar,
    ActivityType.Funicular,
    ActivityType.Chairlift,
    ActivityType.SkiLift,
    ActivityType.Taxi,

    // active types
    ActivityType.Skateboarding,
    ActivityType.InlineSkating,
    ActivityType.Snowboarding,
    ActivityType.Skiing,
    ActivityType.Horseback,
    ActivityType.Swimming,
    ActivityType.Golf,
    ActivityType.Wheelchair,
    ActivityType.Rowing,
    ActivityType.Kayaking
];

export const getActivityColor = (activityType: ActivityType): Color => {
    switch (activityType) {
        case ActivityType.Motorcycle:
        case ActivityType.Scooter:
            return Color.hsl(8, 74, 57);
        case ActivityType.Running:
            return Color.hsl(27, 84, 51);
        case ActivityType.Tuktuk:
        case ActivityType.Songthaew:
            return Color.hsl(41, 72, 41);
        case ActivityType.Tram:
        case ActivityType.Train:
        case ActivityType.SkiLift:
        case ActivityType.Metro:
        case ActivityType.Funicular:
        case ActivityType.Chairlift:
        case ActivityType.CableCar:
            return Color.hsl(48, 55, 43);
        case ActivityType.Walking:
        case ActivityType.Wheelchair:
        case ActivityType.Golf:
            return Color.hsl(148, 80, 36);
        case ActivityType.Skateboarding:
            return Color.hsl(186, 76, 39);
        case ActivityType.Cycling:
        case ActivityType.Swimming:
        case ActivityType.Rowing:
        case ActivityType.Kayaking:
            return Color.hsl(196, 97, 42);
        case ActivityType.Snowboarding:
            return Color.hsl(205, 41, 48);
        case ActivityType.Boat:
            return Color.hsl(223, 91, 60);
        case ActivityType.Bus:
            return Color.hsl(229, 48, 48);
        case ActivityType.Skiing:
            return Color.hsl(229, 57, 35);
        case ActivityType.Car:
        case ActivityType.Taxi:
            return Color.hsl(231, 14, 36);
        case ActivityType.Tractor:
            return Color.hsl(233, 16, 21);
        case ActivityType.Airplane:
            return Color.hsl(277, 76, 47);
        case ActivityType.Horseback:
            return Color.hsl(277, 76, 47);
        case ActivityType.InlineSkating:
            return Color.hsl(339, 63, 59);
        case ActivityType.Unknown:
        case ActivityType.Bogus:
        case ActivityType.Stationary:
        default:
            return Color.hsl(0, 0, 60);
    }
};
