import { useState, useEffect } from 'react';
export default function useApi(apiCall) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiCall();
        setData(res.data);
      } catch (err) {
        setError(err?.response?.data?.message || 'Error');
      } finally {
        setLoading(false);
      }
    })();
  }, [apiCall]);

  return { data, loading, error, setData };
}