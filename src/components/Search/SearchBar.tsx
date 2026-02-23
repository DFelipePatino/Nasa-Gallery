import React, { useState, useEffect } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { Search, Calendar } from 'lucide-react';

interface SearchBarProps {
    initialQuery: string;
    initialYearStart: string;
    initialYearEnd: string;
    onQueryChange: (query: string) => void;
    onYearRangeChange: (start: string, end: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
    initialQuery,
    initialYearStart,
    initialYearEnd,
    onQueryChange,
    onYearRangeChange
}) => {
    const [query, setQuery] = useState(initialQuery);
    const [yearStart, setYearStart] = useState(initialYearStart);
    const [yearEnd, setYearEnd] = useState(initialYearEnd);

    const debouncedQuery = useDebounce(query, 500);
    const debouncedYearStart = useDebounce(yearStart, 800);
    const debouncedYearEnd = useDebounce(yearEnd, 800);

    useEffect(() => {
        onQueryChange(debouncedQuery);
    }, [debouncedQuery, onQueryChange]);

    useEffect(() => {
        onYearRangeChange(debouncedYearStart, debouncedYearEnd);
    }, [debouncedYearStart, debouncedYearEnd, onYearRangeChange]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', flex: '1', minWidth: '250px' }}>
                    <Search size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                    <input
                        type="text"
                        className="input-field"
                        style={{ paddingLeft: '40px' }}
                        placeholder="Search the cosmos..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Calendar size={20} style={{ color: 'var(--text-secondary)' }} />
                    <input
                        type="number"
                        className="input-field"
                        style={{ width: '100px' }}
                        placeholder="Start Year"
                        value={yearStart}
                        onChange={(e) => setYearStart(e.target.value)}
                    />
                    <span>-</span>
                    <input
                        type="number"
                        className="input-field"
                        style={{ width: '100px' }}
                        placeholder="End Year"
                        value={yearEnd}
                        onChange={(e) => setYearEnd(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};
