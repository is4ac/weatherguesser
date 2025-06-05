import { SCORE, STREAK } from '@/constants';
import { Button } from '@mantine/core';
import { useNavigate } from '@tanstack/react-router';
import { useLocalStorage } from 'usehooks-ts';

export function GameOver() {
	const navigate = useNavigate();
	const [_score, setScore] = useLocalStorage(SCORE, 0);
	const [_streak, setStreak] = useLocalStorage(STREAK, 0);

	const resetGame = () => {
		setScore(0);
		setStreak(0);
		navigate({ to: '/' });
	};

	return (
		<div className="flex flex-col items-center gap-10 p-4">
			<p className="flex items-center justify-center text-2xl text-white">Game over!</p>
			<p className="text-8xl">🎉</p>
			<Button
				variant="ghost"
				onClick={resetGame}
				size="md"
				className="border-white/30 bg-white/20 text-white hover:bg-white/30"
			>
				Play again
			</Button>
		</div>
	);
}
