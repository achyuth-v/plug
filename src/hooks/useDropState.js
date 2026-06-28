import { useState, useMemo } from 'react';

export const MIN_PRODUCTS = 3;
export const MAX_PRODUCTS = 12;
export const COMMISSION_RATE = 0.10;

/**
 * Central state for the drop builder.
 * Returns state + setters + derived values (totals, readiness).
 */
export function useDropState() {
  const [name, setName] = useState('');
  const [pitch, setPitch] = useState('');
  const [vibes, setVibes] = useState([]);
  const [category, setCategory] = useState(null);
  const [selected, setSelected] = useState([]); // array of product ids

  const toggleVibe = (label, maxVibes) => {
    setVibes(prev =>
      prev.includes(label)
        ? prev.filter(v => v !== label)
        : prev.length < maxVibes
          ? [...prev, label]
          : prev
    );
  };

  const toggleProduct = (id) => {
    setSelected(prev =>
      prev.includes(id)
        ? prev.filter(p => p !== id)
        : prev.length < MAX_PRODUCTS
          ? [...prev, id]
          : prev
    );
  };

  const totals = useMemo(() => {
    // We don't have product data here — caller computes total externally
    return { count: selected.length };
  }, [selected]);

  const isReady = useMemo(() => {
    return (
      selected.length >= MIN_PRODUCTS &&
      name.trim().length > 0 &&
      !!category
    );
  }, [selected, name, category]);

  const progress = useMemo(() => ({
    1: name.trim().length > 0,
    2: vibes.length > 0,
    3: !!category,
    4: selected.length >= MIN_PRODUCTS,
  }), [name, vibes, category, selected]);

  return {
    // state
    name, pitch, vibes, category, selected,
    // setters
    setName, setPitch, setCategory,
    toggleVibe, toggleProduct,
    // derived
    totals, isReady, progress,
    // constants
    MIN_PRODUCTS, MAX_PRODUCTS, COMMISSION_RATE,
  };
}
