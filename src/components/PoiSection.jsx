import { AnimatePresence, motion } from 'motion/react';
import { Suspense, useState } from 'react';
import { isVisible } from '../helpers';
import { useToggle } from '../hooks/useToggle';
import Pois from './Pois';

export default function PoiSection() {
	const [show, toggleShow] = useToggle(false);
	const [refreshToken, setRefreshToken] = useState(0);
	const [autoRefresh, setAutoRefresh] = useState(false);

	const handleRefresh = () => {
		setRefreshToken((current) => current + 1);
	};

	return (
		<div className="poisection">
			<div className="poisection__actions">
				<button
					type="button"
					onClick={toggleShow}
					className="poisection__poibtn"
				>
					{show ? ' POIs ausblenden' : 'POIs anzeigen'}
				</button>

				<AnimatePresence>
					{show && (
						<motion.div
							initial={{ height: 0, opacity: 0 }}
							animate={{ height: 'auto', opacity: 1 }}
							exit={{ height: 0, opacity: 0 }}
							transition={{ duration: 0.1 }}
						>
							<button
								type="button"
								onClick={handleRefresh}
								className="poisection__refreshbtn"
							>
								Aktualisieren
							</button>
							<br />
							<label className="poisection__auto">
								<input
									type="checkbox"
									checked={autoRefresh}
									onChange={(event) => setAutoRefresh(event.target.checked)}
								/>
								Automatisch aktualisieren
							</label>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			{/*Kein Activity hier da Pois nicht auf der Karte gezeigt werden*/}
			<AnimatePresence>
				{show && (
					<Suspense fallback={<div>Lade...</div>}>
						<Pois refreshToken={refreshToken} autoUpdate={autoRefresh} />
					</Suspense>
				)}
			</AnimatePresence>
		</div>
	);
}
