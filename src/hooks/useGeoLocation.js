import { useEffect, useRef, useState } from 'react';
import { useZustandStoreActions } from '../zustandLocationStore';

export default function useGeoLocation(enabled = true) {
	const [location, setLocation] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const actions = useZustandStoreActions();
	const watchId = useRef(null);
	const lastKnownCoords = useRef(null);

	useEffect(() => {
		if (!enabled) {
			setLoading(false);
			return;
		}

		if (!navigator.geolocation) {
			setError('Geolocation not supported');
			setLoading(false);
			return;
		}

		const handleSuccess = (position) => {
			const { latitude, longitude, accuracy } = position.coords;

			// Prüfen, ob sich die Koordinaten seit dem letzten Mal signifikant geändert haben
			if (
				lastKnownCoords.current &&
				lastKnownCoords.current.latitude === latitude &&
				lastKnownCoords.current.longitude === longitude
			) {
				return;
			}

			// Update last known coordinates
			lastKnownCoords.current = { latitude, longitude };

			const loc = {
				latitude,
				longitude,
				accuracy,
				timestamp: position.timestamp,
				source: 'real',
			};

			// Update Zustand store und local state
			actions?.setLocation && actions.setLocation(loc);
			setLocation(loc);
			setLoading(false);
		};

		const handleError = (err) => {
			setError(err.message || 'Unable to retrieve your location');
			setLoading(false);
		};

		/* 	Benutze watchPosition, um kontinuierlich Updates zu erhalten
			https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/watchPosition */
		watchId.current = navigator.geolocation.watchPosition(
			handleSuccess,
			handleError,
			{
				enableHighAccuracy: true,
				timeout: 5000,
				maximumAge: 0,
			}
		);

		// Aufräumen: Watcher entfernen, wenn der Hook unmounted wird oder disabled wird
		return () => {
			if (watchId.current !== null) {
				navigator.geolocation.clearWatch(watchId.current);
			}
		};
	}, [actions, enabled]);

	return { location, error, loading };
}
