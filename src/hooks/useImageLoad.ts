import { useState, useCallback } from 'react';

export default function useImageLoad() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const onLoad = useCallback(() => setLoaded(true), []);
  const onError = useCallback(() => setError(true), []);

  return { loaded, error, onLoad, onError };
}