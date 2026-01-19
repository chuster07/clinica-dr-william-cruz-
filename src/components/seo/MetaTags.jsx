import { useEffect } from 'react';

const MetaTags = ({ 
  title = 'Clínica Dr. William Cruz - Atención Médica de Calidad',
  description = 'Clínica médica con servicios de medicina general, especialidades, telemedicina y más. Agenda tu cita en línea.',
  keywords = 'clínica, médico, salud, telemedicina, consultas médicas, Costa Rica',
  ogImage = '/og-image.jpg'
}) => {
  useEffect(() => {
    // Actualizar título
    document.title = title;
    
    // Actualizar o crear meta tags
    const updateMetaTag = (name, content, property = false) => {
      const attribute = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };
    
    // Meta tags básicos
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    
    // Open Graph
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', ogImage, true);
    
    // Twitter
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);
    
    // Idioma
    document.documentElement.lang = 'es';
  }, [title, description, keywords, ogImage]);

  return null;
};

export default MetaTags;
