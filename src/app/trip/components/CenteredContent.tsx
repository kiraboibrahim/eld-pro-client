import React from 'react';

interface CenteredContentProps {
    children: React.ReactNode;
    minHeight?: string;
}

export default function CenteredContent({
    children,
    minHeight = '60vh'
}: CenteredContentProps) {
    return (
        <div
            className="flex flex-col items-center justify-center"
            style={{ minHeight }}
        >
            {children}
        </div>
    );
}