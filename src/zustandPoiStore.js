import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export const useZustandStore = create(
	immer((set, get) => ({
		pois: {},

		actions: {
			// setPois ersetzt alle POIs im Store mit dem übergebenen Objekt
			setPois: (pois) =>
				set((state) => {
					state.pois = pois || {};
					console.log('Zustand store POIs set:', state.pois);
				}),
			// Alle POIs löschen
			clearPois: () =>
				set((state) => {
					state.pois = {};
					console.log('Zustand store POIs cleared');
				}),
		},
	}))
);

export const useZustandStorePoiActions = () =>
	useZustandStore((store) => store.actions);

// Hook um einfacher an die POIs zu kommen
export const useZustandPois = () => useZustandStore((store) => store.pois);
