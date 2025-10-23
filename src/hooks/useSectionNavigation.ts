import { useState, useEffect, useCallback } from 'react';

const SECTIONS = ['hero', 'experience', 'skills', 'contact'];
const STORAGE_KEY = 'current-section-index';

export const useSectionNavigation = () => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  // Load saved section index from localStorage on mount
  useEffect(() => {
    const savedIndex = localStorage.getItem(STORAGE_KEY);
    if (savedIndex !== null) {
      const index = parseInt(savedIndex, 10);
      if (index >= 0 && index < SECTIONS.length) {
        setCurrentSectionIndex(index);
        // Scroll to the saved section
        setTimeout(() => {
          const section = document.getElementById(SECTIONS[index]);
          if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    }
  }, []);

  // Save current section index to localStorage
  const saveCurrentSection = useCallback((index: number) => {
    localStorage.setItem(STORAGE_KEY, index.toString());
  }, []);

  // Navigate to specific section
  const navigateToSection = useCallback((index: number) => {
    if (index < 0 || index >= SECTIONS.length || isScrolling) return;
    
    setIsScrolling(true);
    setCurrentSectionIndex(index);
    saveCurrentSection(index);
    
    const section = document.getElementById(SECTIONS[index]);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Reset scrolling flag after animation
    setTimeout(() => setIsScrolling(false), 400);
  }, [isScrolling, saveCurrentSection]);

  // Navigate to next section
  const navigateNext = useCallback(() => {
    if (currentSectionIndex < SECTIONS.length - 1) {
      navigateToSection(currentSectionIndex + 1);
    }
  }, [currentSectionIndex, navigateToSection]);

  // Navigate to previous section
  const navigatePrevious = useCallback(() => {
    if (currentSectionIndex > 0) {
      navigateToSection(currentSectionIndex - 1);
    }
  }, [currentSectionIndex, navigateToSection]);

  // Handle wheel scroll for section-by-section navigation
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    
    if (isScrolling) return;
    
    if (e.deltaY > 0) {
      // Scrolling down
      navigateNext();
    } else if (e.deltaY < 0) {
      // Scrolling up
      navigatePrevious();
    }
  }, [isScrolling, navigateNext, navigatePrevious]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isScrolling) return;
    
    switch (e.key) {
      case 'ArrowDown':
      case 'PageDown':
        e.preventDefault();
        navigateNext();
        break;
      case 'ArrowUp':
      case 'PageUp':
        e.preventDefault();
        navigatePrevious();
        break;
      case 'Home':
        e.preventDefault();
        navigateToSection(0);
        break;
      case 'End':
        e.preventDefault();
        navigateToSection(SECTIONS.length - 1);
        break;
    }
  }, [isScrolling, navigateNext, navigatePrevious, navigateToSection]);

  // Set up event listeners
  useEffect(() => {
    // Add wheel event listener with passive: false to allow preventDefault
    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleWheel, handleKeyDown]);

  return {
    currentSectionIndex,
    currentSectionId: SECTIONS[currentSectionIndex],
    totalSections: SECTIONS.length,
    isScrolling,
    navigateToSection,
    navigateNext,
    navigatePrevious
  };
};
