import React, { useState, useEffect } from 'react';

const GridIcon = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 16 16"
    height="20px"
    width="20px"
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5" 
  >
    <path d="M1 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zM1 9a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z" />
  </svg>
);

const SwipeIcon = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 256 256"
    height="20px"
    width="20px"
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5" 
  >
    <path d="M216,128v50.93c0,25.59-8.48,39.93-8.84,40.65A8,8,0,0,1,200,224H64a8,8,0,0,1-6.9-3.95L26.15,160a16,16,0,0,1,6.53-22.23c7.66-4,17.1-.84,21.4,6.62l21,36.44a6.09,6.09,0,0,0,6,3.09l.12,0A8.19,8.19,0,0,0,88,175.74V56a16,16,0,0,1,16.77-16c8.61.4,15.23,7.82,15.23,16.43V128a8,8,0,0,0,8.53,8,8.17,8.17,0,0,0,7.47-8.25V112a16,16,0,0,1,16.77-16c8.61.4,15.23,7.82,15.23,16.43V136a8,8,0,0,0,8.53,8,8.18,8.18,0,0,0,7.47-8.25v-7.28c0-8.61,6.62-16,15.23-16.43A16,16,0,0,1,216,128Zm37.66-77.66-32-32a8,8,0,0,0-11.32,11.32L228.69,48H176a8,8,0,0,0,0,16h52.69L210.34,82.34a8,8,0,0,0,11.32,11.32l32-32A8,8,0,0,0,253.66,50.34Z" />
  </svg>
);

function ViewModeSwitch({ sectionId, defaultView = 'grid', onViewChange = null }) {
  const [viewMode, setViewMode] = useState(defaultView);
  
  useEffect(() => {
    // Initialize view mode from localStorage if available
    if (typeof window !== 'undefined') {
      const storageKey = `viewMode-${sectionId}`;
      const storedValue = localStorage.getItem(storageKey);
      if (storedValue) {
        setViewMode(storedValue);
      }
    }
  }, [sectionId]);

  useEffect(() => {
    // Call the callback when view mode changes
    if (onViewChange) {
      onViewChange(viewMode);
    }
    
    // Update the section's classes and add scroll functionality to all sections
    if (typeof window !== 'undefined') {
      const sectionElement = document.querySelector(`[data-section-id="${sectionId}"]`);
      if (sectionElement) {
        const contentContainer = sectionElement.querySelector('.section-content');
        if (contentContainer) {
          if (viewMode === 'swipe') {
            contentContainer.classList.remove('grid-container');
            contentContainer.classList.add('slider');
            
            // Add scroll functionality to all sliders
            addScrollFunctionality(contentContainer);
          } else {
            contentContainer.classList.remove('slider');
            contentContainer.classList.add('grid-container');
          }
        }
      }
    }
  }, [viewMode, sectionId, onViewChange]);

  // Enhanced scroll functionality for slider mode
  function addScrollFunctionality(slider) {
    // Remove existing listeners first
    if (slider._wheelHandler) {
      slider.removeEventListener('wheel', slider._wheelHandler);
    }
    
    // Enhanced wheel scroll support
    const wheelHandler = (e) => {
      const hasHorizontalSpace = slider.scrollWidth > slider.clientWidth;
      
      if (hasHorizontalSpace) {
        // Don't interfere with shift+scroll (natural horizontal scroll)
        if (e.shiftKey) return;
        
        // Convert vertical scroll to horizontal for normal scroll
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          e.preventDefault();
          e.stopPropagation();
          slider.scrollLeft += e.deltaY * 2;
        }
      }
    };
    
    slider._wheelHandler = wheelHandler;
    slider.addEventListener('wheel', wheelHandler, { passive: false, capture: true });

    // Simple drag support
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return;
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      slider.style.cursor = 'grabbing';
    });

    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.style.cursor = 'grab';
    });

    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.style.cursor = 'grab';
    });

    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    });

    // Set cursor for scrollable content
    if (slider.scrollWidth > slider.clientWidth) {
      slider.style.cursor = 'grab';
    }
  }

  const toggleView = () => {
    const newMode = viewMode === 'grid' ? 'swipe' : 'grid';
    setViewMode(newMode);
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      const storageKey = `viewMode-${sectionId}`;
      localStorage.setItem(storageKey, newMode);
    }
  };

  return (
    <div className="view-mode-switch" style={{ 
      position: 'sticky', 
      right: '0', 
      top: '0', 
      zIndex: '10',
      flexShrink: '0'
    }}>
      <button
        aria-label={`Switch to ${viewMode === 'grid' ? 'swipe' : 'grid'} view`}
        onClick={toggleView}
        className="flex items-center justify-center h-8 w-8 p-1 rounded-md bg-opacity-20 bg-gray-500 hover:bg-opacity-40 transition-all duration-200 border border-transparent hover:border-gray-400"
        title={`Switch to ${viewMode === 'grid' ? 'swipe' : 'grid'} view`}
        style={{
          position: 'relative',
          minWidth: '32px',
          minHeight: '32px'
        }}
      >
        {viewMode === 'grid' ? <SwipeIcon /> : <GridIcon />}
      </button>
    </div>
  );
}

export default ViewModeSwitch;
