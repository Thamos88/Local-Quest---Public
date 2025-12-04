import { useZustandLocation } from '../zustandLocationStore';
import GenerateMap from './GenerateMap';

export default function ShowGeoLocation() {
	// Hole die Location aus dem Zustand Store
	const location = useZustandLocation();
	// Location kann null sein, wenn noch keine Location gesetzt wurde

	return (
		<div>
			{location && (
				<>
					<h3 className="h5">
						Aktuelle Geolocation {location.source === 'real' ? 'Real' : 'Fake'}
					</h3>
					<div>
						<p>Latitude: {location.latitude}</p>
						<p>Longitude: {location.longitude}</p>
						<p>Accuracy: {location.accuracy} meters</p>
					</div>
					{/* <GenerateMap
						lat={location.latitude}
						long={location.longitude}
						zoom={15}
					/> */}
				</>
			)}
		</div>
	);
}
