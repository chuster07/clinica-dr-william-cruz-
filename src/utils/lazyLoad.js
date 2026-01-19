import { lazy } from 'react';

// Lazy loading de páginas para mejorar el rendimiento
export const lazyLoadPage = (importFunc) => {
  return lazy(() => 
    Promise.all([
      importFunc(),
      new Promise(resolve => setTimeout(resolve, 300)) // Mínimo delay para evitar flashes
    ]).then(([moduleExports]) => moduleExports)
  );
};
