import { useState, useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Button, Card, Dialog, TextInput, Text } from '@mantine/core';
import { Trophy } from 'lucide-react';
import type { LeaderboardEntry } from '../types';

interface LeaderboardModalProps {
	currentScore: number;
	currentStreak: number;
	attempts: number;
}

export function LeaderboardModal({ currentScore, currentStreak, attempts }: LeaderboardModalProps) {
	const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
	const [showLeaderboard, { toggle, close }] = useDisclosure(false);
	const [playerName, setPlayerName] = useState('');

	const saveScore = () => {
		if (!playerName.trim()) return;

		const newEntry: LeaderboardEntry = {
			name: playerName.trim(),
			score: currentScore,
			streak: currentStreak,
			date: new Date().toLocaleDateString()
		};

		const updatedLeaderboard = [...leaderboard, newEntry]
			.sort((a, b) => b.score - a.score)
			.slice(0, 10);

		setLeaderboard(updatedLeaderboard);
		localStorage.setItem('weatherGameLeaderboard', JSON.stringify(updatedLeaderboard));
		setPlayerName('');
	};

	const loadLeaderboard = () => {
		const saved = localStorage.getItem('weatherGameLeaderboard');
		if (saved) {
			setLeaderboard(JSON.parse(saved));
		}
	};

	const clearLeaderboard = () => {
		setLeaderboard([]);
		localStorage.removeItem('weatherGameLeaderboard');
	};

	useEffect(() => {
		loadLeaderboard();
	}, []);

	return (
		<>
			<Button
				onClick={toggle}
				variant="ghost"
				size="sm"
				className="rounded-full bg-white/20 px-4 py-2 text-white backdrop-blur-sm hover:bg-white/30"
			>
				<Trophy className="mr-2 h-5 w-5 text-yellow-300" />
				<span className="font-semibold">{currentScore}</span>
			</Button>

			<Dialog
				opened={showLeaderboard}
				withCloseButton
				onClose={close}
				className="max-w-md border-white/20 bg-gradient-to-br from-sky-600/95 via-sky-500/95 to-blue-700/95 text-white backdrop-blur-md"
			>
				<Text className="flex items-center justify-center gap-2 text-center text-2xl font-bold text-white">
					<Trophy className="h-6 w-6 text-yellow-400" />
					Leaderboard
				</Text>

				<div className="space-y-4">
					{/* Current Game Score */}
					{currentScore > 0 && (
						<Card className="border-white/20 bg-white/10 backdrop-blur-sm">
							<Card.Section className="pt-4">
								<h3 className="mb-3 text-center font-semibold text-white">Save Your Score</h3>
								<div className="space-y-3">
									<div className="grid grid-cols-3 gap-2 text-center text-sm">
										<div>
											<p className="text-white/70">Score</p>
											<p className="font-bold text-white">{currentScore}</p>
										</div>
										<div>
											<p className="text-white/70">Streak</p>
											<p className="font-bold text-white">{currentStreak}</p>
										</div>
									</div>
									<div className="flex gap-2">
										<TextInput
											value={playerName}
											onChange={(e) => setPlayerName(e.target.value)}
											placeholder="Enter your name"
											className="border-white/30 bg-white/20 text-white placeholder:text-white/60"
											maxLength={20}
										/>
										<Button
											onClick={saveScore}
											disabled={!playerName.trim()}
											className="bg-yellow-500 font-semibold text-black hover:bg-yellow-600"
										>
											Save
										</Button>
									</div>
								</div>
							</Card.Section>
						</Card>
					)}

					{/* Leaderboard List */}
					<Card className="border-white/20 bg-white/10 backdrop-blur-sm">
						<Card.Section className="pt-4">
							<div className="mb-3 flex items-center justify-between">
								<h3 className="font-semibold text-white">Top Players</h3>
								{leaderboard.length > 0 && (
									<Button
										onClick={clearLeaderboard}
										variant="ghost"
										size="sm"
										className="text-xs text-white/70 hover:bg-white/10 hover:text-white"
									>
										Clear
									</Button>
								)}
							</div>

							{leaderboard.length === 0 ? (
								<p className="py-4 text-center text-sm text-white/70">
									No scores yet. Be the first!
								</p>
							) : (
								<div className="max-h-64 space-y-2 overflow-y-auto">
									{leaderboard.map((entry, index) => (
										<div
											key={index}
											className={`flex items-center justify-between rounded-lg p-2 ${
												index === 0
													? 'border border-yellow-400/30 bg-yellow-500/20'
													: index === 1
														? 'border border-gray-300/30 bg-gray-400/20'
														: index === 2
															? 'border border-orange-400/30 bg-orange-500/20'
															: 'bg-white/5'
											}`}
										>
											<div className="flex items-center gap-3">
												<div
													className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
														index === 0
															? 'bg-yellow-500 text-black'
															: index === 1
																? 'bg-gray-400 text-black'
																: index === 2
																	? 'bg-orange-500 text-black'
																	: 'bg-white/20 text-white'
													}`}
												>
													{index + 1}
												</div>
												<div>
													<p className="text-sm font-medium text-white">{entry.name}</p>
													<p className="text-xs text-white/60">{entry.date}</p>
												</div>
											</div>
											<div className="text-right">
												<p className="text-sm font-bold text-white">{entry.score}</p>
												<p className="text-xs text-white/60">{entry.streak} streak</p>
											</div>
										</div>
									))}
								</div>
							)}
						</Card.Section>
					</Card>
				</div>
			</Dialog>
		</>
	);
}
