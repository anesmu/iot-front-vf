import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import L from 'leaflet';
import 'leaflet.markercluster';
import { Device } from '../types/device';

const spainPosition: [number, number] = [40.4637, -3.7492];

interface MapProps {
  devices: Device[];
}

const customIcon = new L.Icon({
  iconUrl: '/location.svg',
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

const Map: React.FC<MapProps> = ({ devices }) => {
  useEffect(() => {
    const map = L.map('map', {
      center: spainPosition,
      zoom: 5,
      layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        }),
      ],
    });

    const markers = L.markerClusterGroup();
    devices.forEach((device) => {
      if (!device.latitude || !device.longitude) {
        return;
      }
      const marker = L.marker([device.latitude, device.longitude], {
        icon: customIcon,
      });
      marker.bindPopup(
        `<div><h3>${device.name}</h3><p>Mobile: ${device.mobileNumber}</p><p>Last Connection: ${device.lastConnection}</p></div>`
      );
      markers.addLayer(marker);
    });

    map.addLayer(markers);

    return () => {
      map.remove();
    };
  }, [devices]);

  return <div id="map" style={{ height: '100%', width: '100%' }} />;
};

export default Map;
