import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface DynamicField {
    id: string;
    key: string;
    value: string;
}

interface DynamicFiltersProps {
    fields: DynamicField[];
    onAddField: (field: DynamicField) => void;
    onRemoveField: (id: string) => void;
}

export const DynamicFilters: React.FC<DynamicFiltersProps> = ({ fields, onAddField, onRemoveField }) => {
    const [newKey, setNewKey] = useState('');
    const [newValue, setNewValue] = useState('');

    const handleAdd = () => {
        if (newKey && newValue) {
            onAddField({
                id: Math.random().toString(36).substring(2, 9),
                key: newKey,
                value: newValue
            });
            setNewKey('');
            setNewValue('');
        }
    };

    return (
        <div style={{ marginTop: '1rem' }}>
            <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Advance Filters</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                {fields.map(field => (
                    <div key={field.id} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', padding: '0.25rem 0.75rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: '16px', fontSize: '0.875rem' }}>
                        <span style={{ fontWeight: 600 }}>{field.key}:</span>
                        <span>{field.value}</span>
                        <button
                            onClick={() => onRemoveField(field.id)}
                            style={{ background: 'none', border: 'none', padding: 0, marginLeft: '0.25rem', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}
                        >
                            <X size={14} />
                        </button>
                    </div>
                ))}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <input
                    type="text"
                    className="input-field"
                    style={{ width: '150px', padding: '0.5rem' }}
                    placeholder="Field (e.g. center)"
                    value={newKey}
                    onChange={e => setNewKey(e.target.value)}
                />
                <input
                    type="text"
                    className="input-field"
                    style={{ width: '150px', padding: '0.5rem' }}
                    placeholder="Value (e.g. jpl)"
                    value={newValue}
                    onChange={e => setNewValue(e.target.value)}
                />
                <button className="btn btn-outline" onClick={handleAdd} style={{ padding: '0.5rem' }}>
                    <Plus size={18} /> Add
                </button>
            </div>
        </div>
    );
};
