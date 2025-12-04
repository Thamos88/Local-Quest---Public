import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import InteractiveMap from './components/InteractiveMap';
import UserLocation from './components/UserLocation';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<UserLocation />
		<InteractiveMap />
	</React.StrictMode>
);
