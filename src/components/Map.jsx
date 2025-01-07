import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import './Map.css';

const Map = (props) => {
    const { locationStart, locationEnd } = props;
    const mapRef = useRef(null);
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

   
    const initializeMap = () => {
        if (!mapRef.current) {
            const map = L.map('map').setView([-1.2571433, -78.6628187], 10);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors',
            }).addTo(map);

            mapRef.current = map;
        }
        calculateRoute(); 
    };

    const geocode = async (location) => {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json`
        );
        const data = await response.json();
        return data.length ? L.latLng(data[0].lat, data[0].lon) : null;
    };

    const calculateRoute = async () => {
        if (!locationStart || !locationEnd) {
            alert('Por favor, introduce las ubicaciones de inicio y destino.');
            return;
        }

        const [startCoords, endCoords] = await Promise.all([
            geocode(locationStart.trim()),
            geocode(locationEnd.trim()),
        ]);

        if (startCoords && endCoords) {
            mapRef.current.eachLayer((layer) => {
                if (layer instanceof L.Routing.Control) {
                    mapRef.current.removeControl(layer);
                }
            });

            const routeControl = L.Routing.control({
                waypoints: [startCoords, endCoords],
                routeWhileDragging: true,
                createMarker: () => null,
                lineOptions: {
                    styles: [{ color: 'blue', weight: 5 }],
                },
                plan: L.Routing.plan([startCoords, endCoords], {
                    createGeocoder: false,
                }),
                show: false,
                addWaypoints: false,
            }).addTo(mapRef.current);

            const container = document.querySelector('.leaflet-routing-container');
            if (container) {
                container.style.display = 'none';
            }
        } else {
            alert('No se encontraron ubicaciones válidas.');
        }
    };

    useEffect(() => {
        initializeMap();
    }, []); 

    useEffect(() => {
        if (locationStart && locationEnd) {
            calculateRoute(); 
        }
    }, [locationStart, locationEnd]);

    return (
        <div
            id="map"
            
        ></div>
    );
};

export default Map;
