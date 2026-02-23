import React, { memo } from 'react';
import { SearchBar } from './SearchBar';
import { DynamicFilters } from './DynamicFilters';
import type { FilterState } from '../../hooks/useGalleryFilters';
import { motion } from 'framer-motion';

interface SearchPanelProps {
    filters: FilterState;
    setQuery: (query: string) => void;
    setYearRange: (start: string, end: string) => void;
    addDynamicField: (field: any) => void;
    removeDynamicField: (id: string) => void;
}

// Wrapping in memo prevents unnecessary renders when other parts of the app update but search props remain unchanged.
const SearchPanel: React.FC<SearchPanelProps> = memo(({
    filters,
    setQuery,
    setYearRange,
    addDynamicField,
    removeDynamicField
}) => {
    return (
        <motion.div
            className="glass-panel"
            style={{ padding: '1.5rem' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
        >
            <SearchBar
                initialQuery={filters.query}
                initialYearStart={filters.yearStart}
                initialYearEnd={filters.yearEnd}
                onQueryChange={setQuery}
                onYearRangeChange={setYearRange}
            />
            <DynamicFilters
                fields={filters.dynamicFields}
                onAddField={addDynamicField}
                onRemoveField={removeDynamicField}
            />
        </motion.div>
    );
});

export default SearchPanel;
