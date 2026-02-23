import React, { Suspense, useState } from 'react';
import { Header } from './components/Layout/Header';
import { useGalleryFilters } from './hooks/useGalleryFilters';
import { useNasaData } from './hooks/useNasaData';
import './App.css';

// Lazy load components
const SearchPanel = React.lazy(() => import('./components/Search/SearchPanel'));
const GalleryBoard = React.lazy(() => import('./components/Gallery/GalleryBoard'));
const About = React.lazy(() => import('./components/About/About').then(module => ({ default: module.About })));

function App() {
  const [currentView, setCurrentView] = useState<'gallery' | 'about'>('gallery');
  const filterManager = useGalleryFilters();
  const dataManager = useNasaData(filterManager.filters);

  return (
    <div className="app-container">
      <Header currentView={currentView} setView={setCurrentView} />
      <main className="main-content">
        <Suspense fallback={<div className="loader-container"><div className="spinner" /></div>}>
          {currentView === 'gallery' ? (
            <>
              <SearchPanel
                filters={filterManager.filters}
                setQuery={filterManager.setQuery}
                setYearRange={filterManager.setYearRange}
                addDynamicField={filterManager.addDynamicField}
                removeDynamicField={filterManager.removeDynamicField}
              />
              <GalleryBoard
                images={dataManager.images}
                loading={dataManager.loading}
                hasMore={dataManager.hasMore}
                loadMore={dataManager.loadMore}
              />
            </>
          ) : (
            <About />
          )}
        </Suspense>
      </main>
    </div>
  );
}

export default App;

