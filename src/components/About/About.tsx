import React, { useState } from 'react';
// @ts-ignore
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import readmeRaw from '../../../README.md?raw';
import './About.css';

interface AccordionItemProps {
    title: string;
    children: React.ReactNode;
    defaultExpanded?: boolean;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, defaultExpanded = false }) => {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);
    return (
        <div className="accordion-item">
            <button className="accordion-header" onClick={() => setIsExpanded(!isExpanded)}>
                <h2>{title}</h2>
                <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                    <ChevronDown size={24} />
                </motion.div>
            </button>
            <AnimatePresence initial={false}>
                {isExpanded && (
                    <motion.div
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: "auto", marginTop: 16 },
                            collapsed: { opacity: 0, height: 0, marginTop: 0 }
                        }}
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div className="accordion-content">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const About: React.FC = () => {
    return (
        <motion.div
            className="about-container glass-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <AccordionItem title="About the Creator" defaultExpanded={true}>
                <div className="creator-profile">
                    <img
                        src="/images/about-pic.png"
                        alt="Creator Avatar"
                        className="creator-avatar"
                    />
                    <div className="creator-info">
                        <h3>Daniel Patino</h3>
                        <p className="creator-role">Web Developer </p>
                        <p className="creator-bio">
                            Passionate about building highly interactive and aesthetic web applications.
                            This project combines a love for space exploration with modern React development techniques
                            to create the Cosmic Explorer NASA Gallery.
                        </p>
                        <div className="social-links">
                            <a href="https://github.com/DFelipePatino" target="_blank" aria-label="GitHub"><Github size={20} /></a>
                            <a href="https://www.linkedin.com/in/daniel-patino-207156208/" target="_blank" aria-label="LinkedIn"><Linkedin size={20} /></a>
                            <a href="mailto:daniel.patino.work@gmail.com" target="_blank" aria-label="Email"><Mail size={20} /></a>
                        </div>
                    </div>
                </div>
            </AccordionItem>

            <AccordionItem title="Project README" defaultExpanded={false}>
                <div className="markdown-content">
                    <ReactMarkdown>{readmeRaw}</ReactMarkdown>
                </div>
            </AccordionItem>
        </motion.div>
    );
};
