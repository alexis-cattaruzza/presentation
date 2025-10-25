import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet with Vite
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import markerRetina from 'leaflet/dist/images/marker-icon-2x.png';

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  iconRetinaUrl: markerRetina,
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function Map({ className = '', style = {} }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Coordonnées de Genève
    const genevaCoords: [number, number] = [46.2044, 6.1432];
    const zoomLevel = 9;

    // Créer la carte
    const map = L.map(mapRef.current, {
      center: genevaCoords,
      zoom: zoomLevel,
      zoomControl: true,
      attributionControl: true,
    });

    // Ajouter le tile layer grayscale
    const grayscaleLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    });

    // Appliquer un filtre CSS grayscale
    const style = document.createElement('style');
    style.textContent = `
      .leaflet-container {
        filter: grayscale(100%) contrast(1.2);
      }
    `;
    document.head.appendChild(style);

    grayscaleLayer.addTo(map);

    // Ajouter un marqueur pour Genève
    L.marker(genevaCoords, {
      icon: DefaultIcon
    }).addTo(map);

    // Ajouter un cercle pour montrer la zone
    const circle = L.circle(genevaCoords, {
      color: 'var(--color-primary)',
      fillColor: 'var(--color-primary)',
      fillOpacity: 0.1,
      radius: 20000, // 5km en mètres
      weight: 2,
    }).addTo(map);

    // Ajouter un tooltip au cercle
    circle.bindTooltip('Zone de disponibilité (5km)', {
      permanent: false,
      direction: 'center',
      className: 'custom-tooltip'
    });

    // Stocker l'instance de la carte
    mapInstanceRef.current = map;

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      // Nettoyer le style CSS
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  return (
    <div 
      ref={mapRef} 
      className={`w-full h-full ${className}`}
      style={style}
    />
  );
}
