import React from 'react';
import Link from 'next/link';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

interface ErrorStateProps {
    title?: string;
    message?: string;
    actionText?: string;
    actionHref?: string;
    onRetry?: () => void;
}

export default function ErrorState({
    title = 'Something went wrong',
    message = 'An unexpected error occurred',
    actionText = 'Back to Form',
    actionHref = '/',
    onRetry
}: ErrorStateProps) {
    return (
        <div className="flex flex-col items-center justify-center space-y-6">
            <div className="bg-red-500/10 border border-red-500/50 rounded-full p-4">
                <AlertTriangle className="w-12 h-12 text-red-500" />
            </div>
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-white">
                    {title}
                </h2>
                <p className="text-slate-400 max-w-md">
                    {message}
                </p>
            </div>
            <div className="flex space-x-3">
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition flex items-center space-x-2"
                    >
                        <span>Try Again</span>
                    </button>
                )}
                <Link
                    href={actionHref}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center space-x-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{actionText}</span>
                </Link>
            </div>
        </div>
    );
}