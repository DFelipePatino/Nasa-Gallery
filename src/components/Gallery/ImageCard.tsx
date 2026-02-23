import React, { memo } from 'react';
import { motion } from 'framer-motion';
import type { NasaImageItem } from '../../hooks/useNasaData';

interface ImageCardProps {
    item: NasaImageItem;
    style: React.CSSProperties;
}

export const ImageCard: React.FC<ImageCardProps> = memo(({ item, style }) => {
    return (
        <div style={{ ...style, padding: '0.5rem' }}>
            <motion.div
                className="glass-panel"
                style={{
                    height: '100%',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer'
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
            >
                <div style={{ height: '55%', overflow: 'hidden' }}>
                    <img
                        src={item.imageUrl}
                        alt={item.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        loading="lazy"
                    />
                </div>
                <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {item.title}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                        {new Date(item.date_created).toLocaleDateString()}
                    </p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: 'auto' }}>
                        {item.keywords?.slice(0, 3).map(kw => (
                            <span key={kw} style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', backgroundColor: 'var(--accent-primary)', color: 'white', borderRadius: '12px' }}>
                                {kw}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
});
