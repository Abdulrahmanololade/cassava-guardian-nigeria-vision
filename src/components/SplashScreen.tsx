
import { useEffect, useState } from 'react';
import { Sprout } from 'lucide-react';

interface SplashScreenProps {
  onComplete?: () => void;
  duration?: number;
}

const SplashScreen = ({ onComplete, duration = 3000 }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete?.();
      }, 500); // Allow fade out animation to complete
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-green-500 via-green-600 to-green-700 flex items-center justify-center animate-fade-in">
      <div className="text-center space-y-6 px-8">
        {/* Logo Animation */}
        <div className="relative">
          <div className="animate-pulse">
            <Sprout className="h-24 w-24 text-white mx-auto drop-shadow-lg" />
          </div>
          <div className="absolute inset-0 animate-ping">
            <Sprout className="h-24 w-24 text-white/30 mx-auto" />
          </div>
        </div>

        {/* App Name */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-white drop-shadow-md">
            Cassava Guard
          </h1>
          <p className="text-green-100 text-lg font-medium">
            Agricultural Intelligence
          </p>
        </div>

        {/* Loading Indicator */}
        <div className="flex justify-center">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-green-50 text-sm max-w-xs mx-auto leading-relaxed">
          Protecting crops with advanced AI technology
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
