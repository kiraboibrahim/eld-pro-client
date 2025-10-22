import React from 'react';
import Link from 'next/link';
import { MapPin, Calendar, ArrowLeft, LucideIcon } from 'lucide-react';

export type TabType = 'routeMap' | 'logs';

interface Tab {
    id: TabType;
    label: string;
    icon: LucideIcon;
}

interface TabNavigationProps {
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
    backHref?: string;
    backLabel?: string;
}

const tabs: Tab[] = [
    { id: 'routeMap', label: 'Route Map', icon: MapPin },
    { id: 'logs', label: 'ELD Logs', icon: Calendar }
];

export default function TabNavigation({
    activeTab,
    onTabChange,
    backHref = '/',
    backLabel = 'New Trip'
}: TabNavigationProps) {
    return (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-1 flex space-x-1">
            {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                    <div
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`flex-1 py-3 px-4 rounded-lg font-medium transition text-slate-400 hover:text-white text-center cursor-pointer ${activeTab === tab.id
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'hover:bg-slate-700/50'
                            }`}
                    >
                        <Icon className="w-4 h-4 inline mr-2" />
                        {tab.label}
                    </div>
                );
            })}
            <Link
                href={backHref}
                className="flex py-3 px-4 rounded-lg font-medium text-slate-400 hover:text-white hover:bg-slate-700/50 transition items-center"
            >
                <ArrowLeft className="w-4 h-4 mr-2" /> {backLabel}
            </Link>
        </div>
    );
}