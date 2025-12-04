import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { calculateDistance } from '../helpers';
import { useToggle } from '../hooks/useToggle';
import { useZustandLocation } from '../zustandLocationStore';

export default function Poi(poi) {
	const location = useZustandLocation();
	const userLat = location?.latitude;
	const userLon = location?.longitude;

	const [isOpen, toggleOpen] = useToggle(false);

	const { lat, lon } = getCoordinates(poi);
	const hasCoordinates = Number.isFinite(lat) && Number.isFinite(lon);
	const detailsId = `poi-details-${poi.pageid}`;

	const listItemVariants = {
		start: {
			x: 500,
			opacity: 0,
		},
		visible: {
			x: 0,

			opacity: 1,
		},
		end: {
			x: -500,
			opacity: 0,
			transition: {
				duration: 0.6,
				delay: 0.1 * poi.index,
			},
			mode: 'popLayout',
		},
	};

	return (
		<motion.li
			key={poi.pageid}
			className="poilist__item"
			variants={listItemVariants}
			initial="start"
			animate="visible"
			exit="end"
			transition={{
				duration: 0.5,
				delay: 0.1 * poi.index,
			}}
		>
			{/** biome-ignore lint/a11y/useKeyWithClickEvents: Todo */}
			{/** biome-ignore lint/a11y/noStaticElementInteractions: Todo */}
			<div
				className={`poiitem__head marker-${poi.pageid}`}
				onClick={toggleOpen}
			>
				<span className="poiitem__title">{poi.title}</span>
				{hasCoordinates && (
					<span className="poiitem__distance">
						– {calculateDistance(userLat, userLon, lat, lon)}
					</span>
				)}
				<button
					type="button"
					className="poiitem__togglebtn"
					aria-expanded={isOpen}
					aria-controls={detailsId}
					aria-label={isOpen ? 'Details ausblenden' : 'Details anzeigen'}
				/>
			</div>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						id={detailsId}
						className="poiitem__details"
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.25 }}
					>
						{poi.thumbnail && (
							<div className="poiitem__thumbnail">
								<img
									src={poi.thumbnail.source}
									width={poi.thumbnail.width}
									height={poi.thumbnail.height}
									alt={poi.title}
								/>
							</div>
						)}

						{poi.extract && <p className="poiitem__extract">{poi.extract}</p>}

						<a
							href={poi.fullurl}
							target="_blank"
							rel="noopener noreferrer"
							className="poiitem__wikipedia-link"
						>
							Mehr auf Wikipedia
						</a>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.li>
	);
}

function getCoordinates(poi) {
	return poi.coordinates?.[0] || {};
}
