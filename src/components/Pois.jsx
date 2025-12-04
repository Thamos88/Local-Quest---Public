import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { up } from 'up-fetch';
import { useZustandLocation } from '../zustandLocationStore';
import { useZustandStorePoiActions } from '../zustandPoiStore';
import Poi from './Poi';

const upfetch = up(fetch);

export default function Pois({ refreshToken = 0, autoUpdate = false }) {
	const poiStoreActions = useZustandStorePoiActions();
	const location = useZustandLocation();

	// Deboubce Location um die Anzahl der POI Anfragen zu reduzieren
	const lat = debounceLocation(location?.latitude);
	/* console.log(lat); */
	const lon = debounceLocation(location?.longitude);
	/* console.log(lon); */

	// Refs um den letzten Zustand zu speichern
	const lastLatRef = useRef(null);
	const lastLonRef = useRef(null);
	const lastRefreshRef = useRef(refreshToken);
	const hasLoadedRef = useRef(false);

	const [pois, setPois] = useState({});

	useEffect(() => {
		//lösche POIs beim unmounten
		console.log('Unmounting Pois component, clearing POIs');
		return () => {
			poiStoreActions.clearPois();
		};
	}, []);

	useEffect(() => {
		if (lat == null || lon == null) return;

		//Prüfe ob Aktualisieren geklickt wurde
		const manualRefresh = refreshToken !== lastRefreshRef.current;
		//Prüfe ob sich die Location geändert hat
		const locationChanged =
			lat !== lastLatRef.current || lon !== lastLonRef.current;
		//Prüfe ob die Seite das erste mal geladen wird
		const initialLoad = !hasLoadedRef.current;
		// Prüfe ob automatische Aktualisierung checkt ist und sich die Location geändert hat
		const autoLocationUpdate = autoUpdate && locationChanged;

		// Wenn keine der Bedingungen zutrifft, beende die Funktion
		if (!initialLoad && !manualRefresh && !autoLocationUpdate) {
			return;
		}

		// Aktualisiere refs nach dem Check
		lastLatRef.current = lat;
		lastLonRef.current = lon;
		lastRefreshRef.current = refreshToken;
		hasLoadedRef.current = true;

		// POIs abrufen
		async function fetchData() {
			const data = await fetchPOIs(poiStoreActions, lat, lon);
			setPois(data);
		}
		fetchData();

		return;
	}, [lat, lon, poiStoreActions, refreshToken, autoUpdate]);

	// Konvertiere das POI-Objekt in ein Array für die Anzeige
	const poiList = Object.values(pois);

	console.log('POI List:', poiList.length);
	return (
		<div className="poilist">
			<h2 className="h4 poilist__heading">Points of Interest in deiner Nähe</h2>
			{poiList && (
				<ul className="poilist__list">
					<AnimatePresence>
						{poiList.map((poi) => (
							<Poi key={poi.pageid} {...poi} />
						))}
					</AnimatePresence>
				</ul>
			)}
		</div>
	);
}

/* Todo: In eigene Datei auslagern und Sortieroption nach Entfernung einfügen */
async function fetchPOIs(poiStoreActions, lat, lon, radius = 5000, limit = 10) {
	const endpoint = 'https://de.wikipedia.org/w/api.php';

	const data = await upfetch(endpoint, {
		method: 'GET',
		params: {
			action: 'query',
			format: 'json',
			origin: '*',
			generator: 'geosearch',
			ggscoord: `${lat}|${lon}`,
			ggsradius: radius,
			ggslimit: limit,
			prop: 'pageimages|extracts|coordinates|info',
			pithumbsize: 200,
			exintro: 1,
			explaintext: 1,
			inprop: 'url',
		},
	});

	const pages = data?.query?.pages ?? {};

	if (pages) {
		poiStoreActions.setPois(pages);
	}

	/* ToDo: Sortierung nach Entfernung */

	return pages;
}

/* https://support.garmin.com/en-US/?faq=hRMBoCTy5a7HqVkxukhHd8 
    
        Decimal Places	Degrees	Distance
        0	1.0	111 km
        1	0.1	11.1 km
        2	0.01	1.11 km
        3	0.001	111 m
        4	0.0001	11.1 m
        5	0.00001	1.11 m
        6	0.000001	111 mm
        7	0.0000001	11.1 mm
        8	0.00000001	1.11 mm

            
    */
function debounceLocation(point, fractionDigits = 3) {
	if (point == null) return point;
	const num = point;
	return num.toFixed(fractionDigits);
}
