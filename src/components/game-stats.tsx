interface GameStatsProps {
	attempts: number;
	score: number;
	streak: number;
}

export function GameStats({ attempts, score, streak }: GameStatsProps) {
	const accuracy = attempts > 0 ? Math.round((score / (attempts * 10)) * 100) : 0;

	return (
		<div className="flex justify-between border-t border-white/20 py-4 text-center">
			<div>
				<p className="text-sm text-white/80">Attempts</p>
				<p className="font-bold text-white">{attempts}</p>
			</div>
			<div>
				<p className="text-sm text-white/80">Accuracy</p>
				<p className="font-bold text-white">{accuracy}%</p>
			</div>
			<div>
				<p className="text-sm text-white/80">Best Streak</p>
				<p className="font-bold text-white">{streak}</p>
			</div>
		</div>
	);
}
