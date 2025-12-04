import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export const useZustandStore = create(
	immer((set, get) => ({
		location: null,
		/* Nicht vorgeschrieben, aber empfehlenswert: Alle Methoden in ein Objekt packen. */
		actions: {
			setLocation: (location) =>
				set((state) => {
					state.location = location;
					console.log('Zustand store location set to:', location);
				}),
			setLatitude: (latitude) =>
				set((state) => {
					if (state.location) {
						state.location.latitude = latitude;
					}
				}),
			setLongitude: (longitude) =>
				set((state) => {
					if (state.location) {
						state.location.longitude = longitude;
					}
				}),
		},
	}))
);

export const useZustandStoreActions = () =>
	useZustandStore((store) => store.actions);

// Hook um einfacher an die Location zu kommen
export const useZustandLocation = () =>
	useZustandStore((store) => store.location);
