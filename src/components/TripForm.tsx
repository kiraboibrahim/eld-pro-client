'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Clock, TrendingUp, Car } from 'lucide-react';
import { TripFormData } from '@/types';

export default function TripForm() {
    const router = useRouter();
    const [formData, setFormData] = useState<TripFormData>({
        currentLocation: 'Dallas, TX',
        pickupLocation: 'Houston, TX',
        dropoffLocation: 'Atlanta, GA',
        currentCycleHours: 45
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Store form data in sessionStorage for now (later: API call)
        sessionStorage.setItem('tripFormData', JSON.stringify(formData));

        router.push('/route');
    };

    const handleInputChange = (field: keyof TripFormData, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 p-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Plan Your Trip</h2>
                    <p className="text-slate-400">Enter your trip details to get HOS-compliant routing</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Current Location */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            <MapPin className="w-4 h-4 inline mr-2 text-green-400" />
                            Current Location
                        </label>
                        <input
                            type="text"
                            value={formData.currentLocation}
                            onChange={(e) => handleInputChange('currentLocation', e.target.value)}
                            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            placeholder="Dallas, TX"
                            required
                        />
                    </div>

                    {/* Pickup Location */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            <MapPin className="w-4 h-4 inline mr-2 text-blue-400" />
                            Pickup Location
                        </label>
                        <input
                            type="text"
                            value={formData.pickupLocation}
                            onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
                            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            placeholder="Houston, TX"
                            required
                        />
                    </div>

                    {/* Dropoff Location */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            <MapPin className="w-4 h-4 inline mr-2 text-red-400" />
                            Dropoff Location
                        </label>
                        <input
                            type="text"
                            value={formData.dropoffLocation}
                            onChange={(e) => handleInputChange('dropoffLocation', e.target.value)}
                            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            placeholder="Atlanta, GA"
                            required
                        />
                    </div>

                    {/* Current Cycle Hours */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            <Clock className="w-4 h-4 inline mr-2" />
                            Current Cycle Used (Hours)
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                value={formData.currentCycleHours}
                                onChange={(e) => handleInputChange('currentCycleHours', parseInt(e.target.value) || 0)}
                                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                placeholder="0"
                                min="0"
                                max="70"
                                required
                            />
                            <span className="absolute right-10 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                                / 70 hrs
                            </span>
                        </div>
                        <div className="mt-2 h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all"
                                style={{ width: `${(formData.currentCycleHours / 70) * 100}%` }}
                            />
                        </div>
                    </div>
                    {/** Submit Button **/}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/30"
                    >
                        <TrendingUp className="w-5 h-5 inline mr-2" />
                        Calculate Route & Logs
                    </button>
                </form>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-4 text-center">
                    <Car className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <p className="text-slate-400 text-sm">FMCSA Compliant</p>
                </div>
                <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-4 text-center">
                    <Clock className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <p className="text-slate-400 text-sm">Real-time HOS Tracking</p>
                </div>
                <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-4 text-center">
                    <MapPin className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <p className="text-slate-400 text-sm">Optimized Stops</p>
                </div>
            </div>
        </div>
    );
}