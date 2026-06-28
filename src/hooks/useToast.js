import { useState, useCallback, useRef } from 'react';

export function useToast() {
  const [toast, setToast] = useState({ text: '', visible: false });
  const timerRef = useRef(null);

  const show = useCallback((text, big = false) => {
    setToast({ text, visible: true });
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setToast(t => ({ ...t, visible: false }));
    }, big ? 2200 : 1400);
  }, []);

  return { toast, show };
}
