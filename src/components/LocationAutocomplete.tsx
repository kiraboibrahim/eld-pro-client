import { getLocationAutoCompleteSuggestions } from '@/libs/api';
import { useState, useEffect, useRef } from 'react';

export interface Place {
    name: string;
    label: string;
    country: string;
    county?: string;
    region?: string;
    locality?: string;
    coordinates: [number, number];
}

export default function LocationAutocomplete({
    onSelect,
}: {
    onSelect: (place: Place) => void;
}) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Place[]>([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [hasSelected, setHasSelected] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const controllerRef = useRef<AbortController | null>(null);

    // Handle outside click to close dropdown
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (!query || query.length < 3 || hasSelected) {
            setResults([]);
            setIsOpen(false);
            return;
        }

        const timeout = setTimeout(async () => {
            // Cancel any previous pending requests
            if (controllerRef.current) controllerRef.current.abort();

            controllerRef.current = new AbortController();

            setLoading(true);
            try {
                const data = await getLocationAutoCompleteSuggestions(query, controllerRef.current.signal);
                setResults(data || []);
                setIsOpen(true);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                if (error.name !== 'AbortError') console.error('Autocomplete error:', error);
            } finally {
                setLoading(false);
            }
        }, 600); // throttled: wait 600ms after last keystroke

        return () => clearTimeout(timeout);
    }, [query, hasSelected]);

    // Handle selecting a place
    const handleSelect = (place: Place) => {
        onSelect(place);
        setQuery(place.label);
        setIsOpen(false);
        setHasSelected(true); // Stop further searches until user types again
    };

    // Handle user typing again after selection
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        if (hasSelected) setHasSelected(false); // allow new search after edit
    };

    return (
        <div ref={wrapperRef} className="relative w-full">
            <input
                value={query}
                onChange={handleChange}
                onFocus={() => query.length >= 3 && !hasSelected && setIsOpen(true)}
                placeholder="Search location..."
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />

            {loading && (
                <div className="absolute right-3 top-2 text-gray-400 text-sm">...</div>
            )}

            {isOpen && results.length > 0 && (
                <ul className="absolute rounded w-full mt-1 z-50 bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 p-4 max-h-60 overflow-y-auto">
                    {results.map((place, i) => (
                        <li
                            key={i}
                            className="p-2 pl-4 hover:bg-slate-700 cursor-pointer text-sm rounded-2xl"
                            onClick={() => handleSelect(place)}
                        >
                            {place.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
