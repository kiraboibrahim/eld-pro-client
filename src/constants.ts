import { TripResponse, LogSheetData } from '@/types';

export const DUMMY_ROUTE_DATA: TripResponse = {
    route: {
        distance_miles: 1042.3,
        duration_hours: 17.5,
        route_coordinates: [
            { lat: 32.7767, lng: -96.7970 }, // Dallas
            { lat: 32.6543, lng: -96.5678 },
            { lat: 32.3456, lng: -95.9876 },
            { lat: 31.7619, lng: -95.3698 },
            { lat: 30.2672, lng: -95.3698 }, // Houston
            { lat: 29.7604, lng: -95.3698 },
            { lat: 29.9511, lng: -93.9711 },
            { lat: 30.2241, lng: -92.0198 },
            { lat: 30.4515, lng: -91.1871 },
            { lat: 30.9843, lng: -91.9623 },
            { lat: 31.3113, lng: -92.4451 },
            { lat: 32.5251, lng: -92.0826 },
            { lat: 32.5007, lng: -90.1848 },
            { lat: 32.2988, lng: -90.1848 },
            { lat: 32.3668, lng: -88.7034 },
            { lat: 32.8067, lng: -87.8967 },
            { lat: 33.2098, lng: -87.5692 },
            { lat: 33.5186, lng: -86.8104 }, // Birmingham
            { lat: 33.6542, lng: -85.8318 },
            { lat: 33.7490, lng: -84.3880 }  // Atlanta
        ],
        segments: []
    },
    stops: {
        pickup: { lat: 29.7604, lng: -95.3698, name: 'Houston, TX', duration: 1 },
        dropoff: { lat: 33.7490, lng: -84.3880, name: 'Atlanta, GA', duration: 1 },
        fuel_stops: [
            { lat: 30.4515, lng: -91.1871, name: 'Baton Rouge, LA', distance: 520, duration: 0.5 },
        ],
        rest_stops: [
            { lat: 32.8067, lng: -87.8967, name: 'Tuscaloosa, AL', time: '22:00', duration: 10, day: 1 }
        ],
        break_stops: [
            { lat: 30.4515, lng: -91.1871, name: 'Baton Rouge, LA', time: '14:00', duration: 0.5 }
        ]
    },
    timeline: {
        start_time: '06:00',
        estimated_completion: '23:30',
        total_days: 2
    },
    hos_summary: {
        remaining_70hr_cycle: 25,
        used_70hr_cycle: 45,
        driving_time_used: 11,
        on_duty_time_used: 13.5
    }
};

export const DUMMY_LOG_SHEETS: LogSheetData[] = [
    {
        date: '10/21/2025',
        day: 1,
        driverName: 'John Doe',
        carrierName: 'ELD Pro Transport',
        vehicleNumber: 'TRK-101',
        totalMiles: 550,
        dutyStatusChanges: [
            { time: '00:00', status: 'off_duty', location: 'Dallas, TX' },
            { time: '06:00', status: 'on_duty', location: 'Dallas, TX' },
            { time: '06:30', status: 'driving', location: 'Dallas, TX' },
            { time: '10:30', status: 'on_duty', location: 'Houston, TX' },
            { time: '11:30', status: 'driving', location: 'Houston, TX' },
            { time: '14:00', status: 'on_duty', location: 'Baton Rouge, LA' },
            { time: '14:30', status: 'driving', location: 'Baton Rouge, LA' },
            { time: '19:30', status: 'on_duty', location: 'Tuscaloosa, AL' },
            { time: '20:00', status: 'sleeper_berth', location: 'Tuscaloosa, AL' }
        ],
        remarks: [
            '06:00 - Dallas, TX (Start)',
            '10:30 - Houston, TX (Pickup - 1hr)',
            '14:00 - Baton Rouge, LA (Fuel + 30min break)',
            '20:00 - Tuscaloosa, AL (10hr rest)'
        ],
        totals: {
            offDuty: 6,
            sleeperBerth: 4,
            driving: 11,
            onDuty: 3
        }
    },
    {
        date: '10/22/2025',
        day: 2,
        driverName: 'John Doe',
        carrierName: 'ELD Pro Transport',
        vehicleNumber: 'TRK-101',
        totalMiles: 492,
        dutyStatusChanges: [
            { time: '00:00', status: 'sleeper_berth', location: 'Tuscaloosa, AL' },
            { time: '06:00', status: 'on_duty', location: 'Tuscaloosa, AL' },
            { time: '06:30', status: 'driving', location: 'Tuscaloosa, AL' },
            { time: '10:30', status: 'on_duty', location: 'Atlanta, GA' },
            { time: '11:30', status: 'off_duty', location: 'Atlanta, GA' }
        ],
        remarks: [
            '00:00 - Tuscaloosa, AL (10hr rest complete)',
            '06:30 - Resume driving',
            '10:30 - Atlanta, GA (Dropoff - 1hr)',
            '11:30 - Trip complete'
        ],
        totals: {
            offDuty: 12.5,
            sleeperBerth: 6,
            driving: 4,
            onDuty: 1.5
        }
    }
];
