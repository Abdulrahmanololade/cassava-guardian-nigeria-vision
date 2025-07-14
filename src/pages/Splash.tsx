
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SplashScreen from '@/components/SplashScreen';

const Splash = () => {
  const navigate = useNavigate();

  const handleSplashComplete = () => {
    navigate('/', { replace: true });
  };

  return (
    <SplashScreen 
      onComplete={handleSplashComplete}
      duration={2500}
    />
  );
};

export default Splash;
