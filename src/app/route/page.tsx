'use client'

import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Header from '@/components/Header';
import TripSummaryCards from '@/components/TripSummaryCards';
import StopsList from '@/components/StopsList';
import { DUMMY_ROUTE_DATA } from '@/constants';
import { MapPin, Calendar, ArrowLeft } from 'lucide-react';

// Dynamically import map component (avoids SSR issues with Leaflet)
const RouteMap = dynamic(() => import('@/components/RouteMap'), {
    ssr: false,
    loading: () => (
        <div className="h-[600px] bg-slate-800/50 rounded-2xl border border-slate-700 flex items-center justify-center">
            <div className="text-slate-400">Loading map...</div>
        </div>
    )
});

export default function RoutePage() {
    const tripData = DUMMY_ROUTE_DATA;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Header cycleHours={tripData.hos_summary.used_70hr_cycle} />

            <main className="container mx-auto px-4 py-8">
                <div className="space-y-6">
                    {/* Navigation Tabs */}
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-1 flex space-x-1">
                        <Link
                            href="/route"
                            className="flex-1 py-3 px-4 rounded-lg font-medium transition bg-blue-600 text-white text-center"
                        >
                            <MapPin className="w-4 h-4 inline mr-2" />
                            Route Map
                        </Link>
                        <Link
                            href="/logs"
                            className="flex-1 py-3 px-4 rounded-lg font-medium transition text-slate-400 hover:text-white hover:bg-slate-700/50 text-center"
                        >
                            <Calendar className="w-4 h-4 inline mr-2" />
                            ELD Logs
                        </Link>
                        <Link
                            href="/"
                            className="flex py-3 px-4 rounded-lg font-medium text-slate-400 hover:text-white hover:bg-slate-700/50 transition"
                        >
                            <ArrowLeft /> New Trip
                        </Link>
                    </div>

                    {/* Trip Summary Cards */}
                    <TripSummaryCards tripData={tripData} />

                    {/* Map */}
                    <RouteMap tripData={tripData} />

                    {/* Stops List */}
                    <StopsList />
                </div>
            </main>
        </div>
    );
}