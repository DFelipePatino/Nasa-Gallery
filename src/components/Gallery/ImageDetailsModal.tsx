import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { NasaImageItem } from '../../hooks/useNasaData';

interface ImageDetailsModalProps {
    item: NasaImageItem | null;
    onClose: () => void;
}

export const ImageDetailsModal: React.FC<ImageDetailsModalProps> = ({ item, onClose }) => {
    // Close on escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (item) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [item]);

    return (
        <AnimatePresence>
            {item && (
                <div className="modal-overlay" style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    backdropFilter: 'blur(8px)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }} onClick={onClose}>
                    <motion.div
                        className="modal-content glass-panel"
                        style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            overflow: 'hidden',
                            position: 'relative',
                            backgroundColor: 'rgba(20, 20, 35, 0.85)',
                            borderRadius: '0'
                        }}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.3, type: 'spring', damping: 25, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
                    >
                        <button
                            onClick={onClose}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                background: 'rgba(0,0,0,0.5)',
                                border: 'none',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: 'white',
                                zIndex: 10
                            }}
                        >
                            <X size={24} />
                        </button>

                        <div className="modal-image-container" style={{ flex: '1.5', backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img
                                src={item.imageUrl}
                                alt={item.title}
                                style={{ width: '100%', height: '100%', objectFit: 'contain', maxHeight: '100vh' }}
                            />
                        </div>

                        <div className="modal-info-container" style={{ flex: '1', padding: '2rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', lineHeight: '1.2' }}>{item.title}</h2>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem', flexWrap: 'wrap' }}>
                                <span>{new Date(item.date_created).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                {item.source && <span style={{ padding: '0.2rem 0.6rem', background: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}>{item.source}</span>}
                            </div>

                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', margin: '1rem 0' }}>
                                {item.keywords?.map(kw => (
                                    <span key={kw} style={{
                                        fontSize: '0.8rem',
                                        padding: '0.3rem 0.8rem',
                                        backgroundColor: 'var(--accent-primary)',
                                        color: 'white',
                                        borderRadius: '16px',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                    }}>
                                        {kw}
                                    </span>
                                ))}
                            </div>

                            <div className="description-container" style={{ marginTop: '1rem', lineHeight: '1.6', fontSize: '1rem', flex: 1 }}>
                                <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Description</h3>
                                <p style={{ whiteSpace: 'pre-wrap' }}>{item.description || 'No description available for this image.'}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
