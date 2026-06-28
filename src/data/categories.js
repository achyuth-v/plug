// 16 categories — each will spawn its own weekly arena
// Add/remove here to control the category list across the app

export const CATEGORIES = [
  { slug: 'tech',     label: 'tech',     color: 'c-blue',    bg: '#D4E5FE' },
  { slug: 'home',     label: 'home',     color: 'c-coral',   bg: '#FFDDD6' },
  { slug: 'fitness',  label: 'fitness',  color: 'c-lime',    bg: '#EFFACB' },
  { slug: 'fashion',  label: 'fashion',  color: 'c-orange',  bg: '#FFE3D2' },
  { slug: 'desk',     label: 'desk',     color: 'c-purple',  bg: '#E2DBFE' },
  { slug: 'beauty',   label: 'beauty',   color: 'c-mint',    bg: '#CFF4E7' },
  { slug: 'kitchen',  label: 'kitchen',  color: 'c-orange',  bg: '#FFE3D2' },
  { slug: 'outdoor',  label: 'outdoor',  color: 'c-lime',    bg: '#EFFACB' },
  { slug: 'gaming',   label: 'gaming',   color: 'c-purple',  bg: '#E2DBFE' },
  { slug: 'travel',   label: 'travel',   color: 'c-blue',    bg: '#D4E5FE' },
  { slug: 'pets',     label: 'pets',     color: 'c-sun',     bg: '#FFF4CC' },
  { slug: 'kids',     label: 'kids',     color: 'c-coral',   bg: '#FFDDD6' },
  { slug: 'books',    label: 'books',    color: 'c-mint',    bg: '#CFF4E7' },
  { slug: 'auto',     label: 'auto',     color: 'c-ink',     bg: '#E5E5E8' },
  { slug: 'art',      label: 'art',      color: 'c-purple',  bg: '#E2DBFE' },
  { slug: 'music',    label: 'music',    color: 'c-coral',   bg: '#FFDDD6' },
];

export const getCategory = (slug) => CATEGORIES.find(c => c.slug === slug);
