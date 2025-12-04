/* Haversine distance 
https://medium.com/@sumitsakpal02/how-to-calculate-distance-between-two-coordinates-in-javascript-using-haversine-formula-c2dc0f5d524c
*/

/**
 * Calculate the great-circle distance between two geographic coordinates using the Haversine formula
 * and return a formatted distance string.
 *
 * Coordinates must be provided in decimal degrees.
 *
 * @param {number} lat1 - Latitude of the first point in degrees.
 * @param {number} lon1 - Longitude of the first point in degrees.
 * @param {number} lat2 - Latitude of the second point in degrees.
 * @param {number} lon2 - Longitude of the second point in degrees.
 * @returns {string} Formatted distance between the two points (meters). The calculation uses an Earth radius of 6,371,000 meters and the result is passed to the helper `formatDistance` for presentation.
 */
export function calculateDistance(lat1, lon1, lat2, lon2) {
	const toRad = (angle) => (angle * Math.PI) / 180;

	const R = 6371e3; // Earth's radius in meters
	const dLat = toRad(lat2 - lat1);
	const dLon = toRad(lon2 - lon1);

	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(toRad(lat1)) *
			Math.cos(toRad(lat2)) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2);

	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	return formatDistance(R * c); // meters
}

// Format the distance in meters or kilometers
export function formatDistance(meters) {
	return meters >= 1000
		? `${(meters / 1000).toFixed(2)} km`
		: `${Math.round(meters)} m`;
}

/**
 * Validate and optionally sanitize an HTML heading level.
 *
 * Returns the provided heading level when it is an integer in the range 1–6.
 * If the level is not an integer, an Error is thrown. If the level is outside
 * the 1–6 range and sanitizeOutOfRange is true (default), the value is clamped
 * to the nearest valid value (1 or 6) and a console.warn is emitted. If the
 * level is outside the range and sanitizeOutOfRange is false, an Error is thrown.
 *
 * @param {number} level - The heading level to validate (expected integer).
 * @param {boolean} [sanitizeIfOutOfRange=true] - When true, out-of-range values are sanitized
 *                                              (clamped to 1 or 6) and a warning is logged.
 *                                              When false, out-of-range values cause an Error.
 * @returns {number} A valid heading level between 1 and 6 (inclusive).
 * @throws {Error} If `level` is not an integer.
 * @throws {Error} If `level` is outside 1–6 and `sanitizeOutOfRange` is false.
 *
 * @example
 * validateHeadingLevel(3); // -> 3
 * @example
 * validateHeadingLevel(0); // -> 1 (and logs a warning) when sanitizeOutOfRange is true
 * @example
 * validateHeadingLevel(7, false); // -> throws Error
 */
export function validateHeadingLevel(level, sanitizeIfOutOfRange = true) {
	if ([1, 2, 3, 4, 5, 6].includes(level)) {
		return level;
	}

	if (!Number.isInteger(level)) {
		throw Error(`Heading levis is not an integer: ${level}:`);
	}

	if (!sanitizeIfOutOfRange) {
		throw Error(`Heading level is out of range: ${level}`);
	}

	if (level < 1) {
		console.warn(`Heading level was lower than 1: ${level}`);
		return 1;
	}

	if (level > 6) {
		console.warn(`Heading level was higher than 6: ${level}`);
		return 6;
	}

	return level;
}

/**
 * Returns a CSS visibility value for the Activity component.
 *
 * @param {any} show - When truthy, the Activity component should be visible; when falsy, it should be hidden.
 * @returns {'visible'|'hidden'} A CSS visibility string to apply to the component.
 */
export function isVisible(show) {
	return show ? 'visible' : 'hidden';
}

/**
 * Formats a price value as a localized currency string using Intl.NumberFormat.
 *
 * @param {number} price - The price value to format (will be divided by divider).
 * @param {Object} [options={}] - Formatting options.
 * @param {string} [options.currency='EUR'] - ISO 4217 currency code.
 * @param {number} [options.divider=100] - Divisor to convert price to currency units (e.g., 100 for cents).
 * @param {string} [options.locale] - BCP 47 locale tag (defaults to document language or 'de-DE').
 *
 * @returns {string} The formatted currency string.
 *
 * @example
 * // Format 1000 cents as EUR in de-DE locale
 * const formattedPrice = getFormattedPrice(1000);
 * // Returns: '10,00 €'
 *
 * @example
 * // Format with custom options
 * const formattedPrice = getFormattedPrice(2500, { currency: 'USD', locale: 'en-US' });
 * // Returns: '$25.00'
 */
export function getFormattedPrice(price, options = {}) {
	const {
		currency = 'EUR',
		divider = 100,
		locale = document.documentElement.lang || 'de-DE',
	} = options;

	return new Intl.NumberFormat(locale, { currency, style: 'currency' }).format(
		price / divider
	);
}

/**
 * Pauses execution for a specified number of milliseconds.
 *
 * @param {number} ms - The number of milliseconds to wait before resolving the promise.
 * @returns {Promise<void>} A promise that resolves after the specified delay.
 */
export function wait(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Returns the current URL as a `URL` object.
 *
 * @returns {URL} The current URL.
 */
export function getCurrentUrl() {
	return new URL(window.location.href);
}

/**
 * Extracts the ID from a slug.
 *
 * @param {string} slug - The slug to parse.
 * @returns {string} The ID extracted from the slug.
 */
export function getIdFromSlug(slug) {
	const parts = slug.split('-');

	const id = parts.at(-1);

	// Ist ein String und nicht validiert, hier könnte man noch prüfen, ob es ein Integer ist etc.
	return id;
}

export function getProductWithId(searchedId) {
	/* Hier in products nach dem Produkt suchen und das Produkt
  (statt null) zurückgeben. */
	return products.find(({ id }) => searchedId === id);
}
