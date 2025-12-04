import { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {
	useZustandLocation,
	useZustandStoreActions,
} from '../zustandLocationStore';

export default function SetFakeGeoLocation({
	/* Berlin */
	initialLat = 52.520008,
	initialLng = 13.404954,
	/* 	initialLat = 51.56310162315842,
	initialLng = 6.782166846193729, */
	initialZoom = 20,
}) {
	const location = useZustandLocation();
	const startLat = location?.latitude ?? initialLat;
	const startLng = location?.longitude ?? initialLng;

	const [position, setPosition] = useState([startLat, startLng]);
	const actions = useZustandStoreActions();

	useEffect(() => {
		if (!location) {
			// Setze initiale Location im Store, wenn noch keine gesetzt ist
			actions.setLocation({
				latitude: startLat,
				longitude: startLng,
				accuracy: 0,
				timestamp: Date.now(),
				source: 'initial',
			});
		}
	}, [actions, location, startLat, startLng]);

	return (
		<div>
			<p className="location-settings__info">Bitte Fake Location wählen</p>

			<div className="map">
				<MapContainer
					center={position}
					zoom={initialZoom}
					scrollWheelZoom={true}
				>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>

					<MapClickHandler
						onMapClick={(coords) => {
							setPosition(coords);
							actions.setLocation({
								latitude: coords[0],
								longitude: coords[1],
								accuracy: 0,
								timestamp: Date.now(),
								source: 'fake',
							});
						}}
					/>

					<Marker position={position}></Marker>
				</MapContainer>
			</div>

			<div className="selected-coordinates">
				<strong>Ausgewählt:</strong>{' '}
				<span>
					<span className="selected-coordinates__val">Lat: {position[0]}</span>{' '}
					<span className="selected-coordinates__val">Lon: {position[1]}</span>
				</span>
			</div>
		</div>
	);
}

/*https://react-leaflet.js.org/docs/api-map/#usemapevents */
/**
 * Attaches a click handler to the Leaflet map and forwards the clicked coordinates.
 *
 * This component uses react-leaflet's useMapEvents to listen for map click events
 * and invokes the provided onMapClick callback with an array [latitude, longitude].
 * The component renders nothing (returns null) and must be used inside a react-leaflet
 * MapContainer (i.e., within a map context). Cleanup is handled by the useMapEvents hook.
 *
 * @param {Object} props - Component props.
 * @param {(latlng: [number, number]) => void} props.onMapClick - Callback called when the map is clicked.
 *        Receives a two-item array [lat, lng] where lat and lng are numbers.
 * @returns {null} Does not render any DOM output.
 */
function MapClickHandler({ onMapClick }) {
	useMapEvents({
		click(e) {
			onMapClick([e.latlng.lat, e.latlng.lng]);
		},
	});
	return null;
}
