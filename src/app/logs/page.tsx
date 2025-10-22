'use client'

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import TripSummaryCards from '@/components/TripSummaryCards';
import ELDLogSheet from '@/components/ELDLogSheet';
import { DUMMY_ROUTE_DATA, DUMMY_LOG_SHEETS } from '@/constants';
import { MapPin, Calendar, ArrowLeft } from 'lucide-react';


export default function LogsPage() {
    const tripData = DUMMY_ROUTE_DATA;
    const logSheets = DUMMY_LOG_SHEETS;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Header cycleHours={tripData.hos_summary.used_70hr_cycle} />

            <main className="container mx-auto px-4 py-8">
                <div className="space-y-6">
                    {/* Navigation Tabs */}
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-1 flex space-x-1">
                        <Link
                            href="/route"
                            className="flex-1 py-3 px-4 rounded-lg font-medium transition text-slate-400 hover:text-white hover:bg-slate-700/50 text-center"
                        >
                            <MapPin className="w-4 h-4 inline mr-2" />
                            Route Map
                        </Link>
                        <Link
                            href="/logs"
                            className="flex-1 py-3 px-4 rounded-lg font-medium transition bg-blue-600 text-white text-center"
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

                    {/* Log Sheets */}
                    <div className="space-y-6">
                        {logSheets.map((log, idx) => (
                            <ELDLogSheet key={idx} logData={log} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
