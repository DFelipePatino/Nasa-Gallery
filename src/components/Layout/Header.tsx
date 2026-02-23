import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Moon, Sun, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
    currentView: 'gallery' | 'about';
    setView: (view: 'gallery' | 'about') => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.header
            className="header-nav glass-panel"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
            style={{ display: 'flex', alignItems: 'center' }}
        >
            <div className="brand">
                <Rocket className="text-accent" size={28} />
                <span>Cosmic Explorer</span>
            </div>

            <nav style={{ display: 'flex', gap: '1.5rem', marginLeft: 'auto', marginRight: '2rem' }}>
                <button
                    onClick={() => setView('gallery')}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: currentView === 'gallery' ? 'var(--accent-primary)' : 'var(--text-primary)',
                        cursor: 'pointer',
                        fontWeight: currentView === 'gallery' ? 700 : 500,
                        fontSize: '1rem',
                        transition: 'color 0.2s'
                    }}
                >
                    Gallery
                </button>
                <button
                    onClick={() => setView('about')}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: currentView === 'about' ? 'var(--accent-primary)' : 'var(--text-primary)',
                        cursor: 'pointer',
                        fontWeight: currentView === 'about' ? 700 : 500,
                        fontSize: '1rem',
                        transition: 'color 0.2s'
                    }}
                >
                    About
                </button>
            </nav>

            <button
                onClick={toggleTheme}
                className="theme-toggle"
                aria-label="Toggle Theme"
            >
                <motion.div
                    initial={false}
                    animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </motion.div>
            </button>
        </motion.header>
    );
};
