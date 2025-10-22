export interface Location {
    lat: number;
    lng: number;
}

export interface TripFormData {
    currentLocation: string;
    pickupLocation: string;
    dropoffLocation: string;
    currentCycleHours: number;
}

export interface RouteCoordinate {
    lat: number;
    lng: number;
}

export interface RouteSegment {
    distance_miles: number;
    duration_hours: number;
    steps?: [];
}

export interface RouteData {
    distance_miles: number;
    duration_hours: number;
    route_coordinates: RouteCoordinate[];
    segments: RouteSegment[];
}

export interface Stop {
    lat: number;
    lng: number;
    name: string;
    duration: number;
    distance?: number;
    time?: string;
    day?: number;
    type?: string;
}

export interface Stops {
    pickup: Stop;
    dropoff: Stop;
    fuel_stops: Stop[];
    rest_stops: Stop[];
    break_stops: Stop[];
}

export interface Timeline {
    start_time: string;
    estimated_completion: string;
    total_days: number;
}

export interface HOSSummary {
    remaining_70hr_cycle: number;
    used_70hr_cycle: number;
    driving_time_used: number;
    on_duty_time_used: number;
}

export interface TripResponse {
    route: RouteData;
    stops: Stops;
    timeline: Timeline;
    hos_summary: HOSSummary;
}

export type DutyStatus = 'off_duty' | 'sleeper_berth' | 'driving' | 'on_duty';

export interface DutyStatusChange {
    time: string;
    status: DutyStatus;
    location: string;
}

export interface LogTotals {
    offDuty: number;
    sleeperBerth: number;
    driving: number;
    onDuty: number;
}

export interface LogSheetData {
    date: string;
    day: number;
    driverName: string;
    carrierName: string;
    vehicleNumber: string;
    totalMiles: number;
    dutyStatusChanges: DutyStatusChange[];
    remarks: string[];
    totals: LogTotals;
}

export interface MapPoint extends Location {
    type: 'current' | 'pickup' | 'dropoff' | 'fuel' | 'rest' | 'break';
    name: string;
    duration?: number;
    distance?: number;
    time?: string;
}

export type MarkerType = 'current' | 'pickup' | 'dropoff' | 'fuel' | 'rest' | 'break';