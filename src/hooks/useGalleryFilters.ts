import { useReducer, useCallback } from 'react';

export interface FilterState {
    query: string;
    yearStart: string;
    yearEnd: string;
    dynamicFields: Array<{ id: string; key: string; value: string }>;
}

export type FilterAction =
    | { type: 'SET_QUERY'; payload: string }
    | { type: 'SET_YEAR_RANGE'; payload: { start: string; end: string } }
    | { type: 'ADD_DYNAMIC_FIELD'; payload: { id: string; key: string; value: string } }
    | { type: 'UPDATE_DYNAMIC_FIELD'; payload: { id: string; key: string; value: string } }
    | { type: 'REMOVE_DYNAMIC_FIELD'; payload: string }
    | { type: 'RESET_FILTERS' };

const initialState: FilterState = {
    query: '',
    yearStart: '1920',
    yearEnd: new Date().getFullYear().toString(),
    dynamicFields: [],
};

function filterReducer(state: FilterState, action: FilterAction): FilterState {
    switch (action.type) {
        case 'SET_QUERY':
            return { ...state, query: action.payload };
        case 'SET_YEAR_RANGE':
            return { ...state, yearStart: action.payload.start, yearEnd: action.payload.end };
        case 'ADD_DYNAMIC_FIELD':
            return { ...state, dynamicFields: [...state.dynamicFields, action.payload] };
        case 'UPDATE_DYNAMIC_FIELD':
            return {
                ...state,
                dynamicFields: state.dynamicFields.map(field =>
                    field.id === action.payload.id ? action.payload : field
                ),
            };
        case 'REMOVE_DYNAMIC_FIELD':
            return {
                ...state,
                dynamicFields: state.dynamicFields.filter(f => f.id !== action.payload),
            };
        case 'RESET_FILTERS':
            return initialState;
        default:
            return state;
    }
}

export function useGalleryFilters() {
    const [state, dispatch] = useReducer(filterReducer, initialState);

    const setQuery = useCallback((query: string) => dispatch({ type: 'SET_QUERY', payload: query }), []);
    const setYearRange = useCallback((start: string, end: string) => dispatch({ type: 'SET_YEAR_RANGE', payload: { start, end } }), []);
    const addDynamicField = useCallback((field: { id: string; key: string; value: string }) => dispatch({ type: 'ADD_DYNAMIC_FIELD', payload: field }), []);
    const updateDynamicField = useCallback((field: { id: string; key: string; value: string }) => dispatch({ type: 'UPDATE_DYNAMIC_FIELD', payload: field }), []);
    const removeDynamicField = useCallback((id: string) => dispatch({ type: 'REMOVE_DYNAMIC_FIELD', payload: id }), []);
    const resetFilters = useCallback(() => dispatch({ type: 'RESET_FILTERS' }), []);

    return {
        filters: state,
        setQuery,
        setYearRange,
        addDynamicField,
        updateDynamicField,
        removeDynamicField,
        resetFilters,
    };
}
