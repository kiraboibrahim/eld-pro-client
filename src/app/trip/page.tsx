'use client'

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import PageContainer from './components/PageContainer';
import CenteredContent from './components/CenteredContent';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorState from './components/ErrorState';
import TabNavigation, { TabType } from './components/TabNavigation';
import TripSummaryCards from '@/components/TripSummaryCards';
import StopsList from '@/components/StopsList';
import ELDLogSheet from '@/components/ELDLogSheet';
import { TripResponse, LogSheetData, TripFormData, Stop } from '@/types';
import { calculateTripRoute } from '@/libs/api';

// Dynamically import map component (avoids SSR issues with Leaflet)
const RouteMap = dynamic(() => import('@/components/RouteMap'), {
    ssr: false,
    loading: () => (
        <div className="h-[600px] bg-slate-800/50 rounded-2xl border border-slate-700 flex items-center justify-center">
            <div className="text-slate-400">Loading map...</div>
        </div>
    )
});

export default function ResultsPage() {
    const [activeTab, setActiveTab] = useState<TabType>('routeMap');
    const [isLoading, setIsLoading] = useState(true);
    const [tripData, setTripData] = useState<TripResponse | null>(null);
    const [logSheets, setLogSheets] = useState<LogSheetData[]>([]);
    const [error, setError] = useState<string | null>(null);

    const calculateRoute = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const formDataStr = sessionStorage.getItem('tripFormData');
            if (!formDataStr) {
                setError('No trip data found. Please fill out the form.');
                setIsLoading(false);
                return;
            }

            const formData: TripFormData = JSON.parse(formDataStr);

            const response = await calculateTripRoute(formData);
            setTripData(response);
            setLogSheets(response?.logs || []);

        } catch (err) {
            console.error('Error calculating route:', err);
            setError('Failed to calculate route. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        calculateRoute();
    }, []);

    if (isLoading) {
        return (
            <PageContainer cycleHours={0}>
                <CenteredContent>
                    <LoadingSpinner
                        size="lg"
                        message="Calculating Your Route"
                        submessage="Analyzing HOS compliance and optimizing stops..."
                    />
                </CenteredContent>
            </PageContainer>
        );
    }

    if (error || !tripData) {
        return (
            <PageContainer cycleHours={0}>
                <CenteredContent>
                    <ErrorState
                        title="Unable to Calculate Route"
                        message={error || 'An unexpected error occurred'}
                        actionText="Back to Form"
                        actionHref="/"
                        onRetry={calculateRoute}
                    />
                </CenteredContent>
            </PageContainer>
        );
    }

    // Build a single Stop[] array from the API stops object
    const formattedStops = (() => {
        const s = tripData.stops;
        const result: Stop[] = [];

        if (s.pickup) {
            result.push({ ...s.pickup, type: 'pickup' });
        }

        if (Array.isArray(s.break_stops) && s.break_stops.length) {
            result.push(
                ...s.break_stops.map((b) => ({
                    ...b,
                    type: 'coffee' // map break stops -> coffee icon
                }))
            );
        }

        if (Array.isArray(s.rest_stops) && s.rest_stops.length) {
            result.push(
                ...s.rest_stops.map((r) => ({
                    ...r,
                    type: 'rest'
                }))
            );
        }

        if (Array.isArray(s.fuel_stops) && s.fuel_stops.length) {
            result.push(
                ...s.fuel_stops.map((f) => ({
                    ...f,
                    type: 'fuel'
                }))
            );
        }

        if (s.dropoff) {
            result.push({ ...s.dropoff, type: 'dropoff' });
        }

        return result;
    })();

    return (
        <PageContainer cycleHours={tripData.hos_summary.used_70hr_cycle}>
            <div className="space-y-6">
                <TabNavigation
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    backHref="/"
                    backLabel="New Trip"
                />

                <TripSummaryCards tripData={tripData} />

                {activeTab === 'routeMap' && (
                    <>
                        <RouteMap tripData={tripData} />
                        <StopsList stops={formattedStops} />
                    </>
                )}

                {activeTab === 'logs' && (
                    <div className="space-y-6">
                        {logSheets.length > 0 ? (
                            logSheets.map((log, idx) => (
                                <ELDLogSheet key={idx} logData={log} />
                            ))
                        ) : (
                            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 text-center">
                                <p className="text-slate-400">No log sheets available</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </PageContainer>
    );
}
