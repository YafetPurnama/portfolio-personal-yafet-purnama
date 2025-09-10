import { useState, useEffect } from 'react';

export const useLoading = (initialState = true, delay = 1000) => {
  const [loading, setLoading] = useState(initialState);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return [loading, setLoading];
};

export default useLoading;
