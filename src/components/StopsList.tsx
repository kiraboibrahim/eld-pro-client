import React from 'react';
import { MapPin, Fuel, Coffee, Moon } from 'lucide-react';
import { Stop } from '@/types';

interface StopCardProps {
    icon: React.ReactNode;
    title: string;
    location: { lat: number; lng: number };
    time?: string;
    duration?: number;
}

function StopCard({ icon, title, location, time, duration }: StopCardProps) {
    return (
        <div className="flex items-center space-x-4 bg-slate-900/30 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition">
            <div className="flex-shrink-0">{icon}</div>
            <div className="flex-1">
                <p className="font-semibold text-white">{title}</p>
                <p className="text-sm text-slate-400">
                    {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                </p>
            </div>
            <div className="text-right">
                <p className="text-sm font-medium text-slate-300">{time}</p>
                {duration && <p className="text-xs text-slate-500">{duration}</p>}
            </div>
        </div>
    );
}

function getIcon(type: string) {
    switch (type) {
        case 'current':
            return <MapPin className="w-5 h-5 text-green-400" />;
        case 'pickup':
            return <MapPin className="w-5 h-5 text-blue-400" />;
        case 'dropoff':
            return <MapPin className="w-5 h-5 text-red-400" />;
        case 'coffee':
            return <Coffee className="w-5 h-5 text-cyan-400" />;
        case 'fuel':
            return <Fuel className="w-5 h-5 text-orange-400" />;
        case 'rest':
            return <Moon className="w-5 h-5 text-purple-400" />;
        default:
            return <MapPin className="w-5 h-5 text-slate-400" />;
    }
}


export default function StopsList({ stops = [] }: { stops?: Stop[] }) {
    return (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6">
            <h3 className="text-xl font-bold text-white mb-4">Trip Stops</h3>
            <div className="space-y-3">
                {stops.map((s, i) => (
                    <StopCard
                        key={i}
                        icon={getIcon(s.type)}
                        title={s.name}
                        location={{ lat: s.lat, lng: s.lng }}
                        duration={s.duration}
                    />
                ))}
            </div>
        </div>
    );
}
