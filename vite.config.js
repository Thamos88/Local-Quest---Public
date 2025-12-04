import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const ReactCompilerConfig = {}; // Default ist meist ok: https://react.dev/reference/react-compiler/configuration

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react({
			babel: {
				plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
			},
		}),
	],

	server: {
		host: true,
		//Vite lässt keine Anfragen von anderen Hosst zu, nur von localhost.
		allowedHosts: ['react.thomasbalke.com', 'localhost'],
	},
});
