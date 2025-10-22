import React from 'react';
import { MapPin, Clock, Calendar, TrendingUp } from 'lucide-react';
import { TripResponse } from '@/types';

interface TripSummaryCardsProps {
    tripData: TripResponse;
}

export default function TripSummaryCards({ tripData }: TripSummaryCardsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                <MapPin className="w-8 h-8 mb-2 opacity-80" />
                <p className="text-sm opacity-90 mb-1">Total Distance</p>
                <p className="text-3xl font-bold">
                    {tripData.route.distance_miles.toFixed(0)}
                </p>
                <p className="text-sm opacity-80">miles</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                <Clock className="w-8 h-8 mb-2 opacity-80" />
                <p className="text-sm opacity-90 mb-1">Est. Duration</p>
                <p className="text-3xl font-bold">
                    {tripData.route.duration_hours.toFixed(1)}
                </p>
                <p className="text-sm opacity-80">hours</p>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
                <Calendar className="w-8 h-8 mb-2 opacity-80" />
                <p className="text-sm opacity-90 mb-1">Total Days</p>
                <p className="text-3xl font-bold">
                    {tripData.timeline.total_days}
                </p>
                <p className="text-sm opacity-80">days</p>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
                <TrendingUp className="w-8 h-8 mb-2 opacity-80" />
                <p className="text-sm opacity-90 mb-1">Cycle Remaining</p>
                <p className="text-3xl font-bold">
                    {tripData.hos_summary.remaining_70hr_cycle.toFixed(1)}
                </p>
                <p className="text-sm opacity-80">hours</p>
            </div>
        </div>
    );
}