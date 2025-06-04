interface GameStatsProps {
	attempts: number;
	score: number;
	streak: number;
}

export function GameStats({ attempts, score, streak }: GameStatsProps) {
	return (
		<div className="flex justify-between border-t border-white/20 py-4 text-center">
			<div>
				<p className="text-sm text-white/80">Round</p>
				<p className="font-bold text-white">{attempts}</p>
			</div>
			<div>
				<p className="text-sm text-white/80">Score</p>
				<p className="font-bold text-white">{score}</p>
			</div>
			<div>
				<p className="text-sm text-white/80">Best Streak</p>
				<p className="font-bold text-white">{streak}</p>
			</div>
		</div>
	);
}
