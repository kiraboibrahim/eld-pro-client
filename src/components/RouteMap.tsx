import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { TripResponse, MapPoint } from '@/types';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default marker icon issue
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icons
const createIcon = (color: string) => L.divIcon({
    className: 'custom-icon',
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
});

const icons = {
    current: createIcon('#10b981'),
    pickup: createIcon('#3b82f6'),
    dropoff: createIcon('#ef4444'),
    fuel: createIcon('#f59e0b'),
    rest: createIcon('#8b5cf6'),
    break: createIcon('#06b6d4')
};

// Auto-fit bounds component
function FitBounds({ coordinates }: { coordinates: { lat: number; lng: number }[] }) {
    const map = useMap();

    useEffect(() => {
        if (coordinates && coordinates.length > 0) {
            const bounds = coordinates.map(coord => [coord.lat, coord.lng] as [number, number]);
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [coordinates, map]);

    return null;
}

interface RouteMapProps {
    tripData: TripResponse;
}

export default function RouteMap({ tripData }: RouteMapProps) {
    const allMapPoints: MapPoint[] = [
        {
            ...tripData.route.route_coordinates[0],
            type: 'current',
            name: 'Current Location'
        },
        { ...tripData.stops.pickup, type: 'pickup' },
        { ...tripData.stops.dropoff, type: 'dropoff' },
        ...tripData.stops.fuel_stops.map(s => ({ ...s, type: 'fuel' as const })),
        ...tripData.stops.rest_stops.map(s => ({ ...s, type: 'rest' as const })),
        ...tripData.stops.break_stops.map(s => ({ ...s, type: 'break' as const }))
    ];
    console.log(
        allMapPoints
    )
    return (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 overflow-hidden shadow-2xl">
            <div className="h-[600px]">
                <MapContainer
                    center={[32.7767, -96.7970]}
                    zoom={6}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        attribution='&copy; CartoDB'
                    />

                    {/* Route Line */}
                    <Polyline
                        positions={tripData.route.route_coordinates.map(c => [c.lat, c.lng])}
                        color="#3b82f6"
                        weight={4}
                        opacity={0.8}
                    />

                    {/* Markers */}
                    {allMapPoints.map((point, idx) => (
                        <Marker
                            key={idx}
                            position={[point.lat, point.lng]}
                            icon={icons[point.type]}
                        >
                            <Popup>
                                <div className="text-sm">
                                    <strong>{point.name}</strong>
                                    {point.duration && <p>Duration: {point.duration}hr</p>}
                                    {point.distance && <p>{point.distance} miles from start</p>}
                                </div>
                            </Popup>
                        </Marker>
                    ))}

                    <FitBounds coordinates={allMapPoints} />
                </MapContainer>
            </div>
        </div>
    );
}