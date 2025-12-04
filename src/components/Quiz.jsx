import confetti from 'canvas-confetti';
import { motion } from 'motion/react';
import React, { useEffect, useState } from 'react';
import { useToggle } from '../hooks/useToggle';
import quizData from '../quizData';
import {
	useQuizStoreActions,
	useZustandCompletedQuizIds,
} from '../zustandQuizStore';

export default function Quiz({ id }) {
	const [feedback, setFeedback] = useState(null); // "correct" | "wrong" | null
	const [selectedAnswerText, setSelectedAnswerText] = useState(null);
	const [showTip, toggleShowTip, setShowTip] = useToggle(false);
	const quizActions = useQuizStoreActions();
	const completedQuizIds = useZustandCompletedQuizIds();

	// Finde die passende Quizfrage basierend auf der übergebenen ID
	const matchingQuestion = quizData?.quiz?.quizfrage.find(
		(question) => question.id === id
	);

	// Extrahiere die Antwortoptionen aus der Quizfrage
	const answers = Object.entries(matchingQuestion?.frage)
		.filter(
			// Schlüssel, die mit "antwort" beginnen und eine gültige ID und Text haben
			([key, option]) => key.startsWith('antwort') && option?.id && option?.text
		)
		.map(([, option]) => option);

	// Überprüfe, ob die Quizfrage bereits abgeschlossen wurde
	const questionId = matchingQuestion?.id;
	const isCompleted = questionId
		? completedQuizIds.includes(questionId)
		: false;

	if (!matchingQuestion) {
		//Wenn keine passende Frage gefunden wurde Text anzeigen
		return (
			<div className="quizsection__question">
				<p>Für diese Position steht keine Quizfrage bereit.</p>
			</div>
		);
	}

	const handleAnswerClick = (answerId, answerText) => {
		if (!matchingQuestion?.frage?.loesung?.id) return;
		if (isCompleted) return; // beenden, wenn bereits abgeschlossen

		const correctAnswerId = matchingQuestion.frage.loesung.id;
		const selectedId = answerId;
		const isCorrect = selectedId === correctAnswerId;

		// Feedback setzen
		setFeedback(isCorrect ? 'correct' : 'wrong');
		// Gewählte Antwort für falsche Antworten speichern
		setSelectedAnswerText(isCorrect ? null : answerText);

		if (isCorrect) {
			fireConfetti();
			// Punkte vergeben und als abgeschlossen markieren
			quizActions.addPoints(200);
			quizActions.addCompletedQuiz(matchingQuestion.id);
			setFeedback(null); // Feedback zurücksetzen nach erfolgreicher Beantwortung
			setSelectedAnswerText(null);
			setShowTip(false); // Tipp ausblenden damit er beim nächsten Mal nicht mehr sichtbar ist
		}
	};

	// Hilfsvariablen für die Anzeige des Feedbacks
	const showCorrectFeedback = feedback === 'correct' || isCompleted;
	const showWrongFeedback = feedback === 'wrong' && !isCompleted;
	const disableAnswers = isCompleted || feedback === 'correct';

	const tip = matchingQuestion?.frage?.tipp;

	return (
		<div className="quiz-section__question">
			{tip?.text && !showCorrectFeedback && (
				<motion.div
					className="quiz-section__tip"
					initial={{ y: 8, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.25 }}
				>
					<button
						type="button"
						className="quiz-section__tip-button"
						onClick={toggleShowTip}
					>
						{showTip ? 'Tipp ausblenden' : 'Tipp anzeigen'}
					</button>
					{showTip && tip?.text && (
						<motion.div
							className="quiz-section__tip-text"
							initial={{ height: 0, opacity: 0 }}
							animate={{ height: 'auto', opacity: 1 }}
							transition={{ duration: 0.2 }}
							dangerouslySetInnerHTML={{ __html: tip.text }}
						/>
					)}
				</motion.div>
			)}

			{!showCorrectFeedback && <p>{matchingQuestion.frage.frageHTML}</p>}

			{showCorrectFeedback && (
				<motion.p
					className="quiz-section__feedback quiz-section__feedback--correct"
					initial={{ y: 8, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.25 }}
				>
					<span>Richtig!</span>
					<span
						dangerouslySetInnerHTML={{
							__html: matchingQuestion.frage.loesung?.text,
						}}
					/>
				</motion.p>
			)}
			{showWrongFeedback && (
				<motion.p
					className="quiz-section__feedback quiz-section__feedback--wrong"
					initial={{ y: 8, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.25 }}
				>
					<strong>Deine Antwort:</strong> <br />{' '}
					<italic>"{selectedAnswerText || ''}"</italic>
					<br />
					ist leider <strong>falsch</strong>. Versuche es noch einmal!
				</motion.p>
			)}

			<div className="quiz-section__answers">
				{answers.map((answer, index) => (
					<motion.button
						key={answer.id}
						type="button"
						className={`quiz-section__answer-button`}
						onClick={() => handleAnswerClick(answer.id, answer.text)}
						hidden={disableAnswers}
						initial={{ x: -500, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.08 * index }}
					>
						{answer.text}
					</motion.button>
				))}
			</div>
		</div>
	);
}

function fire(particleRatio, opts) {
	const count = 1000;
	const defaults = {
		origin: { y: 0.7 },
	};
	confetti({
		...defaults,
		...opts,
		particleCount: Math.floor(count * particleRatio),
	});
}

function fireConfetti() {
	fire(0.25, {
		startVelocity: 55,
		angle: randomInRange(55, 125),
		spread: randomInRange(50, 70),
	});

	fire(0.25, {
		spread: 68,
		startVelocity: 55,
		angle: randomInRange(235, 305),
	});
	fire(0.2, {
		spread: 120,
		startVelocity: 45,
		angle: randomInRange(25, 85),
	});
	fire(0.35, {
		spread: 200,
		decay: 0.91,
		scalar: 0.8,
	});
	fire(0.1, {
		spread: 263,
		startVelocity: 25,
		decay: 0.92,
		scalar: 1.2,
	});
	fire(0.1, {
		spread: 230,
		startVelocity: 45,
	});
}

function randomInRange(min, max) {
	return Math.random() * (max - min) + min;
}
