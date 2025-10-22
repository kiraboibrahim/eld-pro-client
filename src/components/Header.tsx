import React from 'react';
import Link from 'next/link';
import { Navigation, Clock } from 'lucide-react';

interface HeaderProps {
    cycleHours?: number;
}

export default function Header({ cycleHours = 0 }: HeaderProps) {
    return (
        <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition">
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg">
                            <Navigation className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">ELD Pro</h1>
                            <p className="text-xs text-slate-400">Smart Trip Planning</p>
                        </div>
                    </Link>
                    <div className="flex items-center space-x-4">
                        <div className="hidden md:flex items-center space-x-2 bg-slate-800 px-4 py-2 rounded-lg">
                            <Clock className="w-4 h-4 text-blue-400" />
                            <span className="text-sm text-slate-300">
                                70hr Cycle: {cycleHours.toFixed(2)}/70
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}