import { use, useEffect } from 'react';
import {
	useZustandLocation,
	useZustandStoreActions,
} from '../zustandLocationStore';
import { useZustandPois } from '../zustandPoiStore';
import GenerateMap from './GenerateMap';
import PoiSection from './PoiSection';
import QuizSection from './QuizSection';

export default function InteractiveMap() {
	const location = useZustandLocation();
	const locationActions = useZustandStoreActions();
	const { setLatitude, setLongitude } = locationActions;
	const pois = useZustandPois();

	console.log('Rendering InteractiveMap with pois:', pois);
	console.log(pois);

	useEffect(() => {
		const step = 0.0001; // Schrittweite für die Bewegung
		const handleKeyDown = (e) => {
			if (e.key === 'w' || e.key === 'ArrowUp') {
				setLatitude(location.latitude + step);
			} else if (e.key === 's' || e.key === 'ArrowDown') {
				setLatitude(location.latitude - step);
			} else if (e.key === 'a' || e.key === 'ArrowLeft') {
				setLongitude(location.longitude - step);
			} else if (e.key === 'd' || e.key === 'ArrowRight') {
				setLongitude(location.longitude + step);
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [location, setLatitude, setLongitude]);

	if (!location) {
		return <div>Bitte Standort aktivieren, um die Karte zu sehen.</div>;
	}

	return (
		<section className="interactivemap">
			<div className="interactivemap__map">
				<GenerateMap
					id="usermap"
					lat={location.latitude}
					long={location.longitude}
					pois={pois}
					zoom={14}
				/>

				<QuizSection />
			</div>

			<aside className="interactivemap__sidebar">
				<PoiSection />
			</aside>
		</section>
	);
}
