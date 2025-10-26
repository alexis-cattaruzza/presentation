import { useState, useEffect, useCallback } from 'react';

const SECTIONS = ['hero', 'experience', 'skills', 'location', 'hobbies', 'contact'];
const STORAGE_KEY = 'current-section-index';

export const useSectionNavigation = () => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMouseDevice, setIsMouseDevice] = useState(false);

  // Detect mouse vs trackpad
  useEffect(() => {
    let wheelTimeout: ReturnType<typeof setTimeout>;
    let wheelCount = 0;
    
    const detectDevice = () => {
      wheelCount++;
      clearTimeout(wheelTimeout);
      
      wheelTimeout = setTimeout(() => {
        setIsMouseDevice(wheelCount <= 3);
        wheelCount = 0;
      }, 100);
    };

    document.addEventListener('wheel', detectDevice, { passive: true });
    
    return () => {
      document.removeEventListener('wheel', detectDevice);
      clearTimeout(wheelTimeout);
    };
  }, []);

  // Save current section index to localStorage
  const saveCurrentSection = useCallback((index: number) => {
    localStorage.setItem(STORAGE_KEY, index.toString());
  }, []);

  // Intersection Observer to track visible sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the section with the highest intersection ratio
        let mostVisibleSection = null;
        let highestRatio = 0;

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > highestRatio) {
            highestRatio = entry.intersectionRatio;
            mostVisibleSection = entry.target.id;
          }
        });

        if (mostVisibleSection) {
          const sectionIndex = SECTIONS.indexOf(mostVisibleSection);
          if (sectionIndex !== -1 && sectionIndex !== currentSectionIndex) {
            setCurrentSectionIndex(sectionIndex);
            saveCurrentSection(sectionIndex);
          }
        }
      },
      {
        threshold: [0.1, 0.3, 0.5, 0.7, 0.9], // Multiple thresholds for better detection
        rootMargin: '-10% 0px -10% 0px' // Reduced margin for more responsive detection
      }
    );

    // Observe all sections
    SECTIONS.forEach(sectionId => {
      const section = document.getElementById(sectionId);
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      SECTIONS.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, [currentSectionIndex, saveCurrentSection]);

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

  // Handle wheel scroll for mouse devices only
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Only enable section navigation with mouse wheel, not trackpad
      if (!isMouseDevice || isScrolling) return;
      
      e.preventDefault();
      
      if (e.deltaY > 0) {
        // Scrolling down
        navigateNext();
      } else if (e.deltaY < 0) {
        // Scrolling up
        navigatePrevious();
      }
    };

    document.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      document.removeEventListener('wheel', handleWheel);
    };
  }, [isMouseDevice, isScrolling, navigateNext, navigatePrevious]);

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
