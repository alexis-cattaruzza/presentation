import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Create a blue marker icon
const createBlueIcon = () => {
  return L.divIcon({
    className: 'custom-blue-marker',
    html: `
      <div style="
        width: 30px;
        height: 30px;
        background-color: #3b82f6;
        border: 3px solid white;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          width: 8px;
          height: 8px;
          background-color: white;
          border-radius: 50%;
          transform: rotate(45deg);
        "></div>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
  });
};

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
    const zoomLevel = 10;

    // Créer la carte
    const map = L.map(mapRef.current, {
      center: genevaCoords,
      zoom: zoomLevel,
      zoomControl: true,
      attributionControl: true,
    });

    // Ajouter le tile layer avec couleurs
    const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    });

    tileLayer.addTo(map);

    // Ajouter un marqueur bleu pour Genève
    L.marker(genevaCoords, {
      icon: createBlueIcon()
    }).addTo(map);

    // Ajouter un cercle pour montrer la zone
    L.circle(genevaCoords, {
      color: 'var(--color-primary)',
      fillColor: 'var(--color-primary)',
      fillOpacity: 0.1,
      radius: 20000, // 5km en mètres
      weight: 2,
    }).addTo(map);

    // Stocker l'instance de la carte
    mapInstanceRef.current = map;

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
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
