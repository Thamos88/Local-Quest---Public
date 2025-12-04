import React from 'react';
import useGeoLocation from '../hooks/useGeoLocation';
import { useToggle } from '../hooks/useToggle';
import SetFakeGeoLocation from './SetFakeGeoLocation';
import ShowGeoLocation from './ShowGeoLocation';

export default function UserLocation() {
	const [fakeLocation, toggleFakeLocation] = useToggle(true); // Fake Location standardmäßig an um die Erlaubnisabfrage zu umgehen
	const [showLocationSettings, toggleShowLocationSettings] = useToggle(false);

	return (
		<section className="user-location">
			<button
				type="button"
				onClick={toggleShowLocationSettings}
				className="location_settings__trigger"
			>
				{showLocationSettings ? 'Verstecke' : 'Zeige'} Location Einstellungen
			</button>
			<div
				id="locationSettingsPanel"
				className={`location_settings${showLocationSettings ? ' is-open' : ''}`}
			>
				<div className="location_settings__header">
					<h2 className="h4">Location Einstellungen</h2>
					<button
						type="button"
						onClick={toggleShowLocationSettings}
						className="location_settings__close"
					>
						×
					</button>
				</div>
				<label htmlFor="fakeLocationToggle" className="location_settings__row">
					<input
						id="fakeLocationToggle"
						type="checkbox"
						checked={fakeLocation}
						onChange={toggleFakeLocation}
					/>
					<span>Benutze Fake Location</span>
				</label>

				{fakeLocation ? <SetFakeGeoLocation /> : <SetRealLocation />}

				<ShowGeoLocation />
			</div>
		</section>
	);
}

function SetRealLocation() {
	useGeoLocation(true); // Erzwinge echte Geolocation um die Karte upzudaten
	return (
		<div className="real-location-info">
			<p>Die echte Geolocation wird verwendet.</p>
		</div>
	);
}
