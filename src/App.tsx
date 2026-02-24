import React, { Suspense, useState } from 'react';
import { Header } from './components/Layout/Header';
import { useGalleryFilters } from './hooks/useGalleryFilters';
import { useNasaData } from './hooks/useNasaData';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import { ChevronDown } from 'lucide-react';

// Lazy load components
const SearchPanel = React.lazy(() => import('./components/Search/SearchPanel'));
const GalleryBoard = React.lazy(() => import('./components/Gallery/GalleryBoard'));
const About = React.lazy(() => import('./components/About/About').then(module => ({ default: module.About })));

// --- Interfaces ---
interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  onClick: () => void;
}

// --- Sub-components ---
const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, defaultExpanded = true, onClick }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  return (
    <div className="accordion-item">
      <button className="accordion-header" onClick={() => { setIsExpanded(!isExpanded); onClick(); }} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
        <span>{title}</span>
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

// --- Main App ---
function App() {
  const [currentView, setCurrentView] = useState<'gallery' | 'about'>('gallery');
  const filterManager = useGalleryFilters();
  const dataManager = useNasaData(filterManager.filters);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const clickHandler = () => {
    setIsSearchExpanded(!isSearchExpanded)
  }
  return (
    <div className="app-container">
      <Header currentView={currentView} setView={setCurrentView} />

      <main className="main-content">
        <Suspense fallback={
          <div className="loader-container">
            <div className="spinner" />
            <p>Loading...</p>
          </div>
        }>
          {currentView === 'gallery' ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AccordionItem title="Search Filters" defaultExpanded={false}
                onClick={clickHandler}
              >
                <SearchPanel
                  filters={filterManager.filters}
                  setQuery={filterManager.setQuery}
                  setYearRange={filterManager.setYearRange}
                  addDynamicField={filterManager.addDynamicField}
                  removeDynamicField={filterManager.removeDynamicField}
                />
              </AccordionItem>

              <GalleryBoard
                isSearchExpanded={isSearchExpanded}
                images={dataManager.images}
                loading={dataManager.loading}
                hasMore={dataManager.hasMore}
                loadMore={dataManager.loadMore}
              />
            </motion.div>
          ) : (
            <About />
          )}
        </Suspense>
      </main>
    </div>
  );
}

export default App;