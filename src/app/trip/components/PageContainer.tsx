import React from 'react';
import Header from '@/components/Header';

interface PageContainerProps {
    children: React.ReactNode;
    cycleHours?: number;
}

export default function PageContainer({ children, cycleHours = 0 }: PageContainerProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Header cycleHours={cycleHours} />
            <main className="container mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    );
}