import { GameOver } from '@/components/game-over';
import { GameStats } from '@/components/game-stats';
import { LeaderboardModal } from '@/components/leaderboard-modal';
import { MAX_ROUNDS, SCORE, STREAK } from '@/constants';
import { Button, Card } from '@mantine/core';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { RotateCcw } from 'lucide-react';
import { useLocalStorage } from 'usehooks-ts';

export const Route = createFileRoute('/game-over')({
	component: GameOverRouteComponent
});

function GameOverRouteComponent() {
	const navigate = useNavigate();
	const [score] = useLocalStorage(SCORE, 0);
	const [streak] = useLocalStorage(STREAK, 0);

	const resetGame = () => {
		navigate({ to: '/cities' });
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-600 via-sky-500 to-blue-700 p-4 pb-12">
			<div className="w-full max-w-md space-y-6">
				<div className="flex items-center justify-between">
					<LeaderboardModal currentScore={score} currentStreak={streak} attempts={MAX_ROUNDS} />
					<div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
						<span className="text-sm text-white">Streak: {streak}</span>
					</div>
					<Button
						onClick={resetGame}
						size="sm"
						className="rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
					>
						<RotateCcw className="h-4 w-4" />
					</Button>
				</div>

				<Card className="border-white/20 bg-white/10 shadow-2xl backdrop-blur-md">
					<Card.Section className="space-y-6 px-4">
						<GameOver />

						<GameStats attempts={MAX_ROUNDS} score={score} streak={streak} />
					</Card.Section>
				</Card>
			</div>
		</div>
	);
}
