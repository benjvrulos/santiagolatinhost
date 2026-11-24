import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Ensures every route change starts at the top of the page,
 * so a visitor never lands mid-page (for example on the payment step
 * after confirming an itinerary).
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}