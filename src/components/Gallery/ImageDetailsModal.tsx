import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { NasaImageItem } from '../../hooks/useNasaData';

interface ImageDetailsModalProps {
    item: NasaImageItem | null;
    onClose: () => void;
}

export const ImageDetailsModal: React.FC<ImageDetailsModalProps> = ({ item, onClose }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    useEffect(() => {
        if (item) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [item]);

    return (
        <AnimatePresence>
            {item && (
                <div
                    className="modal-overlay"
                    style={{
                        position: 'fixed',
                        top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.92)',
                        backdropFilter: 'blur(15px)',
                        zIndex: 1000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: isMobile ? '0' : '40px',
                        boxSizing: 'border-box'
                    }}
                    onClick={onClose}
                >
                    <motion.div
                        className="modal-content"
                        style={{
                            width: '100%',
                            maxWidth: '1280px',
                            // Use vh with a safe margin to ensure it NEVER leaves the screen
                            height: isMobile ? '100%' : '80vh',
                            display: 'flex',
                            flexDirection: isMobile ? 'column' : 'row',
                            backgroundColor: '#0a0a0f',
                            borderRadius: isMobile ? '0' : '24px',
                            overflow: 'hidden',
                            position: 'relative',
                            boxShadow: '0 0 100px rgba(0,0,0,0.8)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            boxSizing: 'border-box'
                        }}
                        initial={isMobile ? { y: '100%' } : { opacity: 0, y: 20 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={isMobile ? { y: '100%' } : { opacity: 0 }}
                    >
                        {/* ABSOLUTE CLOSE BUTTON */}
                        <button
                            onClick={onClose}
                            style={{
                                position: 'absolute',
                                top: '24px',
                                right: '24px',
                                zIndex: 50,
                                background: 'rgba(0,0,0,0.5)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                borderRadius: '50%',
                                padding: '8px',
                                cursor: 'pointer',
                                color: 'white'
                            }}
                        >
                            <X size={24} />
                        </button>

                        {/* LEFT: IMAGE SECTION */}
                        <div style={{
                            flex: isMobile ? '0 0 40%' : '1.5',
                            backgroundColor: '#000',
                            position: 'relative',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <img
                                src={item.imageUrl}
                                alt={item.title}
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    objectFit: 'contain'
                                }}
                            />
                        </div>

                        {/* RIGHT: INFO SECTION (Using CSS Grid to lock heights) */}
                        <div style={{
                            flex: '1',
                            display: 'grid',
                            gridTemplateRows: 'auto 1fr', // Header takes what it needs, body takes the rest
                            height: '100%',
                            minWidth: 0,
                            backgroundColor: '#0d0d16'
                        }}>

                            {/* 1. LOCKED HEADER */}
                            <div style={{
                                padding: isMobile ? '20px' : '48px 48px 24px 48px',
                                borderBottom: '1px solid rgba(255,255,255,0.05)'
                            }}>
                                <h2 style={{
                                    fontSize: isMobile ? '1.5rem' : '2.5rem',
                                    margin: 0,
                                    color: '#fff',
                                    fontWeight: 700,
                                    lineHeight: 1.1,
                                    wordBreak: 'break-word',
                                    paddingRight: '40px' // Space for close button
                                }}>
                                    {item.title}
                                </h2>
                                <div style={{ marginTop: '16px', display: 'flex', gap: '12px', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
                                    <span>{new Date(item.date_created).getFullYear()}</span>
                                    <span>•</span>
                                    <span style={{ color: '#4f46e5', fontWeight: 600 }}>{item.source}</span>
                                </div>
                            </div>

                            {/* 2. SCROLLABLE BODY */}
                            <div style={{
                                padding: isMobile ? '20px' : '24px 48px 48px 48px',
                                overflowY: 'auto',
                                scrollbarWidth: 'thin'
                            }}>
                                <p style={{
                                    fontSize: '1.1rem',
                                    lineHeight: 1.8,
                                    color: 'rgba(255,255,255,0.7)',
                                    margin: 0,
                                    whiteSpace: 'pre-wrap'
                                }}>
                                    {item.description || "No description provided."}
                                </p>

                                {item.keywords && (
                                    <div style={{ marginTop: '32px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {item.keywords.map(kw => (
                                            <span key={kw} style={{
                                                padding: '6px 12px',
                                                background: 'rgba(255,255,255,0.05)',
                                                borderRadius: '8px',
                                                fontSize: '0.8rem',
                                                color: 'rgba(255,255,255,0.4)',
                                                border: '1px solid rgba(255,255,255,0.1)'
                                            }}>
                                                #{kw}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};