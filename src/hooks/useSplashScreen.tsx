
import { useState, useEffect } from 'react';

interface UseSplashScreenOptions {
  duration?: number;
  showOnLoad?: boolean;
}

export const useSplashScreen = ({ 
  duration = 3000, 
  showOnLoad = false 
}: UseSplashScreenOptions = {}) => {
  const [showSplash, setShowSplash] = useState(showOnLoad);
  const [isLoading, setIsLoading] = useState(showOnLoad);

  const showSplashScreen = () => {
    setShowSplash(true);
    setIsLoading(true);
  };

  const hideSplashScreen = () => {
    setShowSplash(false);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        hideSplashScreen();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [showSplash, duration]);

  return {
    showSplash,
    isLoading,
    showSplashScreen,
    hideSplashScreen,
  };
};
