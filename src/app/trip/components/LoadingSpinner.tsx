import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    message?: string;
    submessage?: string;
}

export default function LoadingSpinner({
    message = 'Loading...',
    submessage
}: LoadingSpinnerProps) {

    return (
        <div className="flex flex-col items-center justify-center space-y-6">
            <div className="relative">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                <div className="absolute inset-0 blur-xl bg-blue-500/20 animate-pulse"></div>
            </div>
            <div className="text-center space-y-2">
                <h2 className="text-md font-bold text-white">
                    {message}
                </h2>
                {submessage && (
                    <p className="text-slate-400">
                        {submessage}
                    </p>
                )}
            </div>
            <div className="flex space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div
                    className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                    style={{ animationDelay: '0.1s' }}
                ></div>
                <div
                    className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                ></div>
            </div>
        </div>
    );
}