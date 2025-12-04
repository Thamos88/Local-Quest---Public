import L, { marker } from 'leaflet';
import React, { useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import quizData from '../quizData';
import { useZustandQuizStore } from '../zustandQuizStore';

/*https://leafletjs.com/examples/quick-start/ */
/* https://ujjwaltiwari2.medium.com/a-guide-to-using-openstreetmap-with-react-70932389b8b1 */

// Define a custom red icon
// https://leafletjs.com/examples/custom-icons/
const redIcon = new L.Icon({
	iconUrl: '/redmarker.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
});

const quizIcon = new L.Icon({
	iconUrl: '/icon-question.png',
	iconSize: [50, 50],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
});

const checkIcon = new L.Icon({
	iconUrl: '/check.png',
	iconSize: [40, 40],
	iconAnchor: [20, 40],
	popupAnchor: [0, -40],
});

export default function GenerateMap({
	lat,
	long,
	zoom = 20,
	id = 'map',
	pois = {},
}) {
	const completedQuizIds = useZustandQuizStore(
		(state) => state.completedQuizIds
	);
	// Finde alle Quizfragen ohne Voraussetzungen (Startpunkte)
	const questions = quizData?.quiz?.quizfrage ?? [];
	const quizLocations = questions.filter((question) => {
		return question?.require === 0; // Nur Fragen ohne Voraussetzungen
	});

	return (
		<div className={id}>
			<MapContainer center={[lat, long]} zoom={zoom} scrollWheelZoom={true}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>

				{/* Todo: Recenter Funktion nur bei massiver Veränderung der Position einfügen */}
				<Recenter lat={lat} long={long} /* zoom={zoom}  */ />

				<Marker position={[lat, long]} icon={redIcon}>
					<Popup>Deine Position</Popup>
				</Marker>

				{/* Marker für Quiz Start anzeigen */}
				{quizLocations
					.filter((quiz) => !completedQuizIds.includes(quiz.id))
					.map((quiz) => (
						<Marker
							key={`quiz-${quiz.id}`}
							position={[quiz.lat, quiz.lon]}
							icon={quizIcon}
						>
							<Popup>
								<strong> Start: Quiz {quiz.name}</strong>
							</Popup>
						</Marker>
					))}

				{/* Marker für abgeschlossene Quizfragen anzeigen */}
				{questions
					.filter((quiz) => completedQuizIds.includes(quiz.id))
					.map((quiz) => (
						<Marker
							key={`completed-${quiz.id}`}
							position={[quiz.lat, quiz.lon]}
							icon={checkIcon}
						>
							<Popup>
								<strong>Geschafft: {quiz.name}</strong>
							</Popup>
						</Marker>
					))}

				{/* Marker für POIs anzeigen */}
				{Object.values(pois).map((poi) => {
					// Extrahiere Latitude und Longitude aus den Koordinaten
					const lat = poi.coordinates?.[0]?.lat;
					const lon = poi.coordinates?.[0]?.lon;
					if (!lat || !lon) return null;
					return (
						<Marker
							key={poi.pageid}
							position={[lat, lon]}
							className={poi.pageid}
							icon={
								new L.Icon({
									iconUrl:
										'../../node_modules/leaflet/dist/images/marker-icon-2x.png', // required for class to work
									iconSize: [25, 41],
									iconAnchor: [12, 41],
									className: `marker-${poi.pageid}`,
								})
							}
						>
							<Popup>
								<strong>{poi.title}</strong>
								{poi.thumbnail && (
									<>
										<br />
										<img
											src={poi.thumbnail.source}
											alt={poi.title}
											width="200"
										/>
									</>
								)}
							</Popup>
						</Marker>
					);
				})}
			</MapContainer>
		</div>
	);
}

function Recenter({ lat, long, zoom }) {
	const map = useMap();

	if (lat == null || long == null) {
		return;
	}

	map.flyTo([lat, long], zoom);

	return null;
}
