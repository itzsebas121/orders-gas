import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

const MapLocation = (props) => {
    const { sendLocationMap } = props;
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const [coordinates, setCoordinates] = useState(null);
    const [location, setLocation] = useState('');

    const sendValues = () => {
        sendLocationMap(coordinates)
    }
    const initializeMap = () => {
        if (!mapRef.current) {
            const map = L.map('map').setView([-1.2571433, -78.6628187], 10);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors',
            }).addTo(map);

            map.on('click', (event) => {
                const { lat, lng } = event.latlng;
                setLocation(`${lat}, ${lng}`);
                setCoordinates({ lat, lng });
                if (markerRef.current) {
                    markerRef.current.setLatLng([lat, lng]);
                } else {
                    const marker = L.marker([lat, lng]).addTo(map);
                    markerRef.current = marker;
                }
            });

            mapRef.current = map;
        }
    };

    useEffect(() => {
        initializeMap();
    }, []);
    const handleClose = () => {
        document.querySelector('.overlay-map').classList.remove('active');
        sendValues()
    };
    return (
        <div className="container-map-location">
            <div className="header">
                <h3>Seleccione su ubicación</h3>
                <FontAwesomeIcon
                    icon={faX}
                    className="icon-close"
                    onClick={handleClose}
                />
            </div>
            <div className="container-map">
                <div id="map"></div>
            </div>
            {coordinates && (
                <div className="coordinates-display">
                    <p><strong>Latitud:</strong> {coordinates.lat}</p>
                    <p><strong>Longitud:</strong> {coordinates.lng}</p>
                </div>
            )}
        </div>
    );
};

export default MapLocation;
