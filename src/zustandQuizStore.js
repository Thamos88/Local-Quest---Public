import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { shallow } from 'zustand/shallow';

const STORAGE_KEY = 'quiz-progress';

export const useZustandQuizStore = create(
	persist(
		immer((set) => ({
			completedQuizIds: [],
			score: 0,
			actions: {
				addCompletedQuiz: (quizId) =>
					set((state) => {
						if (typeof quizId !== 'number' && typeof quizId !== 'string') {
							return;
						}
						if (!state.completedQuizIds.includes(quizId)) {
							state.completedQuizIds.push(quizId);
						}
					}),
				addPoints: (points) =>
					set((state) => {
						const parsedPoints = Number(points) || 0;
						state.score += parsedPoints;
					}),
				clearProgress: () =>
					set((state) => {
						state.completedQuizIds = [];
						state.score = 0;
					}),
			},
		})),
		{
			name: STORAGE_KEY,
			partialize: (state) => ({
				completedQuizIds: state.completedQuizIds,
				score: state.score,
			}),
		}
	)
);

export const useQuizProgress = () =>
	useZustandQuizStore(
		(state) => ({
			completedQuizIds: state.completedQuizIds,
			score: state.score,
		}),
		shallow
	);

// Hook um einfacher an den Score zu kommen
export const useZustandScore = () =>
	useZustandQuizStore((store) => store.score);

export const useZustandCompletedQuizIds = () =>
	useZustandQuizStore((store) => store.completedQuizIds);

export const useQuizStoreActions = () =>
	useZustandQuizStore((state) => state.actions);
