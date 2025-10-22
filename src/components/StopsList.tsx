import React from 'react';
import { MapPin, Fuel, Coffee, Moon } from 'lucide-react';

interface StopCardProps {
    icon: React.ReactNode;
    title: string;
    location: string;
    time: string;
    duration?: string;
}

function StopCard({ icon, title, location, time, duration }: StopCardProps) {
    return (
        <div className="flex items-center space-x-4 bg-slate-900/30 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition">
            <div className="flex-shrink-0">{icon}</div>
            <div className="flex-1">
                <p className="font-semibold text-white">{title}</p>
                <p className="text-sm text-slate-400">{location}</p>
            </div>
            <div className="text-right">
                <p className="text-sm font-medium text-slate-300">{time}</p>
                {duration && <p className="text-xs text-slate-500">{duration}</p>}
            </div>
        </div>
    );
}

export default function StopsList() {
    return (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6">
            <h3 className="text-xl font-bold text-white mb-4">Trip Stops</h3>
            <div className="space-y-3">
                <StopCard
                    icon={<MapPin className="w-5 h-5 text-green-400" />}
                    title="Current Location"
                    location="Dallas, TX"
                    time="06:00"
                />
                <StopCard
                    icon={<MapPin className="w-5 h-5 text-blue-400" />}
                    title="Pickup"
                    location="Houston, TX"
                    time="10:30"
                    duration="1 hour"
                />
                <StopCard
                    icon={<Coffee className="w-5 h-5 text-cyan-400" />}
                    title="30-Min Break"
                    location="Baton Rouge, LA"
                    time="14:00"
                    duration="30 min"
                />
                <StopCard
                    icon={<Fuel className="w-5 h-5 text-orange-400" />}
                    title="Fuel Stop"
                    location="Baton Rouge, LA"
                    time="14:00"
                    duration="30 min"
                />
                <StopCard
                    icon={<Moon className="w-5 h-5 text-purple-400" />}
                    title="10-Hour Rest"
                    location="Tuscaloosa, AL"
                    time="20:00"
                    duration="10 hours"
                />
                <StopCard
                    icon={<MapPin className="w-5 h-5 text-red-400" />}
                    title="Dropoff"
                    location="Atlanta, GA"
                    time="10:30"
                    duration="1 hour"
                />
            </div>
        </div>
    );
}