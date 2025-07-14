// src/components/ui/InteractiveMap.tsx

'use client'; // This is the only line you need to ensure client-side rendering.

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default Leaflet icon paths
const DefaultIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface InteractiveMapProps {
  latitude: number;
  longitude: number;
}

// Export the component directly
export default function InteractiveMap({ latitude, longitude }: InteractiveMapProps) {
  return (
    <MapContainer center={[latitude, longitude]} zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]}>
        <Popup>
          Souss-Massa Tours <br /> Our Location.
        </Popup>
      </Marker>
    </MapContainer>
  );
}