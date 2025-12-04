import React from 'react';
import { calculateDistance } from '../helpers';
import { quizData } from '../quizData';
import { useZustandLocation } from '../zustandLocationStore';
import {
	useQuizStoreActions,
	useZustandCompletedQuizIds,
	useZustandScore,
} from '../zustandQuizStore';
import Quiz from './Quiz';

export default function QuizSection() {
	const score = useZustandScore();
	const completedQuizIds = useZustandCompletedQuizIds();
	const quizActions = useQuizStoreActions((store) => store.actions);

	const location = useZustandLocation();
	const quizQuestions = quizData?.quiz?.quizfrage ?? [];

	// Finde die passende Quizfrage basierend auf der aktuellen Location und den Voraussetzungen
	const matchingQuestion =
		location &&
		quizQuestions.find((question) => {
			if (
				//Prüfe, ob die Position ungefähr mit der Quizfrage übereinstimmt
				!fuzzyEquals(question.lat, location.latitude) ||
				!fuzzyEquals(question.lon, location.longitude)
			) {
				return false;
			}
			// Prüfe, ob die Voraussetzungen erfüllt sind
			const requirementId = question.require;

			//Wenn keine Voraussetzung, dann true
			if (requirementId === 0) {
				return true;
			}

			// Ansonsten prüfe, ob die RequirementId in den abgeschlossenen Quizfragen ist
			return completedQuizIds.some(
				(completedId) => completedId === requirementId
			);
		});

	// Finde die nächste verfügbare Quizfrage basierend auf den abgeschlossenen Fragen
	const isAvailable = (question) => {
		// Wenn keine Voraussetzung, dann verfügbar
		if (question.require == null) return true;

		// Bereits abgeschlossene Fragen überspringen
		if (completedQuizIds.includes(question.id)) return false;

		// Prüfe, ob die Voraussetzung (Vorherige Frage abgeschlossen) erfüllt ist
		return completedQuizIds.includes(question.require);
	};

	const nextQuestion = quizQuestions.find(isAvailable);

	// Berechne die Entfernung zur nächsten Frage, falls vorhanden
	const nextDistance =
		nextQuestion && location
			? calculateDistance(
					location.latitude,
					location.longitude,
					nextQuestion.lat,
					nextQuestion.lon
			  )
			: null;

	return (
		<section className="quiz-section">
			<div className="quiz-section__headerwrapper">
				<h2 className="quiz-section__title h3">Quiz</h2>
				<button
					type="button"
					className="quiz-section__reset-button"
					onClick={() => {
						quizActions.clearProgress();
					}}
				>
					Fortschritt zurücksetzen
				</button>
			</div>

			<div className="quiz-section__scoreboard">
				<p className="quiz-section__score">
					Dein aktueller Punktestand: <span>{score}</span> Punkte
				</p>
				<p className="quiz-section__completed">
					Abgeschlossene Quizfragen: <span>{completedQuizIds.length}</span> von{' '}
					<span>{quizQuestions.length}</span>
				</p>
				<span className="quiz-section__waypoint">
					{nextDistance ? `Nächste Frage: ${nextDistance}` : '—'}
				</span>
			</div>
			{!location && (
				<p className="quiz-section__waiting">Warte auf aktuelle Location …</p>
			)}
			{location && (
				<>
					{/*
					Für Tests
					<p>
						Aktuelle Position&nbsp;
						<span>
							{location.latitude} / {location.longitude}
						</span>

					</p> */}
					{matchingQuestion ? (
						<Quiz id={matchingQuestion.id} />
					) : (
						<p className="quiz-section__no-quiz">
							Keine Quizfrage an diesem Standort gefunden, gehe zum nächsten
							Standort.
						</p>
					)}
				</>
			)}
		</section>
	);
}

const fuzzyEquals = (a, b, fraction = 3) =>
	a.toFixed(fraction) === b.toFixed(fraction);
